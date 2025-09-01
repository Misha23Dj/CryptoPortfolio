import ScreenContainer from "@/components/ScreenContainer";
import ThemeProvider from "@/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const queryClient = new QueryClient();

  if (!loaded) {
    // Async font loading only occurs in development
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ScreenContainer>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>
          </QueryClientProvider>
        </ScreenContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
