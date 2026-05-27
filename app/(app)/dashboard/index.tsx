import { InputGroup, LoadingScreen } from "@/components";
import FriendList from "@/components/FriendList";
import {
   Button,
   Card,
   CardRow,
   Screen,
   Subtitle,
   Title,
} from "@/components/UI";
import { useAddFriend } from "@/db/hooks/mutations";
import { useFetchFriends, useFetchUser } from "@/db/hooks/queries";
import { useState } from "react";
import { Alert, Share } from "react-native";

export default function Index() {
   const [inviteCode, setInviteCode] = useState("");
   const { data: userData } = useFetchUser();
   const { mutateAsync: addFriend, isPending: isAddingFriend } = useAddFriend();
   const { data: friendsData, isPending, error } = useFetchFriends();

   if (!userData) {
      return <LoadingScreen />;
   }

   if (error) {
      const message =
         error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Error fetching friends: ", message);
   }

   const handleAddFriend = async () => {
      const normalizedInviteCode = inviteCode.trim();
      if (!normalizedInviteCode) {
         Alert.alert("Error", "Please enter a friend ID.");
         return;
      }

      try {
         const friendName = await addFriend(normalizedInviteCode);
         Alert.alert("Friend Added", `You are now friends with ${friendName}.`);
         setInviteCode("");
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Add Friend Failed", message);
      }
   };

   const handleShareInviteCode = async () => {
      const code = userData.invite_code;

      if (!code) {
         Alert.alert(
            "Invite Code Unavailable",
            "Please try again in a moment.",
         );
         return;
      }

      try {
         await Share.share({
            message: `Add me on Hue Chooser with my invite code: ${code}`,
         });
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Share Failed", message);
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Friend Dashboard</Title>
            <Subtitle>{`Welcome back, ${userData.name}!`}</Subtitle>
            <Button
               title={"Color History"}
               variant="social"
               href="/color-history"
            />
            <CardRow>
               <FriendList
                  friendsData={friendsData}
                  isPending={isPending}
               />
            </CardRow>
            <InputGroup
               label="Friend ID"
               placeholder="Enter friend Code"
               autoCapitalize="none"
               autoCorrect={false}
               value={inviteCode}
               onChangeText={(value) => setInviteCode(value.replace(/\s/g, ""))}
            />

            <Button
               title={isAddingFriend ? "Adding Friend..." : "Add Friend"}
               onPress={handleAddFriend}
               disabled={isAddingFriend}
            />
            <Button
               title={"Share friendship Code"}
               onPress={handleShareInviteCode}
               disabled={!userData.invite_code}
            />
         </Card>
      </Screen>
   );
}
