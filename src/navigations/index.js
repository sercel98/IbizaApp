import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../scenes/home";
import About from "../scenes/about";
import Header from "../shared/header";
import ProductDetail from "../scenes/product";
import Cart from "../scenes/cart";
import Login from "../scenes/login";
import UserForm from "../scenes/userForm.js";
import Orders from "../scenes/orders";

const Stack = createStackNavigator();

export default function AppStackNavigation() {
	return (
		<Stack.Navigator initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#000',
				},
				gestureEnabled: true,
				header: (props) => (<Header {...props} />)
			}}
		>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="ProductDetail" component={ProductDetail} />
			<Stack.Screen name="Cart" component={Cart} />
			<Stack.Screen name="About" component={About} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="UserForm" component={UserForm} />
			<Stack.Screen name="Orders" component={Orders} />

		</Stack.Navigator>
	);
}
