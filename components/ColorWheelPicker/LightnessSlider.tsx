import {
   SLIDER_HEIGHT,
   SLIDER_WIDTH,
} from "@/components/ColorWheelPicker/constants/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, {
   Circle,
   Defs,
   LinearGradient,
   Rect,
   Stop,
} from "react-native-svg";
import { useColorPickerContext } from "../../context/ColorPickerContext";
import { Label } from "../UI";
import { hslToHex } from "./colorUtils";
import { useLightSlider } from "./hooks/useLightSlider";

export function LightnessSlider() {
   const { hue, sat, lightOverride } = useColorPickerContext();
   const { sliderRef, sliderPan } = useLightSlider();

   return (
      <View style={styles.container}>
         <Label>Lightness</Label>
         <View
            ref={sliderRef}
            style={styles.track}
            {...sliderPan.panHandlers}
         >
            <Svg
               width={SLIDER_WIDTH}
               height={SLIDER_HEIGHT}
            >
               <Defs>
                  <LinearGradient
                     id="lgrad"
                     x1="0%"
                     y1="0%"
                     x2="100%"
                     y2="0%"
                  >
                     <Stop
                        offset="0%"
                        stopColor="#000000"
                     />
                     <Stop
                        offset="50%"
                        stopColor={hslToHex(hue, sat, 50)}
                     />
                     <Stop
                        offset="100%"
                        stopColor="#ffffff"
                     />
                  </LinearGradient>
               </Defs>

               <Rect
                  x={0}
                  y={0}
                  width={SLIDER_WIDTH}
                  height={SLIDER_HEIGHT}
                  fill="url(#lgrad)"
                  rx={SLIDER_HEIGHT / 2}
               />

               <Circle
                  cx={(lightOverride / 100) * SLIDER_WIDTH}
                  cy={SLIDER_HEIGHT / 2}
                  r={SLIDER_HEIGHT / 2}
                  fill={hslToHex(hue, sat, lightOverride)}
                  stroke="#fff"
                  strokeWidth={2.5}
               />
            </Svg>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: SLIDER_WIDTH,
      marginTop: 20,
   },

   track: {
      height: SLIDER_HEIGHT,
      borderRadius: SLIDER_HEIGHT / 2,
      overflow: "visible",
   },
});
