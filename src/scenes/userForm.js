import React from "react";
import { FlatList, Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartItemDetail from "../components/cartItemDetail";
import { removeItem } from "../actions/cartActions";
import { useNavigation } from "@react-navigation/native";

function UserForm(props) {

  const { cartItems } = props;

  const navigation = useNavigation();

  const openForm = () => {
    navigation.navigate("UserForm");
  }
  
  const renderCartItem = ({ item }) => {
    return (
      <CartItemDetail product={item}></CartItemDetail>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Cart detail. Current products {cartItems.length}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeItem,
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
