import React from "react";
import { ActivityIndicator } from "react-native";
import { Screen } from "./UI";

export default function LoadingScreen() {
   return (
      <Screen>
         <ActivityIndicator size="large" />
      </Screen>
   );
}
