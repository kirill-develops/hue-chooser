import { LoadingScreen } from "@/components";
import ColorHistoryList from "@/components/ColorHistoryList";
import { Card, Screen, Subtitle, Title } from "@/components/UI";
import { useFetchFriends } from "@/db/hooks/queries";
import { useLocalSearchParams } from "expo-router";

export default function FriendPage() {
   const { friendId } = useLocalSearchParams();
   const { data: friendData, isFetching, isError, error } = useFetchFriends();

   if (isFetching) return <LoadingScreen />;

   const friend = friendData?.find((f) => f.id === friendId);

   if (isError || !friend) {
      const message =
         error instanceof Error ? error.message : "Please try again";

      return (
         <Screen>
            <Card>
               <Title>Page Error</Title>
               <Subtitle>Couldn&apos;t Find Friend</Subtitle>
               <Subtitle>{message}</Subtitle>
            </Card>
         </Screen>
      );
   }

   const { name, color_history: colorHistory } = friend;
   const totalColors = colorHistory.length;
   const colorString = totalColors === 1 ? "color" : "colors";

   return (
      <Screen>
         <Card>
            <Title>{name}&apos;s Color History</Title>
            <Subtitle>{`has ${totalColors} ${colorString} saved`}</Subtitle>
            <ColorHistoryList colorHistory={colorHistory} />
         </Card>
      </Screen>
   );
}
