import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addColor } from "../colors";
import {
   addFriend,
   deleteBlockedUser,
   deleteReportedUser,
   insertBlockedUser,
   insertReportUser,
} from "../friends";
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

export function useInsertReportedUser() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: (reportedId: string) =>
         insertReportUser(user!.id, reportedId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      },
   });
}

export function useDeleteReportedUser() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: (reportedId: string) =>
         deleteReportedUser(user!.id, reportedId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      },
   });
}

export function useInsertBlockedUser() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: (blockedId: string) => insertBlockedUser(user!.id, blockedId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      },
   });
}

export function useDeleteBlockedUser() {
   const queryClient = useQueryClient();
   const { data: user } = useFetchUser();

   return useMutation({
      mutationFn: (blockedId: string) => deleteBlockedUser(user!.id, blockedId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["friends", user?.id] });
      },
   });
}
