import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../scenes/home";
import About from "../scenes/about";
import Header from "../shared/header";

const Stack = createStackNavigator();
export default function AppStackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Home"
                         screenOptions={{
                             headerStyle: {
                                 backgroundColor: '#000',
                             },
                             gestureEnabled: true,
                             header: (props) => (<Header {...props}/>)
                         }}
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="About" component={About}/>
        </Stack.Navigator>
    );
}
