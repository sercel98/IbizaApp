import React, { useState } from "react";
import {StyleSheet, Text, TextInput, Button, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {emptyCart, removeItem} from "../actions/cartActions";

function UserForm(props) {
  const [userInfo, setUserInfo] = useState({});
  const {cartItems, emptyCart} = props;
  const handlePressSend = async () => {
    try {
      userInfo.products = cartItems;
      const orderId = await orderService.save(userInfo);
      emptyCart();
      alert('Pedido tomado con exito');
    } catch(e){
      console.log(e);
    }
  }
  const handleChangeText = (key, value) => {
    const newUserInfo = {... userInfo};
    newUserInfo[key] = value;
    setUserInfo(newUserInfo);
  }
  return (
      <View style={styles.container}>
        <View style={styles.tittleContainer}>
          <Text style={styles.tittleText}>Datos de envio</Text>
        </View>
        <View style={styles.fieldsContainer}>

          <Text style={styles.textInputTitle}>Nombre y Apellido:</Text>
          <TextInput
              value={userInfo.names}
              onChangeText={(text) => { handleChangeText('names', text)}}
              style={styles.SectionStyle}
          />
          <Text style={styles.textInputTitle}>Direccion:</Text>
          <TextInput
              value={userInfo.address}
              onChangeText={(text) => { handleChangeText('address', text)}}
              style={styles.SectionStyle}
              autoCapitalize="none"
          />
          <Text style={styles.textInputTitle}>Telefono:</Text>
          <TextInput
              value={userInfo.phone}
              onChangeText={(text) => { handleChangeText('phone', text)}}
              style={styles.SectionStyle}
              autoCapitalize="none"
          />
          <Text style={styles.textInputTitle}>Email:</Text>
          <TextInput
              value={userInfo.email}
              onChangeText={(text) => { handleChangeText('email', text)}}
              style={styles.SectionStyle}
              autoCompleteType="email"
              autoCapitalize="none"
          />
          <Button
                onPress={handlePressSend}
                titleStyle={{
                  color: 'red',
                  fontSize: 16,
                }}
                title='Enviar'
                color='#FBBD40'
            />
          <View style={styles.button}>
            
          </View>
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
  tittleContainer: {
    alignItems: "flex-start",
    marginTop: 30,
    marginLeft: 10,
  },
  tittleText: {
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
  },
  button: {
    top: 50,
    width: 370,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
