import { Stack } from "expo-router";

export default function PublicLayout() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{
               title: "Home",
               headerShown: false,
               animation: "slide_from_left",
            }}
         />
         <Stack.Screen name="[friendId]" />
      </Stack>
   );
}
