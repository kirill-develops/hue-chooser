import { Stack } from "expo-router";

export default function PublicLayout() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "slide_from_left" }}
         />
         <Stack.Screen
            name="signup"
            options={{ headerShown: false }}
         />

         <Stack.Screen
            name="forgot-password"
            options={{ headerShown: false }}
         />
      </Stack>
   );
}
