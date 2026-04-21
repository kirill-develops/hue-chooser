import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export const unstable_settings = {
   anchor: "index", // Anchor to the index route
};

export default function RootLayout() {
   return (
      <AuthProvider>
         <App />
      </AuthProvider>
   );
}

const App = () => {
   const { session, isSessionLoading } = useAuth();

   if (isSessionLoading) {
      return null;
   }

   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Protected guard={!!session}>
            <Stack.Screen name="(app)" />
         </Stack.Protected>
         <Stack.Protected guard={!session}>
            <Stack.Screen
               name="(public)"
               options={{ animation: "slide_from_left" }}
            />
         </Stack.Protected>
         <Stack.Screen
            name="about"
            options={{ headerShown: false, presentation: "modal" }}
         />
      </Stack>
   );
};
