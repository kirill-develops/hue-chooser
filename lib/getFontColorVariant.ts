import { darkTheme, lightTheme } from "@/theme";

/**
 * Parses a hex color string into { r, g, b } in [0, 255].
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) hex.
 */
type RgbChannels = { r: number; g: number; b: number };

function hexToRgb(hex: string): RgbChannels {
   const clean = hex.replace(/^#/, "");
   const full =
      clean.length === 3
         ? clean
              .split("")
              .map((c) => c + c)
              .join("")
         : clean;
   return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
   };
}

/**
 * Computes WCAG 2.1 relative luminance for a single linearized channel.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function linearize(value: number): number {
   const c = value / 255;
   return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Returns relative luminance of a hex color (0 = black, 1 = white).
 */
function getLuminance(hex: string): number {
   const { r, g, b } = hexToRgb(hex);
   return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Determines whether a background color requires light or dark text
 * for WCAG AA readability.
 *
 * @param {string} bgHex  - Background color as hex (e.g. '#1c1b19' or '#fff')
 * @returns {'light' | 'dark'} - Use your theme.color.textLight or theme.color.textDark
 */
export function getFontColorVariant(bgHex: string) {
   const bgLuminance = getLuminance(bgHex);
   const {
      colors: { text: lightTextColor },
   } = lightTheme;
   const {
      colors: { text: darkTextColor },
   } = darkTheme;

   // WCAG contrast ratio = (L_lighter + 0.05) / (L_darker + 0.05)
   // Against white (L=1): (1.05) / (bgL + 0.05)
   // Against black (L=0): (bgL + 0.05) / (0.05)
   const contrastWithWhite = 1.05 / (bgLuminance + 0.05);
   const contrastWithBlack = (bgLuminance + 0.05) / 0.05;

   return contrastWithWhite >= contrastWithBlack
      ? darkTextColor
      : lightTextColor;
}
