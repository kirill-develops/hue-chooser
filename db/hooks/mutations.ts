import { useMutation, useQueryClient } from "@tanstack/react-query";
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
