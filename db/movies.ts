import { supabase } from "@/lib/supabase";

export async function fetchMovies() {
   const { data, error } = await supabase.from("movies").select("*");

   if (error) {
      throw new Error(error.message);
   }

   return data;
}

type insertMovieParams = {
   name: string;
   description: string;
};

export async function insertMovie({ name, description }: insertMovieParams) {
   const { error } = await supabase.from("movies").insert({
      name,
      description,
   });

   if (error) {
      throw new Error(error.message);
   }
}
