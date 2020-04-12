import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../scenes/home";
import About from "../scenes/about";
import Header from "../shared/header";
import ProductDetail from "../scenes/product";
import Cart from "../scenes/cart";
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
            <Stack.Screen name="ProductDetail" component={ProductDetail}/>
            <Stack.Screen name="Cart" component={Cart}/>
            <Stack.Screen name="About" component={About}/>
        </Stack.Navigator>
    );
}
