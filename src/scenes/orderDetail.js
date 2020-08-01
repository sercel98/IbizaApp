import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";

class OrderDetail extends Component {

  constructor(props) {
    super(props);
  }

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    const { orderItem } = this.props;

    let { product } = route.params;
    if (product === undefined) {
      product = route.params.productItem.product;
    }
    return (
      <View style={styles.container}>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCart,
      removeItem
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#ccc",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: '#000'
  },
  product: {
    alignItems: 'center',
  },
  image: {
    height: screenWidth / 1.2,
    width: screenWidth / 1.2,
    maxHeight: 350,
    maxWidth: 300,
    resizeMode: 'cover',
  },
  productDetail: {
    width: screenWidth / 1.2,
    maxWidth: 350,
    padding: 20,
    flexDirection: 'row',
  },
  productDesc: {
    width: '60%',
    paddingRight: 10,
    paddingVertical: 8
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: '#BBBBBB',
    borderRightWidth: 1,
    borderRightColor: '#BBBBBB'
  },
  countText: {
    fontSize: 35,
    fontWeight: "bold"
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productPriceDesc: {
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#FFF',
  },
  productVolume: {
    fontSize: 16,
    textAlign: 'right',
    color: '#BBBBBB',
  },
  productAlcohol: {
    fontSize: 16,
    textAlign: 'right',
    color: '#BBBBBB',
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  quantityContainer: {
    alignItems: 'center',
  },
  textQuantity: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',

  },
  quantityView: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  decrementIcon: {
    color: '#fff',
  },
  quantity: {
    marginHorizontal: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Roboto',
  },
  btnAddToCart: {
    width: '70%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#E93A3B'
  }
});

const alertStyles = StyleSheet.create({
  alert: {
    backgroundColor: 'white',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB748',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    fontFamily: 'Roboto',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
