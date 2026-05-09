import { supabase } from "@/lib/supabase";

export async function fetchUser(id: string) {
   const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

   if (error) {
      throw new Error("Failed to fetch user data:" + error.message);
   } else {
      return data;
   }
}
