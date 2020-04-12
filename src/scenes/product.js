import React, { Component } from "react";
import { Text, StyleSheet, View, Button, Image, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
        <View style={styles.product}>
          <Image source={product.image} style={styles.image}/>
          <View style={styles.productDetail}>
            <View style={styles.productDesc}>
              <Text style={styles.productName}> {product.name}</Text>
              <Text style={styles.productVolume}> {product.volume}</Text>
              <Text style={styles.productAlcohol}> {product.alcohol}% Alc</Text>
            </View>
            <View style={styles.productPriceDesc}>
              <Text style={styles.productPrice}> ${product.price} </Text>
            </View>
          </View>
        </View>
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
  },
  product: {
    alignItems: 'center',
  },
  image : {
    height: screenWidth / 1.5,
    width: screenWidth / 1.5,
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  productDetail: {
    width: screenWidth / 1.2,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#000'
  },
  productDesc: {
    width: '50%',
    paddingRight: 10,
    textAlign: 'right',
    borderRightWidth: 2,
    borderRightColor: '#BBBBBB'
  },
  productPriceDesc: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  productVolume: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  productAlcohol: {
    fontSize: 16,
    color: '#BBBBBB',
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },  
  btnAddToCart: {

  }
});
