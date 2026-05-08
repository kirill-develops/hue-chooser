import { LoadingScreen } from "@/components";
import { Screen, Subtitle, Title } from "@/components/UI";
import { useFetchUser } from "@/db/hooks/queries";

export default function Index() {
   const { data: userData } = useFetchUser();

   if (!userData) {
      return <LoadingScreen />;
   }

   return (
      <Screen>
         <Title>Welcome back</Title>
         <Subtitle>{`Welcome back, ${userData.name}!`}</Subtitle>
      </Screen>
   );
}
