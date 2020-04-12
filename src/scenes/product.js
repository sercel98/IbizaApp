import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";
import AsyncImage from '../shared/AsyncImage'

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
        <AsyncImage style={styles.itemImage} image={product.image}></AsyncImage>
        <Text style={styles.itemText}> {product.name}</Text>
        <Text>cantidad</Text>
        <Button
          title="Añadir al carrito"
          onPress={this.addToCart}
          style={styles.btnAddToCart}
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
  },
  btnAddToCart: {

  }, 
  itemImage: {
    height:200, 
    width:200
  }
});
