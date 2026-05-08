import { Screen, Subtitle, Title } from "@/components/UI";
import { useFetchUser } from "@/db/hooks/queries";

export default function Index() {
   const { data: userData } = useFetchUser();

   if (!userData) {
      return (
         <Screen>
            <Title>Welcome to Hue Chooser</Title>
            <Subtitle>Please sign in to continue.</Subtitle>
         </Screen>
      );
   }

   return (
      <Screen>
         <Title>Welcome back</Title>
         <Subtitle>{`Welcome back, ${userData.name}!`}</Subtitle>
      </Screen>
   );
}
