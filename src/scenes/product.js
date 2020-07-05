import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";
import AsyncImage from '../shared/AsyncImage';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityOfProduct: 1,
      visible: false
    };
  }

  incrementProduct = () => {
    this.setState({ quantityOfProduct: this.state.quantityOfProduct + 1 });
  }

  decrementProduct = () => {
    if (this.state.quantityOfProduct > 1) {
      this.setState({ quantityOfProduct: this.state.quantityOfProduct - 1 });
    }
  }

  addToCart = () => {
    const { route } = this.props;
    const { product } = route.params;
    console.log(this.props)
    let quantity = this.state.quantityOfProduct;

    this.props.removeItem(product);
    this.props.addToCart(product, quantity)
    this.setState({ visible: true })
  };

  closeAlert = () => {
    const { navigation } = this.props;
    this.setState({ visible: false })
    navigation.goBack();
  }

  render() {
    const { navigation, route } = this.props;
    const { product } = route.params;
    return (
      <View style={styles.container}>
        <FancyAlert
          visible={this.state.visible}
          icon={
            <View style={[alertStyles.icon, { borderRadius: 32 }]}>
              <Ionicons
                name={Platform.select({ ios: 'ios-checkmark', android: 'md-checkmark' })}
                size={36}
                color="#FFFFFF"
              />
            </View>
          }
          style={{ backgroundColor: 'white' }}
        >
          <View style={alertStyles.content}>
            <Text style={alertStyles.contentText}>Se ha añadido un nuevo producto al carrito</Text>

            <TouchableOpacity style={alertStyles.btn} onPress={this.closeAlert}>
              <Text style={alertStyles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </FancyAlert>

        <View style={styles.product}>
          <AsyncImage style={styles.image} image={product.image}></AsyncImage>
          <View style={styles.productDetail}>
            <View style={styles.productDesc}>
              <Text style={styles.productName}> {product.name}</Text>
              <Text style={styles.productVolume}> {product.volume}</Text>
              <Text style={styles.productAlcohol}> {product.alcohol}% Alc</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.productPriceDesc}>
              <Text style={styles.productPrice}> ${product.price} </Text>
            </View>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.textQuantity}>Cantidad</Text>
          <View style={styles.quantityView}>
            <View>
              <AntDesign
                name='caretleft'
                size={30}
                onPress={this.decrementProduct}
                style={styles.decrementIcon}
              />
            </View>
            <Text style={styles.quantity}>{this.state.quantityOfProduct}</Text>
            <View>
              <AntDesign
                name='caretright'
                size={30}
                onPress={this.incrementProduct}
                style={styles.decrementIcon}
              />
            </View>
          </View>
        </View>
        <Button onPress={this.addToCart} color='white' style={styles.btnAddToCart}>
          Añadir al carrito
        </Button>
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
    height: screenWidth / 1.5,
    width: screenWidth / 1.5,
    maxHeight: 300,
    maxWidth: 300,
    resizeMode: 'cover',
  },
  productDetail: {
    width: screenWidth / 1.2,
    maxWidth: 350,
    padding: 10,
    flexDirection: 'row',
  },
  productDesc: {
    width: '49%',
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
    color: '#FFF'
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
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);