import { supabase } from "@/lib/supabase";

export async function fetchFriends(id: string) {
   const { data, error } = await supabase
      .from("friends")
      .select("*, color_history(color, created_at)")
      .eq("user_id", id)
      .order("created_at", {
         referencedTable: "color_history",
         ascending: false,
      });

   if (error) {
      throw new Error("Failed to fetch user data: " + error.message);
   } else {
      return data;
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

export async function insertReportUser(reporterID: string, reportedID: string) {
   const { error } = await supabase
      .from("reported_users")
      .insert({ reporter_id: reporterID, reported_user_id: reportedID });

   if (error) {
      throw new Error(error.message);
   }
}

export async function deleteReportedUser(reporterID: string, reportedID: string) {
   const { error } = await supabase
      .from("reported_users")
      .delete()
      .eq("reporter_id", reporterID)
      .eq("reported_user_id", reportedID);

   if (error) {
      throw new Error(error.message);
   }
}

export async function insertBlockedUser(blockerID: string, blockedID: string) {
   const { error } = await supabase
      .from("blocked_users")
      .insert({ blocker_id: blockerID, blocked_user_id: blockedID });

   if (error) {
      throw new Error(error.message);
   }
}

export async function deleteBlockedUser(blockerID: string, blockedID: string) {
   const { error } = await supabase
      .from("blocked_users")
      .delete()
      .eq("blocker_id", blockerID)
      .eq("blocked_user_id", blockedID);

   if (error) {
      throw new Error(error.message);
   }
}
