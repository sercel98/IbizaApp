import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from "redux";
import { emptyCart, removeItem } from "../actions/cartActions";
import Loader from '../shared/loader'
import orderService from "../services/orderService"

function UserForm(props) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { cartItems, emptyCart } = props;

  const handlePressSend = async () => {
    try {
      userInfo.products = cartItems;
      userInfo['createdAt'] = Date.now();
      userInfo['active'] = true; 
      setLoading(true);
      const orderId = await orderService.save(userInfo);
      emptyCart();
      alert('Pedido tomado con exito');
      navigation.navigate('Cart');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const handleChangeText = (key, value) => {
    const newUserInfo = { ...userInfo };
    newUserInfo[key] = value;
    setUserInfo(newUserInfo);
  }

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Datos de envio</Text>
      </View>
      <View style={styles.fieldsContainer}>

        <Text style={styles.textInputTitle}>Nombre y Apellido:</Text>
        <TextInput
          textContentType="name"
          value={userInfo.names}
          onChangeText={(text) => { handleChangeText('names', text) }}
          style={styles.SectionStyle}
        />
        <Text style={styles.textInputTitle}>Direccion:</Text>
        <TextInput
          value={userInfo.address}
          onChangeText={(text) => { handleChangeText('address', text) }}
          style={styles.SectionStyle}
          autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Telefono:</Text>
        <TextInput
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          value={userInfo.phone}
          onChangeText={(text) => { handleChangeText('phone', text) }}
          style={styles.SectionStyle}
          autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Email:</Text>
        <TextInput
          value={userInfo.email}
          onChangeText={(text) => { handleChangeText('email', text) }}
          style={styles.SectionStyle}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handlePressSend}>
          <Text style={styles.userFormButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeItem,
      emptyCart
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  fieldsContainer: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: 30,
    marginLeft: 10,
  },
  titleText: {
    textAlign: "left",
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 27,
    color: '#FFFFFF',
    marginBottom: 60,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    width: 340,
    borderRadius: 5,
    margin: 10,
    bottom: 8,
  },
  textInputTitle: {
    width: 340,
    textAlign: 'left',
    fontSize: 21,
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  button: {
    marginTop: 50,
    width: 370,
    height: 60,
    backgroundColor: "#FBBD40",
    color: "#000",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  userFormButtonText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    alignItems: "center",
    fontFamily: 'Roboto',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
