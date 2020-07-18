import React from "react";
import { FlatList, Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CartItemDetail } from "../components/cartItemDetail"
import { removeItem } from "../actions/cartActions";

function Cart(props) {

  const { cartItems } = props;

  renderCartItem = ({ item }) => {
    return (
      <View></View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Cart detail. Current products {cartItems.length}</Text>
      <FlatList
        data={cartItems}
        style={styles.container}
        renderItem={this.renderCartItem}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
