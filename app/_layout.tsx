import { AuthProvider, useAuth } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
      },
   },
});

export const unstable_settings = {
   anchor: "index", // Anchor to the index route
};

export default function RootLayout() {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <App />
         </AuthProvider>
      </QueryClientProvider>
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
