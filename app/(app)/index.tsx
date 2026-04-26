import {
   Button,
   Card,
   CardRow,
   Link,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import { useFetchMovies, useInsertMovies } from "@/db/hooks/useMovies";
import { Alert } from "react-native";

export default function Index() {
   const { session, logout } = useAuth();
   const { data: movies, isPending, error } = useFetchMovies();
   const { mutate: insertMovie } = useInsertMovies();

   if (!session?.user) {
      return (
         <Screen>
            <Card>
               <Title>User Not found</Title>
            </Card>
         </Screen>
      );
   }

   const pendingMessage = isPending
      ? "Loading movies..."
      : `Movies in database: ${movies?.length ?? 0}`;

   if (error) {
      const message =
         error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Error fetching movies", message);
   }

   const handleInsertMovie = () => {
      insertMovie(
         {
            name: "Inception",
            description: "A mind-bending thriller by Christopher Nolan.",
         },
         {
            onError: (error) => {
               const message =
                  error instanceof Error ? error.message : "Please try again.";
               Alert.alert("Error inserting movie", message);
            },
         },
      );
   };

   const handleSignOut = async () => {
      try {
         await logout();
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Logout Failed", message);
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Hue Chooser</Title>
            <Subtitle>{`Welcome back, ${session.user.user_metadata.name}!`}</Subtitle>
            <Subtitle>{pendingMessage}</Subtitle>
            <CardRow>
               <Link href="/profile">Go to Dashboard</Link>
            </CardRow>
            <Button
               title="Sign out"
               onPress={handleSignOut}
               variant="secondary"
            />
            <Button
               title="Insert Movie"
               onPress={handleInsertMovie}
            />
            <CardRow>
               <Link href="/about">About Hue Chooser</Link>
            </CardRow>
         </Card>
      </Screen>
   );
}
