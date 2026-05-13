import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addColor } from "../colors";
import { addFriend } from "../friends";
import { useFetchUser } from "./queries";

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

export function useAddColor() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: (color: string) => addColor(user!.id, color),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      },
   });
}
