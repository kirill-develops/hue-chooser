import { Friend } from "@/db/types";
import { getFontColorVariant } from "@/lib/getFontColorVariant";
import React from "react";
import { FlatList } from "react-native";
import { Body, Button } from "./UI";

type FriendListProps = {
   friendsData?: Friend[];
   isPending: boolean;
};

export default function FriendList({
   friendsData,
   isPending,
}: FriendListProps) {
   return (
      <FlatList
         data={friendsData}
         keyExtractor={(friend) => friend.friend_id}
         renderItem={({ item }) => <FriendItem friendData={item} />}
         ListEmptyComponent={
            <Body>{isPending ? "Loading..." : "You have no friends"}</Body>
         }
         contentContainerStyle={{
            marginVertical: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
         }}
      />
   );
}

type FriendItemProps = {
   friendData: Friend;
};

function FriendItem({ friendData }: FriendItemProps) {
   const { name, color_history, friend_id } = friendData;
   const { color } = color_history[0] ?? {};
   const fontColorVariant = getFontColorVariant(color);
   console.log(friendData.friend_id);

   return (
      <Button
         title={name}
         textColor={color && { color: fontColorVariant }}
         href={`/friends/${friend_id}`}
         style={{
            backgroundColor: color && color,
            height: 40,
            paddingVertical: 0,
         }}
      />
   );
}
