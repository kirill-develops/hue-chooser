import ColorHistoryList from "@/components/ColorHistoryList";
import { Button, Card, Screen, Subtitle, Title } from "@/components/UI";
import {
   useDeleteBlockedUser,
   useDeleteReportedUser,
   useInsertBlockedUser,
   useInsertReportedUser,
} from "@/db/hooks/mutations";
import { useFetchFriends } from "@/db/hooks/queries";
import { useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

export default function FriendPage() {
   const { friendId } = useLocalSearchParams<{ friendId?: string }>();
   const { data: friendsData, isError, error } = useFetchFriends();
   const { mutateAsync: insertReportedUser, isPending: isReportingUser } =
      useInsertReportedUser();
   const { mutateAsync: deleteReportedUser, isPending: isDeletingReport } =
      useDeleteReportedUser();
   const { mutateAsync: insertBlockedUser, isPending: isBlockingUser } =
      useInsertBlockedUser();
   const { mutateAsync: deleteBlockedUser, isPending: isDeletingBlock } =
      useDeleteBlockedUser();

   const friend = friendsData?.find((f) => f.friend_id === friendId);

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

   const {
      name,
      color_history: colorHistory,
      is_reported: isReported,
   } = friend;
   const hasBlockedUser = !!(friend as { is_blocked?: boolean | null }).is_blocked;
   const hasReportedUser = !!isReported;

   const totalColors = colorHistory.length;
   const colorString = totalColors === 1 ? "color" : "colors";
   const blockedString = hasBlockedUser ? "User is blocked" : "";
   const reportedString = hasReportedUser ? "User is reported" : "";
   const isUpdatingReport = isReportingUser || isDeletingReport;
   const isUpdatingBlock = isBlockingUser || isDeletingBlock;
   const reportButtonTitle = isUpdatingReport
      ? hasReportedUser
         ? "Removing..."
         : "Reporting..."
      : hasReportedUser
        ? "Remove Report"
        : "Report User";
   const blockButtonTitle = isUpdatingBlock
      ? hasBlockedUser
         ? "Unblocking..."
         : "Blocking..."
      : hasBlockedUser
        ? "Unblock User"
        : "Block User";

   const handleButtonPress = async () => {
      try {
         if (hasReportedUser) {
            await deleteReportedUser(friend.friend_id);
            return;
         }

         await insertReportedUser(friend.friend_id);
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again";
         Alert.alert(
            hasReportedUser ? "Remove Report Failed" : "Report Failed",
            message,
         );
      }
   };

   const handleBlockButtonPress = async () => {
      try {
         if (hasBlockedUser) {
            await deleteBlockedUser(friend.friend_id);
            return;
         }

         await insertBlockedUser(friend.friend_id);
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again";
         Alert.alert(
            hasBlockedUser ? "Unblock Failed" : "Block Failed",
            message,
         );
      }
   };

   return (
      <Screen>
         <Card>
            <Title>{name}&apos;s Color History</Title>
            {hasBlockedUser && <Subtitle>{blockedString}</Subtitle>}
            {hasReportedUser && <Subtitle>{reportedString}</Subtitle>}
            <Subtitle>{`has ${totalColors} ${colorString} saved`}</Subtitle>
            <ColorHistoryList colorHistory={colorHistory} />
            <Button
               title={reportButtonTitle}
               onPress={handleButtonPress}
               variant="secondary"
               disabled={isUpdatingReport || isUpdatingBlock}
            />
            <Button
               title={blockButtonTitle}
               onPress={handleBlockButtonPress}
               variant="secondary"
               disabled={isUpdatingReport || isUpdatingBlock}
            />
         </Card>
      </Screen>
   );
}
