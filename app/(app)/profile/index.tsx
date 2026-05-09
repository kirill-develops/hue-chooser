import { InputGroup, LoadingScreen } from "@/components";
import { Button, Card, Screen, Subtitle, Title } from "@/components/UI";
import { useAddFriend } from "@/db/hooks/mutations";
import { useFetchFriends, useFetchUser } from "@/db/hooks/queries";
import { useState } from "react";
import { Alert } from "react-native";

export default function Index() {
   const [friendId, setFriendId] = useState("");
   const { data: userData } = useFetchUser();
   const { mutateAsync: addFriend, isPending: isAddingFriend } = useAddFriend();
   const { data: friends, isPending, error } = useFetchFriends();

   if (!userData) {
      return <LoadingScreen />;
   }

   const pendingMessage = isPending
      ? "Loading friends..."
      : `Friends: ${friends?.length ?? 0}`;

   if (error) {
      const message =
         error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Error fetching friends: ", message);
   }

   const handleAddFriend = async () => {
      const normalizedFriendId = friendId.trim();
      if (!normalizedFriendId) {
         Alert.alert("Error", "Please enter a friend ID.");
         return;
      }

      try {
         const friendName = await addFriend(normalizedFriendId);
         Alert.alert("Friend Added", `You are now friends with ${friendName}.`);
         setFriendId("");
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         Alert.alert("Add Friend Failed", message);
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Welcome back</Title>
            <Subtitle>{`Welcome back, ${userData.name}!`}</Subtitle>
            <Subtitle>{pendingMessage}</Subtitle>

            <InputGroup
               label="Friend ID"
               placeholder="Enter friend UUID"
               autoCapitalize="none"
               autoCorrect={false}
               value={friendId}
               onChangeText={(value) => setFriendId(value.replace(/\s/g, ""))}
            />
            <Button
               title={isAddingFriend ? "Adding Friend..." : "Add Friend"}
               onPress={handleAddFriend}
               disabled={isAddingFriend}
            />
         </Card>
      </Screen>
   );
}
