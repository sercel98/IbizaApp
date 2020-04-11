import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AppStackNavigation from "./src/navigations";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
       <NavigationContainer>
        <AppStackNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
