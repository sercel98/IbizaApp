import React from "react";
import {connect} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const ShoppingCartIcon = (props) => {
  const navigation = useNavigation();
  const { cartItems } = props;

  const openCartDetail = () => {
    navigation.navigate("Cart");
  };
  return (
      <View>
        <View style={styles.productCounter}>
          <Text style={styles.textCounter}>{cartItems.length}</Text>
        </View>
        <MaterialIcons
            onPress={openCartDetail}
            name="shopping-cart"
            size={28}
            style={styles.headerIcon}
        />
      </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

export default connect(mapStateToProps)(ShoppingCartIcon);

const styles = StyleSheet.create({
  productCounter: {
    position: "absolute",
    height: 15,
    width: 15,
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
    fontSize: 11,
  },
  headerIcon: {
    color: "#fff",
  },
});
