import {
   ColorSwatch,
   ColorWheel,
   HexInput,
   LightnessSlider,
} from "@/components/ColorWheelPicker/";
import { Button, Card, Screen, Title } from "@/components/UI";
import {
   ColorPickerProvider,
   useColorPickerContext,
} from "@/context/ColorPickerContext";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";

function ColorWheelPickerInner() {
   const { hexColor, isColorPending, handleConfirmColor } =
      useColorPickerContext();

   const handleConfirmPress = async () => {
      const result = await handleConfirmColor();
      if (!result.ok) {
         Alert.alert(result.title, result.message);
      }
      if (result.ok) {
         Alert.alert(result.title, result.message);
         router.back();
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Select a Colour</Title>
            <ColorWheel />
            <LightnessSlider />
            <View style={styles.previewRow}>
               <ColorSwatch color={hexColor} />
               <HexInput />
            </View>
            <Button
               title={"Confirm Colour"}
               disabled={isColorPending}
               onPress={handleConfirmPress}
            />
         </Card>
      </Screen>
   );
}

export default function ColorWheelPicker() {
   return (
      <ColorPickerProvider>
         <ColorWheelPickerInner />
      </ColorPickerProvider>
   );
}

const styles = StyleSheet.create({
   previewRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      gap: 12,
   },
});
