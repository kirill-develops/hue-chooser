import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../friends";
import { insertMovie } from "../movies";
import { useFetchUser } from "./queries";

export function useInsertMovies() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: insertMovie,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["movies"] });
      },
   });
}

export function useAddFriend() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: addFriend,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      },
   });
}
