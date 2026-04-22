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
import { Alert } from "react-native";

export default function Index() {
   const { session, logout } = useAuth();

   const handleSignOut = async () => {
      try {
         await logout();
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Logout Failed", message);
      }
   };

   if (!session?.user) {
      return (
         <Screen>
            <Card>
               <Title>User Not found</Title>
            </Card>
         </Screen>
      );
   }
   console.log(session.user.user_metadata.name);

   return (
      <Screen>
         <Card>
            <Title>Hue Chooser</Title>
            <Subtitle>{`Welcome back, ${session.user.user_metadata.name}!`}</Subtitle>
            <CardRow>
               <Link href="/profile">Go to Dashboard</Link>
            </CardRow>
            <Button
               title="Sign out"
               onPress={handleSignOut}
               variant="secondary"
            />
            <CardRow>
               <Link href="/about">About Hue Chooser</Link>
            </CardRow>
         </Card>
      </Screen>
   );
}
