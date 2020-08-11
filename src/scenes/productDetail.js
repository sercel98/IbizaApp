import React, {Component} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addToCart, removeItem} from "../actions/cartActions";
import AsyncImage from '../shared/AsyncImage';
import {Button} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import AwesomeAlert from "react-native-awesome-alerts";

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
    this.setState({quantityOfProduct: this.state.quantityOfProduct + 1});
  }

  decrementProduct = () => {
    if (this.state.quantityOfProduct > 1) {
      this.setState({quantityOfProduct: this.state.quantityOfProduct - 1});
    }
  }

  setQuantity = () => {
    this.setState({quantityOfProduct: this.props.params.productItem.quantity});
  }

  addToCart = () => {
    const {route} = this.props;
    const {product} = route.params;
    let quantity = this.state.quantityOfProduct;

    this.props.removeItem(product);
    this.props.addToCart(product, quantity)
    this.setState({visible: true})
  };

  closeAlert = () => {
    const {navigation} = this.props;
    this.setState({visible: false})
    navigation.navigate("Home");
  }

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    const {navigation, route} = this.props;
    let {product} = route.params;
    if (product === undefined) {
      product = route.params.productItem.product;
    }
    //console.log(route.params.productItem);
    return (
        <View style={styles.container}>
          <AwesomeAlert
              show={this.state.visible}
              title="Agregado"
              message="Este item ha sido agregado a tu carrito"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showConfirmButton={true}
              confirmText="OK"
              confirmButtonColor="green"
              overlayStyle={alertStyles.alertContainer}
              titleStyle={alertStyles.alertTitleText}
              confirmButtonTextStyle={alertStyles.alertButtonText}
              contentContainerStyle={alertStyles.alertPopup}
              onConfirmPressed={() => {
                this.closeAlert();
              }}
              onDismiss={() => {
                this.closeAlert();
              }}
          />
          <View style={styles.product}>
            <AsyncImage style={styles.image} image={product.image} folder={'products'}></AsyncImage>
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
  },
  btnText: {
    color: '#FFFFFF',
  },
  alertTitleText: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: 'Roboto',
    lineHeight: 27,
  },
  alertButtonText: {
    fontSize: 22,
    fontWeight: "500",
    fontFamily: 'Roboto',
    lineHeight: 27,
  },
  alertContainer: {
    height: '100%',
    width: '100%',
  },
  alertPopup:{
    borderRadius: 15,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
