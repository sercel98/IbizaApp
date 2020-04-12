import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";
class ProductDetail extends Component {
  addToCart = () => {
    const { route } = this.props;
    const { product } = route.params;
    this.props.addToCart(product);
  };
  render() {
    const { navigation, route } = this.props;
    const { product } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.itemText}> {product.name}</Text>
        <Button
          title="Add to cart"
          onPress={this.addToCart}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCart,
      removeItem,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "#fff",
  },
});
