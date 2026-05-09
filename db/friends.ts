import { supabase } from "@/lib/supabase";

export async function fetchFriends(id: string) {
   const { data, error } = await supabase
      .from("friendships")
      .select(
         "u_high:users!friendships_user_high_fkey(*), u_low:users!friendships_user_low_fkey(*)",
      )
      .or(`user_low.eq.${id},user_high.eq.${id}`);

   if (error) {
      throw new Error("Failed to fetch user data: " + error.message);
   } else {
      return data;
   }
}

export async function addFriend(id: string) {
   const { data, error } = await supabase.rpc("add_friend", { friend_id: id });

   if (error) {
      throw new Error(error.message);
   } else {
      return data;
   }
}
