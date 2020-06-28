import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {removeItem} from "../actions/cartActions";
import {Linking} from 'expo';

function Cart(props) {
  const { cartItems } = props;
  console.log(cartItems)

  return (
    <View style={styles.container}>
      <Text>Cart detail. Current products {cartItems.length}</Text>
      <Button
        title="Open WhatsApp"
        onPress={() => sendCartToWhatsappMessage(cartItems)}
        />
    </View>
  );
}

const sendCartToWhatsappMessage = (cartItems) => {
  const number = 3042141840;
  const message = buildMessage(cartItems);
  Linking.openURL(`whatsapp://send?phone=57${number}&text=${message}`)
      .then(() => {
      }).catch(err => alert("Asegurese de instalar Whatsapp"));
}
const buildMessage = (cartItems)=> {
  return JSON.stringify(cartItems);
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeItem
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
