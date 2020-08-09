import React from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartItemDetail from "../components/cartItemDetail";
import { removeItem } from "../actions/cartActions";
import { useNavigation } from "@react-navigation/native";
import TextTitle from "../components/textTitle";

function Cart(props) {
  const { cartItems } = props;

  const navigation = useNavigation();

  const renderCartItem = ({ item }) => {
    return <CartItemDetail productItem={item} />;
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      <TextTitle textBody={"Mi pedido"} />
      <FlatList
        style={styles.cartList}
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={keyExtractor}
      />

      {cartItems.length !== 0 ? (
        <View style={styles.cartTotalContainer}>
          <View style={styles.cartTotalInfo}>
            <Text style={styles.cartTotalText}>Total sin envío</Text>
            <Text style={styles.cartTotalValue}>${calculateTotal()}</Text>
          </View>
          <TouchableOpacity
            style={styles.userFormButton}
            onPress={() => navigation.navigate("UserForm")}
          >
            <Text style={styles.userFormButtonText}>Realizar pedido</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cartEmptyContainer}>
          <Text style={styles.cartEmpty}>Agrega un producto al carrito!</Text>
        </View>
      )}
    </View>
  );
}
const keyExtractor = (item, index) => index.toString();

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
    backgroundColor: "#000",
  },
  cartList: {
    marginLeft: 15,
  },
  cartDetailTitle: {
    marginTop: 16,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    fontFamily: "Roboto",
  },
  cartTotalInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cartTotalContainer: {
    flexDirection: "row",
    backgroundColor: "#191919",
    height: 100,
    padding: 15,
  },
  cartEmptyContainer: {
    flexDirection: "row",
    backgroundColor: "#191919",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  cartTotalText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#EEE",
    fontFamily: "Roboto",
  },
  cartTotalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    fontFamily: "Roboto",
  },
  cartEmpty: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  userFormButton: {
    backgroundColor: "#FBBD40",
    color: "#000",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userFormButtonText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    alignItems: "center",
    fontFamily: "Roboto",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
