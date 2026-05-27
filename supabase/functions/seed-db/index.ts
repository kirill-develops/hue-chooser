import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const SEED_USER_COUNT = 20;
const SEED_PASSWORD = "123456";
const USERS_PER_PAGE = 1_000;
const MAX_COLOR_HISTORY_PER_USER = 5;
const MAX_FRIENDSHIPS_PER_USER = 5;
const SEED_COLORS = [
   "#E63946",
   "#F4A261",
   "#E9C46A",
   "#2A9D8F",
   "#457B9D",
   "#1D3557",
   "#A8DADC",
   "#FF006E",
   "#8338EC",
   "#3A86FF",
];

type ColorHistoryRow = {
   user_id: string;
   color: string;
   created_at: string;
};

type FriendshipRow = {
   user_low: string;
   user_high: string;
   created_at: string;
};

type UserFriendshipTarget = {
   id: string;
   remainingFriendships: number;
};

function buildColorHistoryRows(userIds: string[]): ColorHistoryRow[] {
   const now = Date.now();

   return userIds.flatMap((userId, userIndex) => {
      const colorCount = (userIndex % MAX_COLOR_HISTORY_PER_USER) + 1;

      return Array.from({ length: colorCount }, (_, colorIndex) => ({
         user_id: userId,
         color: SEED_COLORS[(userIndex + colorIndex) % SEED_COLORS.length],
         created_at: new Date(
            now - (userIndex * MAX_COLOR_HISTORY_PER_USER + colorIndex) * 60_000,
         ).toISOString(),
      }));
   });
}

function buildFriendshipRows(userIds: string[]): FriendshipRow[] {
   const now = Date.now();
   const targets = userIds.map((id, index) => ({
      id,
      remainingFriendships: (index % MAX_FRIENDSHIPS_PER_USER) + 1,
   }));
   const friendshipRows: FriendshipRow[] = [];
   const friendshipKeys = new Set<string>();

   while (true) {
      const source = [...targets]
         .filter(({ remainingFriendships }) => remainingFriendships > 0)
         .sort(sortFriendshipTargets)[0];

      if (!source) {
         break;
      }

      const neededFriendships = source.remainingFriendships;
      const candidates = [...targets]
         .filter(
            (candidate) =>
               candidate.id !== source.id &&
               candidate.remainingFriendships > 0 &&
               !friendshipKeys.has(buildFriendshipKey(source.id, candidate.id)),
         )
         .sort(sortFriendshipTargets);

      if (candidates.length < neededFriendships) {
         throw new Error("Could not generate the requested friendship counts");
      }

      for (const target of candidates.slice(0, neededFriendships)) {
         const [user_low, user_high] = [source.id, target.id].sort();
         const friendshipKey = buildFriendshipKey(user_low, user_high);

         friendshipRows.push({
            user_low,
            user_high,
            created_at: new Date(
               now - friendshipRows.length * 60_000,
            ).toISOString(),
         });
         friendshipKeys.add(friendshipKey);
         source.remainingFriendships -= 1;
         target.remainingFriendships -= 1;
      }
   }

   return friendshipRows;
}

function sortFriendshipTargets(
   first: UserFriendshipTarget,
   second: UserFriendshipTarget,
) {
   return (
      second.remainingFriendships - first.remainingFriendships ||
      first.id.localeCompare(second.id)
   );
}

function buildFriendshipKey(firstUserId: string, secondUserId: string) {
   return [firstUserId, secondUserId].sort().join(":");
}

export default {
   fetch: withSupabase(
      { auth: ["secret"] },
      async (_req: Request, ctx: any) => {
         const userIds: string[] = [];
         let page = 1;

         while (true) {
            const { data, error } =
               await ctx.supabaseAdmin.auth.admin.listUsers({
                  page,
                  perPage: USERS_PER_PAGE,
               });

            if (error) {
               return Response.json(
                  {
                     error: `Failed to list users on page ${page}: ${error.message}`,
                  },
                  { status: 500 },
               );
            }

            const users = data?.users ?? [];

            for (const user of users) {
               userIds.push(user.id);
            }

            if (users.length < USERS_PER_PAGE) {
               break;
            }

            page += 1;
         }

         for (const userId of userIds) {
            const { error } =
               await ctx.supabaseAdmin.auth.admin.deleteUser(userId);

            if (error) {
               return Response.json(
                  {
                     error: `Failed to delete user ${userId}: ${error.message}`,
                  },
                  { status: 500 },
               );
            }
         }

         const createdUserIds: string[] = [];

         for (let i = 1; i <= SEED_USER_COUNT; i += 1) {
            const userNumber = String(i).padStart(2, "0");
            const email = `seed-user-${userNumber}@example.com`;
            const name = `Seed User ${userNumber}`;
            const { data, error } =
               await ctx.supabaseAdmin.auth.admin.createUser({
                  email,
                  password: SEED_PASSWORD,
                  email_confirm: true,
                  user_metadata: { name },
               });

            if (error) {
               return Response.json(
                  {
                     error: `Failed to create user ${email}: ${error.message}`,
                  },
                  { status: 500 },
               );
            }

            if (data.user) {
               createdUserIds.push(data.user.id);
            }
         }

         const colorHistoryRows = buildColorHistoryRows(createdUserIds);
         const friendshipRows = buildFriendshipRows(createdUserIds);

         const { error: colorHistoryError } = await ctx.supabaseAdmin
            .from("color_history")
            .insert(colorHistoryRows);

         if (colorHistoryError) {
            return Response.json(
               {
                  error: `Failed to seed color history: ${colorHistoryError.message}`,
               },
               { status: 500 },
            );
         }

         const { error: friendshipsError } = await ctx.supabaseAdmin
            .from("friendships")
            .insert(friendshipRows);

         if (friendshipsError) {
            return Response.json(
               {
                  error: `Failed to seed friendships: ${friendshipsError.message}`,
               },
               { status: 500 },
            );
         }

         return Response.json({
            deletedUsers: userIds.length,
            createdUsers: createdUserIds.length,
            createdColorHistoryRows: colorHistoryRows.length,
            createdFriendships: friendshipRows.length,
            seedUserEmails: Array.from(
               { length: SEED_USER_COUNT },
               (_, index) => {
                  const userNumber = String(index + 1).padStart(2, "0");
                  return `seed-user-${userNumber}@example.com`;
               },
            ),
         });
      },
   ),
};
