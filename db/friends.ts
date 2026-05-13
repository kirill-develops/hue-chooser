import { supabase } from "@/lib/supabase";

export async function fetchFriends(id: string) {
   const { data, error } = await supabase
      .from("friend_edges")
      .select("friend:users!friend_id(*)")
      .eq("user_id", id);

   if (error) {
      throw new Error("Failed to fetch user data: " + error.message);
   } else {
      return data.map((d) => d.friend);
   }
}

export async function addFriend(code: string) {
   const { data, error } = await supabase.rpc("add_friend", { code_id: code });

   if (error) {
      throw new Error(error.message);
   } else {
      return data;
   }
}
