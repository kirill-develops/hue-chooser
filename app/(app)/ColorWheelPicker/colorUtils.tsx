import { SELECTOR_RADIUS, SLIDER_WIDTH, WHEEL_RADIUS } from "./constants";

export function hslToHex(h: number, s: number, l: number): string {
   s /= 100;
   l /= 100;
   const k = (n: number) => (n + h / 30) % 12;
   const a = s * Math.min(l, 1 - l);
   const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
   const hex = (v: number) =>
      Math.round(v * 255)
         .toString(16)
         .padStart(2, "0");
   return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

/** Normalise 3-digit → 6-digit  (#F0C → #FF00CC) */
export const expand3 = (hex: string): string =>
   `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;

export function hexToHsl(
   hex: string,
): { h: number; s: number; l: number } | null {
   const result = /^#([0-9a-f]{6})$/i.exec(hex);
   if (!result) return null;
   const [r, g, b] = [0, 2, 4].map(
      (i) => parseInt(result[1].slice(i, i + 2), 16) / 255,
   );
   const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
   const l = (max + min) / 2;
   if (max === min) return { h: 0, s: 0, l };
   const d = max - min;
   const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
   const h =
      max === r
         ? ((g - b) / d + (g < b ? 6 : 0)) / 6
         : max === g
           ? ((b - r) / d + 2) / 6
           : ((r - g) / d + 4) / 6;
   return { h, s, l };
}

export function pointToHueSat(
   px: number,
   py: number,
): { hue: number; sat: number } {
   const dx = px - WHEEL_RADIUS;
   const dy = py - WHEEL_RADIUS;
   const dist = Math.sqrt(dx * dx + dy * dy);
   // Segments start at -π/2 (top = 0°); atan2 starts at 0 (right = 0°).
   // +90 aligns them so top = hue 0°.
   const hue = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
   const sat = Math.min((dist / WHEEL_RADIUS) * 100, 100);
   return { hue, sat };
}

export function clampToCircle(
   px: number,
   py: number,
): { x: number; y: number } {
   const dx = px - WHEEL_RADIUS;
   const dy = py - WHEEL_RADIUS;
   const dist = Math.sqrt(dx * dx + dy * dy);
   if (dist <= WHEEL_RADIUS - SELECTOR_RADIUS) return { x: px, y: py };
   const angle = Math.atan2(dy, dx);
   return {
      x: WHEEL_RADIUS + (WHEEL_RADIUS - SELECTOR_RADIUS) * Math.cos(angle),
      y: WHEEL_RADIUS + (WHEEL_RADIUS - SELECTOR_RADIUS) * Math.sin(angle),
   };
}

export function blendWithOverlay(
   hue: number,
   sat: number,
   light: number,
): string {
   const baseHex = hslToHex(hue, 100, 50);
   const [br, bg, bb] = [
      parseInt(baseHex.slice(1, 3), 16),
      parseInt(baseHex.slice(3, 5), 16),
      parseInt(baseHex.slice(5, 7), 16),
   ];
   const overlayVal = light >= 50 ? 255 : 0;
   const overlayOpacity = light >= 50 ? (light - 50) / 50 : (50 - light) / 50;
   const alpha = overlayOpacity * (sat / 100);
   const blend = (base: number, overlay: number) =>
      Math.round(base * (1 - alpha) + overlay * alpha);
   const hex = (v: number) => v.toString(16).padStart(2, "0");
   return `#${hex(blend(br, overlayVal))}${hex(blend(bg, overlayVal))}${hex(blend(bb, overlayVal))}`;
}

export function computeHex(hue: number, sat: number, light: number): string {
   return sat === 0 ? hslToHex(0, 0, light) : blendWithOverlay(hue, sat, light);
}

/** Clamp a slider drag pageX to a 0–1 percentage. */
export const clampPct = (pageX: number, originX: number): number =>
   Math.min(Math.max((pageX - originX) / SLIDER_WIDTH, 0), 1);
