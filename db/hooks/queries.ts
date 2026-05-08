import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../users";
import { fetchMovies } from "../movies";

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
