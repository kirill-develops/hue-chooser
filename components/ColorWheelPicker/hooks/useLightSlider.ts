import { useColorPickerContext } from "@/context/ColorPickerContext";
import { useCallback, useRef } from "react";
import { PanResponder, View } from "react-native";
import { clampPct, computeHex } from "../colorUtils";

export function useLightSlider() {
   const { hueRef, satRef, lightRef, setLightOverride, setInputVal } =
      useColorPickerContext();

   const sliderRef = useRef<View | null>(null);
   const sliderLayout = useRef({ pageX: 0 });

   const handleLightChange = useCallback((pct: number) => {
      const newLight = Math.round(pct * 100);
      setLightOverride(newLight);
      lightRef.current = newLight;
      setInputVal(
         computeHex(hueRef.current, satRef.current, newLight).toUpperCase(),
      );
   }, []);

   const sliderPan = useRef(
      PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onMoveShouldSetPanResponder: () => true,
         onPanResponderGrant: (e) => {
            sliderRef.current?.measure((_x, _y, _w, _h, pageX) => {
               sliderLayout.current = { pageX };
               handleLightChange(clampPct(e.nativeEvent.pageX, pageX));
            });
         },
         onPanResponderMove: (e) =>
            handleLightChange(
               clampPct(e.nativeEvent.pageX, sliderLayout.current.pageX),
            ),
      }),
   ).current;

   return { sliderRef, sliderPan };
}
