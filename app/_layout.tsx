import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
   return (
      <AuthProvider>
         <App />
      </AuthProvider>
   );
}

const App = () => {
   const { session } = useAuth();

   return (
      <Stack screenOptions={{ headerShown: true }}>
         <Stack.Protected guard={!!session}>
            <Stack.Screen name="(app)" />
         </Stack.Protected>
         <Stack.Protected guard={!session}>
            <Stack.Screen name="(public)" />
         </Stack.Protected>
      </Stack>
   );
};
