import { supabase } from "@/lib/supabase";

export async function addColor(user_id: string, color: string) {
   const { error } = await supabase
      .from("color_history")
      .insert({ user_id: user_id, color });

   if (error) throw new Error(error.message);
}
