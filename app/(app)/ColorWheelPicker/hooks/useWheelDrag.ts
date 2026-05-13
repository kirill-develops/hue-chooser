import { useCallback, useRef } from "react";
import { PanResponder, View } from "react-native";
import { useColorPickerContext } from "../ColorPickerContext";
import { clampToCircle, computeHex, pointToHueSat } from "../colorUtils";

export function useWheelDrag() {
   const {
      hueRef,
      satRef,
      lightRef,
      setHue,
      setSat,
      setPos,
      setInputVal,
      setConfirmed,
   } = useColorPickerContext();

   const containerRef = useRef<View | null>(null);
   const layoutRef = useRef({ pageX: 0, pageY: 0 });

   const handleDrag = useCallback((pageX: number, pageY: number) => {
      const lx = pageX - layoutRef.current.pageX;
      const ly = pageY - layoutRef.current.pageY;
      const clamped = clampToCircle(lx, ly);
      const { hue: h, sat: s } = pointToHueSat(clamped.x, clamped.y);
      setPos(clamped);
      setHue(h);
      setSat(s);
      hueRef.current = h;
      satRef.current = s;
      setInputVal(computeHex(h, s, lightRef.current).toUpperCase());
      setConfirmed(false);
   }, []);

   const panResponder = useRef(
      PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onMoveShouldSetPanResponder: () => true,
         onPanResponderGrant: (e) => {
            containerRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
               layoutRef.current = { pageX, pageY };
               handleDrag(e.nativeEvent.pageX, e.nativeEvent.pageY);
            });
         },
         onPanResponderMove: (e) =>
            handleDrag(e.nativeEvent.pageX, e.nativeEvent.pageY),
      }),
   ).current;

   return { containerRef, panResponder };
}
