import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";
import AsyncImage from "../shared/AsyncImage";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      quantity: props.route.params.quantity,
      product: props.route.params.product,
    };
  }

  incrementProduct = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  decrementProduct = () => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  setQuantity = () => {
    this.setState({ quantity: this.props.params.productItem.quantity });
  };

  addToCart = () => {
    const { route } = this.props;
    const { product } = route.params;
    let quantity = this.state.quantity;

    this.props.removeItem(product);
    this.props.addToCart(product, quantity);
    this.setState({ visible: true });
  };

  closeAlert = () => {
    const { navigation } = this.props;
    this.setState({ visible: false });
    navigation.navigate("Home");
  };

  formatPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  render() {
    const { navigation, route } = this.props;
    const { product } = route.params;
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
          messageStyle={alertStyles.alertMessageText}
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
          <AsyncImage
            style={styles.image}
            image={product.image}
            folder={"products"}
          ></AsyncImage>
          <View style={styles.detailContainer}>
            <Text style={styles.nameText}>{product.name}</Text>
            <Text style={styles.priceText}>
              {"$" + this.formatPrice(product.price)}
            </Text>
          </View>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.textQuantity}>Cantidad</Text>
          <View style={styles.quantityView}>
            <View>
              <AntDesign
                name="caretleft"
                size={30}
                onPress={this.decrementProduct}
                style={styles.decrementIcon}
              />
            </View>
            <Text style={styles.quantity}>{this.state.quantity}</Text>
            <View>
              <AntDesign
                name="caretright"
                size={30}
                onPress={this.incrementProduct}
                style={styles.decrementIcon}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.btnAddToCart} onPress={this.addToCart}>
          <Text style={styles.addCartButtonText}>Añadir al Carrito</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#000",
  },
  product: {
    alignItems: "center",
  },
  image: {
    height: screenWidth / 1.2,
    width: screenWidth / 1.2,
    maxHeight: 350,
    maxWidth: 300,
    resizeMode: "cover",
  },
  productDetail: {
    width: screenWidth / 1.2,
    maxWidth: 350,
    padding: 20,
    flexDirection: "row",
  },
  productDesc: {
    width: "60%",
    paddingRight: 10,
    paddingVertical: 8,
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: "#BBBBBB",
    borderRightWidth: 1,
    borderRightColor: "#BBBBBB",
  },
  countText: {
    fontSize: 35,
    fontFamily: "Poppins_600SemiBold",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productPriceDesc: {
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 17,
    textAlign: "right",
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
  productVolume: {
    fontSize: 16,
    textAlign: "right",
    color: "#BBBBBB",
  },
  productAlcohol: {
    fontSize: 16,
    textAlign: "right",
    color: "#BBBBBB",
  },
  productPrice: {
    textAlign: "center",
    fontSize: 26,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFF",
  },
  quantityContainer: {
    alignItems: "center",
  },
  textQuantity: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  quantityView: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  decrementIcon: {
    color: "#fff",
  },
  quantity: {
    marginHorizontal: 5,
    fontSize: 30,
    color: "#FFF",
    fontFamily: "Poppins_600SemiBold",
  },
  btnAddToCart: {
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#E93A3B",
  },
  addCartButtonText:{
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  detailContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nameText: {
    color: "#FFFFFF",
    lineHeight: 30,
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  priceText:{
    color: "#FFFFFF",
    lineHeight: 30,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  }
});

const alertStyles = StyleSheet.create({
  alert: {
    backgroundColor: "white",
  },
  icon: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CB748",
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  btn: {
    borderRadius: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: "stretch",
    backgroundColor: "#4CB748",
    marginTop: 16,
    minWidth: "50%",
    fontFamily: "Poppins_400Regular",
  },
  btnText: {
    color: "#FFFFFF",
  },
  alertTitleText: {
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
    lineHeight: 27,
  },
  alertMessageText:{
    fontSize: 14,
    fontFamily: "Poppins_300Light",
  },
  alertButtonText: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
    lineHeight: 27,
  },
  alertContainer: {
    height: "100%",
    width: "100%",
  },
  alertPopup: {
    borderRadius: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
