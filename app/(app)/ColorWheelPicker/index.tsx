import {
   ColorSwatch,
   ColorWheel,
   HexInput,
   LightnessSlider,
} from "@/components/ColorWheelPicker/";
import { Button, Card, Screen, Title } from "@/components/UI";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
   ColorPickerProvider,
   useColorPickerContext,
} from "./ColorPickerContext";

interface ColorWheelPickerProps {
   onConfirm?: (hex: string) => void;
}

function ColorWheelPickerInner() {
   const { hexColor, confirmed, handleConfirm } = useColorPickerContext();

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
               title={confirmed ? "✓  Confirmed" : "Confirm Colour"}
               onPress={handleConfirm}
            />
         </Card>
      </Screen>
   );
}

export default function ColorWheelPicker({ onConfirm }: ColorWheelPickerProps) {
   return (
      <ColorPickerProvider onConfirm={onConfirm}>
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
