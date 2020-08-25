import React, { useState } from "react";
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
import firebaseClient from "../services/firebaseClient";
import AwesomeAlert from "react-native-awesome-alerts";

export default function Header(props) {
  const { navigation } = props;
  const route = useRoute();
  const isLogged = useSelector((state) => state.auth);
  const goBack = () => navigation.goBack();
  const [showAlert, setShowAlert] = useState(false);

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
  const signOut = async () => {
    await firebaseClient.auth.signOut();
    dispatch(logout());
    setShowAlert(false);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

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
              <AwesomeAlert
                show={showAlert}
                title="Cerrar Sesión"
                message="Realmente desea cerrar sesión?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                showCancelButton={true}
                confirmText="Cerrar Sesión"
                cancelText="Atrás"
                confirmButtonColor="red"
                cancelButtonColor="gray"
                overlayStyle={styles.alertContainer}
                titleStyle={styles.alertTitleText}
                confirmButtonTextStyle={styles.alertButtonText}
                cancelButtonTextStyle={styles.alertButtonText}
                contentContainerStyle={styles.alertPopup}
                onConfirmPressed={() => {
                  signOut();
                }}
                onCancelPressed={() => {
                  hideAlert();
                }}
                onDismiss={() => {
                  hideAlert();
                }}
              />
              <MaterialCommunityIcons
                name="logout"
                onPress={()=>{setShowAlert(true)}}
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
  alertTitleText: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertButtonText: {
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertContainer: {
    height: "100%",
    width: "100%",
  },
  alertPopup: {
    borderRadius: 15,
  },
});
