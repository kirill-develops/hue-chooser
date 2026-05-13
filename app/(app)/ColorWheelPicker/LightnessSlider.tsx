import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, {
   Circle,
   Defs,
   LinearGradient,
   Rect,
   Stop,
} from "react-native-svg";
import { computeHex, hslToHex } from "./colorUtils";
import { SLIDER_HEIGHT, SLIDER_WIDTH } from "./constants";

interface LightnessSliderProps {
   sliderRef: React.RefObject<View | null>;
   panHandlers: any;
   hue: number;
   sat: number;
   lightOverride: number;
}

export function LightnessSlider({
   sliderRef,
   panHandlers,
   hue,
   sat,
   lightOverride,
}: LightnessSliderProps) {
   return (
      <View style={styles.container}>
         <Text style={styles.label}>Lightness</Text>
         <View
            ref={sliderRef}
            style={styles.track}
            {...panHandlers}
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
                  fill={computeHex(hue, sat, lightOverride)}
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
   label: {
      color: "rgba(255,255,255,0.5)",
      fontSize: 11,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      marginBottom: 8,
   },
   track: {
      height: SLIDER_HEIGHT,
      borderRadius: SLIDER_HEIGHT / 2,
      overflow: "visible",
   },
});
