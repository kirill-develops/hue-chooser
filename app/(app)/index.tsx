import { LoadingScreen } from "@/components/";
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
import { useFetchUser } from "@/db/hooks/queries";
import { Alert } from "react-native";

export default function Index() {
   const { logout } = useAuth();
   const { data: userData } = useFetchUser();

   if (!userData) {
      return <LoadingScreen />;
   }

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
            <Subtitle>{`Welcome back, ${userData.name}!`}</Subtitle>
            <CardRow>
               <Link href="/profile">Go to Dashboard</Link>
               <Link href="/ColorWheelPicker">Select Color</Link>
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
