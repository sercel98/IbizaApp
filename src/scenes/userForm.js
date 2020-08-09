import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import { emptyCart, removeItem } from "../actions/cartActions";
import Loader from "../shared/loader";
import orderService from "../services/orderService";

function UserForm(props) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [namesValidate, setNamesValidate] = useState(false);
  const [addressValidate, setAddressValidate] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const navigation = useNavigation();
  const { cartItems, emptyCart } = props;
  const handlePressSend = async () => {
    try {
      if (
        !namesValidate ||
        !addressValidate ||
        !phoneValidate ||
        !emailValidate
      ) {
        alert("Debes llenar todos los campos!");
      } else {
        userInfo.products = cartItems;
        setLoading(true);
        const orderId = await orderService.save(userInfo);
        emptyCart();
        alert("Pedido tomado con exito");
        navigation.navigate("Cart");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const setErrorTextInputStyle = (componentId) => {
    document.getElementById(componentId).className = "errorInputText";
  };

  const validateText = (componentName, text) => {
    const nameRule = /^\s*[a-zA-Z,\s]+\s*$/;
    const phoneRule = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
    const emailRule = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (componentName === "names") {
      if (nameRule.test(text)) {
        setNamesValidate(true);
      } else {
        setNamesValidate(false);
      }
    } else if (componentName === "address") {
      if (text !== "") {
        setAddressValidate(true);
      } else {
        setAddressValidate(false);
      }
    } else if (componentName === "phone") {
      if (phoneRule.test(text)) {
        setPhoneValidate(true);
      } else {
        setPhoneValidate(false);
      }
    } else if (componentName === "email") {
      if (emailRule.test(text) || text === "") {
        setEmailValidate(true);
      } else {
        setEmailValidate(false);
      }
    }
  };

  const handleChangeText = (key, value) => {
    validateText(key, value);
    const newUserInfo = { ...userInfo };
    newUserInfo[key] = value;
    setUserInfo(newUserInfo);
  };

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
          onChangeText={(text) => {
            handleChangeText("names", text);
          }}
          style={[
            styles.SectionStyle,
            namesValidate ? styles.okTextInput : null,
          ]}
          id="nameInputText"
        />
        <Text style={styles.textInputTitle}>Direccion:</Text>
        <TextInput
          value={userInfo.address}
          onChangeText={(text) => {
            handleChangeText("address", text);
          }}
          style={[
            styles.SectionStyle,
            addressValidate ? styles.okTextInput : null,
          ]}
          autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Telefono:</Text>
        <TextInput
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          value={userInfo.phone}
          onChangeText={(text) => {
            handleChangeText("phone", text);
          }}
          style={[
            styles.SectionStyle,
            phoneValidate ? styles.okTextInput : null,
          ]}
          autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Email:</Text>
        <TextInput
          value={userInfo.email}
          onChangeText={(text) => {
            handleChangeText("email", text);
          }}
          style={[
            styles.SectionStyle,
            emailValidate ? styles.okTextInput : null,
          ]}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handlePressSend}
          disabled={false}
        >
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
      emptyCart,
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  fieldsContainer: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginTop: -100,
    marginLeft: 15,
    fontFamily: "Roboto",
  },
  titleText: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    fontFamily: "Roboto",
    lineHeight: 27,
    marginBottom: 60,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    width: 340,
    borderRadius: 5,
    margin: 10,
    bottom: 8,
    padding: 5,
  },
  textInputTitle: {
    width: 340,
    textAlign: "left",
    fontSize: 20,
    lineHeight: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  button: {
    marginTop: 50,
    width: 340,
    height: 60,
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
  okTextInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "green",
    height: 40,
    width: 340,
    borderRadius: 5,
    margin: 10,
    bottom: 8,
  },
  errorInputText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "red",
    height: 40,
    width: 340,
    borderRadius: 5,
    margin: 10,
    bottom: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
