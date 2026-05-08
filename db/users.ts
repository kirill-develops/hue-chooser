import { supabase } from "@/lib/supabase";
import { User } from "./types";

export async function fetchUser(id: string) {
   const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single<User>();

   if (error) {
      throw new Error("Failed to fetch user data:" + error.message);
   } else {
      return data;
   }
}
