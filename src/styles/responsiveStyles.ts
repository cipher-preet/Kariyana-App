import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/* Scale width components */
const scale = (size: number) => (width / guidelineBaseWidth) * size;

/* Scale height components */
const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

/* Balanced scale */
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/* Balanced vertical scale */
const moderateScaleVertical = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

/* FIXED text scaling */
const textScale = (percent: number) => {
  const screen = Dimensions.get("window");
  const ratio = screen.height / screen.width;

  // deviceHeight based on orientation and screen ratio
  const deviceHeight =
    Platform.OS === "android"
      ? screen.height - (StatusBar.currentHeight || 0)
      : screen.height;

  const guidelineHeight = ratio > 1.8 ? 0.126 : 0.15;
  const finalHeight = deviceHeight * guidelineHeight;

  const heightPercent = (percent * finalHeight) / 100;

  return Math.round(heightPercent);
};

export {
  scale,
  verticalScale,
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
  height,
};
