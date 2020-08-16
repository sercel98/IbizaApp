import React from "react";
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../actions/authenticationActions";

export default function Header(props) {
  const { navigation } = props;
  const route = useRoute();
  const isLogged = useSelector((state) => state.auth);
  const goBack = () => navigation.goBack();

  const goLogin = () => {
    navigation.navigate("Login");
  };
  const goHome = () => {
    navigation.navigate("Home");
  };

  const goOrders = () => {
    navigation.navigate("Orders");
  };

  const dispatch = useDispatch();

  if (route.name === "SplashScreen") {
    return <View />;
  } else {
    return (
      <View style={styles.header}>
        <StatusBar barStyle="light-content" />

        {route.name === "Home" ? (
          isLogged ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MaterialCommunityIcons
                name="logout"
                onPress={() => dispatch(logout())}
                size={30}
                color="white"
              />
              <MaterialIcons
                name="store"
                size={30}
                color="white"
                onPress={goOrders}
                style={{ paddingLeft: 12 }}
              />
            </View>
          ) : (
            <MaterialIcons
              name="person"
              size={30}
              onPress={goLogin}
              style={styles.headerIcon}
            />
          )
        ) : (
          <MaterialIcons
            name="keyboard-return"
            size={30}
            onPress={goBack}
            style={styles.headerIcon}
          />
        )}
        {route.name !== "Login" && (
          <TouchableOpacity style={styles.imageContainer} onPress={goHome}>
            <Image
              style={styles.headerLogo}
              source={require("../../assets/images/icon.png")}
            />
          </TouchableOpacity>
        )}
        <ShoppingCartIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    paddingHorizontal: 22,
    paddingVertical: 15,
    height: 70,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  headerIcon: {
    color: "#fff",
    paddingTop: 2,
  },
  imageContainer: {
    height: "100%",
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
  },
});
