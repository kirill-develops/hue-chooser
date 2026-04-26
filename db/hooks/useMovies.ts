import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies, insertMovie } from "../movies";

export function useFetchMovies() {
   return useQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies,
   });
}

export function useInsertMovies() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: insertMovie,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["movies"] });
      },
   });
}
