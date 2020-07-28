import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ShoppingCartIcon = (props) => {
  const navigation = useNavigation();
  const { cartItems } = props;
  const openCartDetail = () => {
    navigation.navigate("Orders");
  };
  return (
    <TouchableOpacity onPress={openCartDetail}>
      <View style={styles.productCounter}>
        <Text style={styles.textCounter}>{cartItems.length}</Text>
      </View>
      <MaterialIcons
        name="shopping-cart"
        size={30}
        style={styles.headerIcon}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

const styles = StyleSheet.create({
  productCounter: {
    position: "absolute",
    height: 16,
    width: 16,
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: "center",
    zIndex: 5000,
    marginLeft: 15,
  },
  textCounter: {
    color: "white",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 10,
    fontFamily: 'Roboto'
  },
  headerIcon: {
    color: "#fff",
    paddingTop: 2
  },
});

export default connect(mapStateToProps)(ShoppingCartIcon);

