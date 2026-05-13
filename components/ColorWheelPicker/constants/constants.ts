import { Dimensions } from "react-native";

const SCREEN_W = Dimensions.get("window").width;

export const WHEEL_SIZE = Math.min(SCREEN_W - 64, 300);
export const WHEEL_RADIUS = WHEEL_SIZE / 2;
export const SELECTOR_RADIUS = 15;
export const SEGMENTS = 60;
export const SLIDER_WIDTH = WHEEL_SIZE;
export const SLIDER_HEIGHT = 24;
