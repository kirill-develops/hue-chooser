import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { SELECTOR_RADIUS, WHEEL_RADIUS, WHEEL_SIZE } from "./constants";
import hueSegments from "./HueSegments";

interface ColorWheelProps {
   containerRef: React.RefObject<View | null>;
   panHandlers: any;
   pos: { x: number; y: number };
   hexColor: string;
   selectorBorder: string;
   overlayColor: string;
   overlayOpacity: number;
}

export function ColorWheel({
   containerRef,
   panHandlers,
   pos,
   hexColor,
   selectorBorder,
   overlayColor,
   overlayOpacity,
}: ColorWheelProps) {
   return (
      <View
         ref={containerRef}
         style={[
            styles.wheelWrapper,
            { width: WHEEL_SIZE, height: WHEEL_SIZE },
         ]}
         {...panHandlers}
      >
         <Svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
         >
            <Defs>
               <RadialGradient
                  id="sat"
                  cx="50%"
                  cy="50%"
                  r="50%"
               >
                  <Stop
                     offset="0%"
                     stopColor={overlayColor}
                     stopOpacity="0"
                  />
                  <Stop
                     offset="100%"
                     stopColor={overlayColor}
                     stopOpacity={overlayOpacity}
                  />
               </RadialGradient>
            </Defs>

            {hueSegments}

            <Circle
               cx={WHEEL_RADIUS}
               cy={WHEEL_RADIUS}
               r={WHEEL_RADIUS}
               fill="url(#sat)"
            />

            <Circle
               cx={pos.x}
               cy={pos.y}
               r={SELECTOR_RADIUS}
               fill={hexColor}
               stroke={selectorBorder}
               strokeWidth={3}
            />
         </Svg>
      </View>
   );
}

const styles = StyleSheet.create({
   wheelWrapper: {
      borderRadius: WHEEL_SIZE / 2,
      overflow: "hidden",
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.45,
      shadowRadius: 14,
   },
});
