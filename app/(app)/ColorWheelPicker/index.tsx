import { Button, Card, Screen, Title } from "@/components/UI";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ColorSwatch } from "./ColorSwatch";
import { ColorWheel } from "./ColorWheel";
import { HexInput } from "./HexInput";
import { LightnessSlider } from "./LightnessSlider";
import { useColorWheel } from "./useColorWheel";

interface ColorWheelPickerProps {
   onConfirm?: (hex: string) => void;
}

export default function ColorWheelPicker({ onConfirm }: ColorWheelPickerProps) {
   const {
      containerRef,
      sliderRef,
      panResponder,
      sliderPan,
      pos,
      hue,
      sat,
      lightOverride,
      selection,
      inputVal,
      confirmed,
      hexColor,
      overlayColor,
      overlayOpacity,
      selectorBorder,
      handleHexInput,
      handleConfirm,
      handleSelectionChange,
   } = useColorWheel({ onConfirm });

   return (
      <Screen>
         <Card>
            <Title>Select a Colour</Title>

            <ColorWheel
               containerRef={containerRef}
               panHandlers={panResponder.panHandlers}
               pos={pos}
               hexColor={hexColor}
               selectorBorder={selectorBorder}
               overlayColor={overlayColor}
               overlayOpacity={overlayOpacity}
            />

            <LightnessSlider
               sliderRef={sliderRef}
               panHandlers={sliderPan.panHandlers}
               hue={hue}
               sat={sat}
               lightOverride={lightOverride}
            />

            <View style={styles.previewRow}>
               <ColorSwatch color={hexColor} />
               <HexInput
                  value={inputVal}
                  selection={selection}
                  onChangeText={handleHexInput}
                  onSelectionChange={handleSelectionChange}
               />
            </View>

            <Button
               title={confirmed ? "✓  Confirmed" : "Confirm Colour"}
               onPress={handleConfirm}
            />
         </Card>
      </Screen>
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
