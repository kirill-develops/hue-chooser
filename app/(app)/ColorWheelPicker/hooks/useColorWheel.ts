import { useCallback, useRef, useState } from "react";
import { PanResponder, View } from "react-native";
import {
   clampPct,
   clampToCircle,
   computeHex,
   expand3,
   hexToHsl,
   pointToHueSat,
} from "../colorUtils";
import { SELECTOR_RADIUS, WHEEL_RADIUS } from "../constants";

interface UseColorWheelOptions {
   onConfirm?: (hex: string) => void;
}

export function useColorWheel({ onConfirm }: UseColorWheelOptions) {
   // ── Refs — hold latest values for PanResponder closures ──────────────
   const containerRef = useRef<View>(null);
   const sliderRef = useRef<View>(null);
   const layoutRef = useRef({ pageX: 0, pageY: 0 });
   const sliderLayout = useRef({ pageX: 0 });
   const hueRef = useRef(0);
   const satRef = useRef(0);
   const lightRef = useRef(50);

   // ── State — drives renders ────────────────────────────────────────────
   const [pos, setPos] = useState({ x: WHEEL_RADIUS, y: WHEEL_RADIUS });
   const [hue, setHue] = useState(0);
   const [sat, setSat] = useState(0);
   const [lightOverride, setLightOverride] = useState(50);
   const [selection, setSelection] = useState({ start: 1, end: 1 });
   const [inputVal, setInputVal] = useState("#FFFFFF");
   const [confirmed, setConfirmed] = useState(false);

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

   // ── Handlers ──────────────────────────────────────────────────────────
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

   const handleLightChange = useCallback((pct: number) => {
      const newLight = Math.round(pct * 100);
      setLightOverride(newLight);
      lightRef.current = newLight;
      setInputVal(
         computeHex(hueRef.current, satRef.current, newLight).toUpperCase(),
      );
      setConfirmed(false);
   }, []);

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

   const handleConfirm = useCallback(() => {
      setConfirmed(true);
      onConfirm?.(hexColor);
   }, [hexColor, onConfirm]);

   // ── Pan responders ────────────────────────────────────────────────────
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

   return {
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
   };
}
