import React from "react";
import { Path } from "react-native-svg";
import { SEGMENTS, WHEEL_RADIUS } from "./constants";

/** Pre-built hue-ring SVG segments — created once, never re-rendered. */
const hueSegments = Array.from({ length: SEGMENTS }, (_, i) => {
   const a0 = (i / SEGMENTS) * 2 * Math.PI - Math.PI / 2;
   const a1 = ((i + 1) / SEGMENTS) * 2 * Math.PI - Math.PI / 2;
   const x0 = WHEEL_RADIUS + WHEEL_RADIUS * Math.cos(a0);
   const y0 = WHEEL_RADIUS + WHEEL_RADIUS * Math.sin(a0);
   const x1 = WHEEL_RADIUS + WHEEL_RADIUS * Math.cos(a1);
   const y1 = WHEEL_RADIUS + WHEEL_RADIUS * Math.sin(a1);
   const hue = (i / SEGMENTS) * 360;

   return (
      <Path
         key={i}
         d={`M${WHEEL_RADIUS},${WHEEL_RADIUS} L${x0},${y0} A${WHEEL_RADIUS},${WHEEL_RADIUS} 0 0,1 ${x1},${y1} Z`}
         fill={`hsl(${hue}, 100%, 50%)`}
      />
   );
});

export default hueSegments;
