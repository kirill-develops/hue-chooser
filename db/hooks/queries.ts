import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchFriends } from "../friends";
import { fetchMovies } from "../movies";
import { fetchUser } from "../users";

export function useFetchUser() {
   const { session } = useAuth();

   return useQuery({
      queryKey: ["user", session?.user.id],
      queryFn: () => fetchUser(session?.user.id!),
      enabled: !!session?.user.id,
   });
}

export function useFetchMovies() {
   return useQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies,
   });
}

export function useFetchFriends() {
   const { data: user } = useFetchUser();

   return useQuery({
      queryKey: ["friends", user?.id],
      queryFn: () => fetchFriends(user?.id!),
      enabled: !!user?.id,
   });
}
