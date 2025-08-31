import ScreenContainer from "@/components/ScreenContainer";
import ThemeProvider from "@/theme/ThemeProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ScreenContainer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </ScreenContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
