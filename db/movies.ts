import { supabase } from "@/lib/supabase";
import { Movie } from "./types";

export async function fetchMovies() {
   const { data, error } = await supabase
      .from("movies")
      .select<"*", Movie>("*");

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
