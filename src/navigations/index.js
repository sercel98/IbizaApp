import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../scenes/home";
import About from "../scenes/about";
import Header from "../shared/header";
import ProductDetail from "../scenes/productDetail";
import Cart from "../scenes/cart";
import Login from "../scenes/login";
import UserForm from "../scenes/userForm";
import Orders from "../scenes/orders";
import OrderDetail from "../scenes/orderDetail";
import SplashScreen from "../scenes/splashScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function AppStackNavigation() {
  const isLogged = useSelector((state) => state.auth);
  const splashScreenVideo = useSelector((state) => state.navigation.splashScreenVideo);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        gestureEnabled: true,
        header: (props) => <Header {...props} />,
      }}
    >
      {
        splashScreenVideo ? <Stack.Screen name="SplashScreen" component={SplashScreen} /> : <></>
      }
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="UserForm" component={UserForm} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      {
        !isLogged ? <Stack.Screen name="Login" component={Login} /> : <></>
      }
    </Stack.Navigator>
  );
}
