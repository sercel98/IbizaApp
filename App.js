import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNavigation from "./src/navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import store from "./src/store";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppStackNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
