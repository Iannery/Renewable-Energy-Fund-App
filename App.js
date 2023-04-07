import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    // AlbertSansBold: require("./assets/fonts/AlbertSans-Bold.ttf"),
    // AlbertSansLight: require("./assets/fonts/AlbertSans-Light.ttf"),
    // AlbertSansMedium: require("./assets/fonts/AlbertSans-Medium.ttf"),
    // AlbertSansRegular: require("./assets/fonts/AlbertSans-Regular.ttf"),
    // AlbertSansSemiBold: require("./assets/fonts/AlbertSans-SemiBold.ttf"),
    // AlbertSansBlack: require("./assets/fonts/AlbertSans-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
