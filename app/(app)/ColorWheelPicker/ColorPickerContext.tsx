import { computeHex } from "@/app/(app)/ColorWheelPicker/colorUtils";
import { WHEEL_RADIUS } from "@/app/(app)/ColorWheelPicker/constants";
import React, {
   createContext,
   useCallback,
   useContext,
   useRef,
   useState,
} from "react";

interface ColorPickerState {
   // Shared mutable refs — read by all three hooks
   hueRef: React.MutableRefObject<number>;
   satRef: React.MutableRefObject<number>;
   lightRef: React.MutableRefObject<number>;
   // Derived display values
   hexColor: string;
   overlayColor: string;
   overlayOpacity: number;
   selectorBorder: string;
   // Confirmed state
   confirmed: boolean;
   handleConfirm: () => void;
   onConfirm?: (hex: string) => void;
   // Shared setters — hooks call these to trigger re-renders
   hue: number;
   sat: number;
   inputVal: string;
   lightOverride: number;
   setHue: (h: number) => void;
   setSat: (s: number) => void;
   setLightOverride: (l: number) => void;
   setConfirmed: (c: boolean) => void;
   setInputVal: (v: string) => void;
   pos: { x: number; y: number };
   setPos: (p: { x: number; y: number }) => void;
}

const ColorPickerContext = createContext<ColorPickerState | null>(null);

export function useColorPickerContext(): ColorPickerState {
   const ctx = useContext(ColorPickerContext);
   if (!ctx)
      throw new Error(
         "useColorPickerContext must be used within ColorPickerProvider",
      );
   return ctx;
}

interface ColorPickerProviderProps {
   onConfirm?: (hex: string) => void;
   children: React.ReactNode;
}

export function ColorPickerProvider({
   onConfirm,
   children,
}: ColorPickerProviderProps) {
   const hueRef = useRef(0);
   const satRef = useRef(0);
   const lightRef = useRef(50);

   const [pos, setPos] = useState({ x: WHEEL_RADIUS, y: WHEEL_RADIUS });
   const [hue, setHue] = useState(0);
   const [sat, setSat] = useState(0);
   const [lightOverride, setLightOverride] = useState(50);
   const [confirmed, setConfirmed] = useState(false);
   const [inputVal, setInputVal] = useState("#FFFFFF");

   const hexColor = computeHex(hue, sat, lightOverride);
   const overlayColor = lightOverride >= 50 ? "rgb(255,255,255)" : "rgb(0,0,0)";
   const overlayOpacity =
      lightOverride >= 50
         ? (lightOverride - 50) / 50
         : (50 - lightOverride) / 50;
   const selectorBorder =
      lightOverride < 40
         ? "#fff"
         : lightOverride > 75
           ? "#333"
           : sat < 20
             ? "#333"
             : "#fff";

   const handleConfirm = useCallback(() => {
      setConfirmed(true);
      onConfirm?.(hexColor);
   }, [hexColor, onConfirm]);

   return (
      <ColorPickerContext.Provider
         value={{
            hueRef,
            satRef,
            lightRef,
            hexColor,
            overlayColor,
            overlayOpacity,
            selectorBorder,
            confirmed,
            handleConfirm,
            onConfirm,
            hue,
            inputVal,
            sat,
            lightOverride,
            setHue,
            setSat,
            setLightOverride,
            setConfirmed,
            setInputVal,
            pos,
            setPos,
         }}
      >
         {children}
      </ColorPickerContext.Provider>
   );
}
