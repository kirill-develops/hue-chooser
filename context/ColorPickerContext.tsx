import { computeHex } from "@/components/ColorWheelPicker/colorUtils";
import { WHEEL_RADIUS } from "@/components/ColorWheelPicker/constants/constants";
import { useAddColor } from "@/db/hooks/mutations";
import React, { createContext, useContext, useRef, useState } from "react";

type ColorUploadResult = { ok: boolean; title: string; message: string };

type ColorPickerState = {
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
   isColorPending: boolean;
   handleConfirmColor: () => Promise<ColorUploadResult>;
   // Shared setters — hooks call these to trigger re-renders
   hue: number;
   sat: number;
   inputVal: string;
   lightOverride: number;
   setHue: (h: number) => void;
   setSat: (s: number) => void;
   setLightOverride: (l: number) => void;
   setInputVal: (v: string) => void;
   pos: { x: number; y: number };
   setPos: (p: { x: number; y: number }) => void;
};

const ColorPickerContext = createContext<ColorPickerState | null>(null);

export function useColorPickerContext(): ColorPickerState {
   const ctx = useContext(ColorPickerContext);
   if (!ctx)
      throw new Error(
         "useColorPickerContext must be used within ColorPickerProvider",
      );
   return ctx;
}

type ColorPickerProviderProps = {
   children: React.ReactNode;
};

export function ColorPickerProvider({ children }: ColorPickerProviderProps) {
   const hueRef = useRef(0);
   const satRef = useRef(0);
   const lightRef = useRef(50);

   const [pos, setPos] = useState({ x: WHEEL_RADIUS, y: WHEEL_RADIUS });
   const [hue, setHue] = useState(0);
   const [sat, setSat] = useState(0);
   const [lightOverride, setLightOverride] = useState(50);
   const [inputVal, setInputVal] = useState("#FFFFFF");
   const { mutateAsync: addColor, isPending: isColorPending } = useAddColor();

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

   const handleConfirmColor = async () => {
      try {
         await addColor(hexColor);
         return {
            ok: true,
            title: "Color Updated",
            message: `${hexColor} saved on your profile`,
         };
      } catch (error) {
         const message =
            error instanceof Error ? error.message : "Please try again.";
         return {
            ok: false,
            title: "Color Upload Failed",
            message,
         };
      }
   };

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
            isColorPending,
            handleConfirmColor,
            hue,
            setHue,
            inputVal,
            setInputVal,
            sat,
            setSat,
            lightOverride,
            setLightOverride,
            pos,
            setPos,
         }}
      >
         {children}
      </ColorPickerContext.Provider>
   );
}
