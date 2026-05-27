import {
   ColorSwatch,
   ColorWheel,
   HexInput,
   LightnessSlider,
} from "@/components/ColorWheelPicker/";
import { Button, Card, CardRow, Screen, Title } from "@/components/UI";
import {
   ColorPickerProvider,
   useColorPickerContext,
} from "@/context/ColorPickerContext";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet } from "react-native";

function ColorWheelPickerInner() {
   const { hexColor, isColorPending, handleConfirmColor } =
      useColorPickerContext();

   const handleConfirmPress = async () => {
      const result = await handleConfirmColor();
      if (!result.ok) {
         Alert.alert(result.title, result.message);
      }
      if (result.ok) {
         Alert.alert(result.title, result.message, [
            {
               onPress: () => router.push("/"),
            },
         ]);
      }
   };

   return (
      <Screen>
         <Card>
            <Title>Select a Colour</Title>
            <ColorWheel />
            <LightnessSlider />
            <CardRow
               variant="row"
               style={styles.previewRow}
            >
               <ColorSwatch color={hexColor} />
               <HexInput />
            </CardRow>
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
      marginTop: 24,
      gap: 8,
   },
});
