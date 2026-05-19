import { supabase } from "@/lib/supabase";

export async function fetchFriends(id: string) {
   const { data, error } = await supabase
      .from("friend_edges")
      .select("friend:users!friend_id(*, color_history(color, created_at))")
      .eq("user_id", id)
      .order("created_at", {
         referencedTable: "friend.color_history",
         ascending: false,
      });

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
