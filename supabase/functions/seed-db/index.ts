import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const SEED_USER_COUNT = 20;
const SEED_PASSWORD = "123456";
const USERS_PER_PAGE = 1_000;

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

         return Response.json({
            deletedUsers: userIds.length,
            createdUsers: createdUserIds.length,
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
