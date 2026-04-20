import { Stack } from "expo-router";

export default function PublicLayout() {
   return (
      <Stack>
         <Stack.Screen
            name="index"
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="signup"
            options={{ headerShown: false, presentation: "modal" }}
         />

         <Stack.Screen
            name="forgot-password"
            options={{ headerShown: false, presentation: "modal" }}
         />
      </Stack>
   );
}
