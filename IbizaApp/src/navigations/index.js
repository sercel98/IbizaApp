import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../scenes/home";
import About from "../scenes/About";

const Stack = createStackNavigator();
export default function AppStackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
}