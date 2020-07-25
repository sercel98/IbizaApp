import React from "react";
import { FlatList, Button, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartItemDetail from "../components/cartItemDetail";
import { removeItem } from "../actions/cartActions";
import { useNavigation } from "@react-navigation/native";

function Cart(props) {

  const { cartItems } = props;

  const navigation = useNavigation();
  
  const renderCartItem = ({ item }) => {
    return (
    <CartItemDetail productItem={item}/>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartDetailTitle}>Cart detail {cartItems.length}</Text>
      <FlatList data={cartItems} 
        renderItem={renderCartItem}
        keyExtractor={keyExtractor}/>
      <View>
      <Text style={styles.cartDetailTitle}>Total sin envío:  {cartItems.length}</Text>
      <Button title="Realizar pedido" style={styles.userFormButton} onPress={() => navigation.navigate('UserForm')} />
      
      </View>
      
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
    alignItems: "center",
    justifyContent: "center",
  },
  cartDetailTitle: {
    color: "#FFF",

  }, 
  userFormButton: {
    backgroundColor: "#FBBD40",
    color: "#000"
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
