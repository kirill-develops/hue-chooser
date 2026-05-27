import { Tabs } from "expo-router";

export default function AppLayout() {
   return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen
            options={{ title: "Color Picker" }}
            name="color-picker"
         />
         <Tabs.Screen
            options={{ title: "Home" }}
            name="(home)"
         />

         <Tabs.Screen
            options={{ title: "Profile" }}
            name="profile"
         />
      </Tabs>
   );
}
