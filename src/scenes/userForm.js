import React from "react";
import {FlatList, Button, StyleSheet, Text, View, TextInput} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CartItemDetail from "../components/cartItemDetail";
import { removeItem } from "../actions/cartActions";
import { useNavigation } from "@react-navigation/native";

function UserForm(props) {

  const { cartItems } = props;

  const navigation = useNavigation();

  const openForm = () => {
    navigation.navigate("UserForm");
  }

  return (
    <View style={styles.container}>
      <View style={styles.tittleContainer}>
        <Text style={styles.tittleText}>Datos de envio</Text>
      </View>
      <View style={styles.fieldsContainer}>

        <Text style={styles.textInputTitle}>Nombre y Apellido:</Text>
        <TextInput
            style={styles.SectionStyle}
        />
        <Text style={styles.textInputTitle}>Direccion:</Text>
        <TextInput
            style={styles.SectionStyle}
            autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Telefono:</Text>
        <TextInput
            style={styles.SectionStyle}
            autoCapitalize="none"
        />
        <Text style={styles.textInputTitle}>Email:</Text>
        <TextInput
            style={styles.SectionStyle}
            autoCapitalize="none"
        />

        <View style={styles.button}>
          <Button
              titleStyle={{
                color: 'red',
                fontSize: 16,
              }}
              title= 'Enviar'
              color='#FBBD40'
          />
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
