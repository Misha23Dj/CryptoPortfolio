import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme, useThemeMode } from "../theme/ThemeProvider";

const ThemeFade: React.FC = () => {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const opacity = useSharedValue(0);
  const prev = useRef(mode);

  useEffect(() => {
    if (prev.current !== mode) {
      opacity.value = 1;
      opacity.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
      prev.current = mode;
    }
  }, [mode]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: theme.bg, zIndex: 10 },
        animatedStyle,
      ]}
    />
  );
};

export default ThemeFade;
