import { LoadingScreen } from "@/components";
import ColorHistoryList from "@/components/ColorHistoryList";
import { Card, Screen, Subtitle, Title } from "@/components/UI";
import { useFetchUser } from "@/db/hooks/queries";

export default function ColorHistoryPage() {
   const { data: userData, isFetching, isError, error } = useFetchUser();

   if (isFetching) return <LoadingScreen />;

   if (isError || !userData) {
      const message = error instanceof Error ? error.message : "Please try again";

      return (
         <Screen>
            <Card>
               <Title>Page Error</Title>
               <Subtitle>{message}</Subtitle>
            </Card>
         </Screen>
      );
   }

   const totalColors = userData.color_history.length;
   const colorString = totalColors === 1 ? "color" : "colors";

   return (
      <Screen>
         <Card>
            <Title>Your Color History</Title>
            <Subtitle>{`You have ${totalColors} ${colorString} saved`}</Subtitle>
            <ColorHistoryList colorHistory={userData.color_history} />
         </Card>
      </Screen>
   );
}
