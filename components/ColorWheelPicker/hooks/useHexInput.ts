import { useColorPickerContext } from "@/context/ColorPickerContext";
import { useCallback, useState } from "react";
import { expand3, hexToHsl } from "../colorUtils";
import { SELECTOR_RADIUS, WHEEL_RADIUS } from "../constants/constants";

export function useHexInput() {
   const {
      hueRef,
      satRef,
      lightRef,
      inputVal,
      setInputVal,
      setHue,
      setSat,
      setLightOverride,
      setPos,
   } = useColorPickerContext();

   const [selection, setSelection] = useState({ start: 1, end: 1 });

   const handleHexInput = useCallback((text: string) => {
      const stripped = text.replace(/[^0-9A-Fa-f]/g, "");
      const withHash = `#${stripped.toUpperCase()}`;
      setInputVal(withHash);

      const normalised = /^#[0-9A-F]{3}$/.test(withHash)
         ? expand3(withHash)
         : withHash;

      if (!/^#[0-9A-F]{6}$/.test(normalised)) return;

      const result = hexToHsl(normalised);
      if (!result) return;

      const { h, s, l } = result;
      const isAchromatic = s === 0;
      const dist = isAchromatic ? 0 : s * (WHEEL_RADIUS - SELECTOR_RADIUS);
      const angle = h * 2 * Math.PI - Math.PI / 2;

      setPos({
         x: WHEEL_RADIUS + dist * Math.cos(angle),
         y: WHEEL_RADIUS + dist * Math.sin(angle),
      });

      if (!isAchromatic) {
         setHue(h * 360);
         hueRef.current = h * 360;
      }

      setSat(s * 100);
      satRef.current = s * 100;

      const newLight = Math.round(l * 100);
      setLightOverride(newLight);
      lightRef.current = newLight;
   }, []);

   const handleSelectionChange = useCallback((start: number, end: number) => {
      setSelection({ start: Math.max(1, start), end: Math.max(1, end) });
   }, []);

   return { inputVal, selection, handleHexInput, handleSelectionChange };
}
