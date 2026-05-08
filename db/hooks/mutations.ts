import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMovie } from "../movies";

export function useInsertMovies() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: insertMovie,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["movies"] });
      },
   });
}
