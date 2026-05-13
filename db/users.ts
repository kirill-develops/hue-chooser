import { supabase } from "@/lib/supabase";

export async function fetchUser(id: string) {
   const { data, error } = await supabase
      .from("users")
      .select(
         "*, invite_code: invite_codes(code), color_history(color, created_at)",
      )
      .order("created_at", {
         referencedTable: "color_history",
         ascending: false,
      })
      .eq("id", id)
      .single();

   if (error) {
      throw new Error("Failed to fetch user data:" + error.message);
   } else {
      return { ...data, invite_code: data?.invite_code?.code };
   }
}
