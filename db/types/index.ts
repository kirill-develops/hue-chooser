import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated, Tables } from "./database.types";

type ColorHistory = Tables<"color_history">;

type FriendBase = {
   user_id: string;
   friend_id: string;
   name: string;
   email: string;
   is_reported: boolean;
   is_blocked: boolean;
};

export type Database = MergeDeep<
   DatabaseGenerated,
   {
      public: {
         Views: {
            friends: {
               Row: FriendBase;
            };
         };
      };
   }
>;

export type Friend = Database["public"]["Views"]["friends"]["Row"] & {
   color_history: Pick<ColorHistory, "color" | "created_at">[];
};
