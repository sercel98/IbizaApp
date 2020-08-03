import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";

class OrderDetail extends Component {

  constructor(props) {
    super(props);
  }

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    const {navigation, route} = this.props;
    const {orderItem} = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.orderDetailTitle}>Detalles del pedido</Text>
        <View style={styles.orderContainer}>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoTitle} >Información del cliente</Text>
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientInfoLabel} >Nombre: </Text>
              <Text style={styles.clientInfoValue}  >{orderItem.names} </Text>
            </View>
            <View style={styles.clientInfoRow} >
              <Text style={styles.clientInfoLabel}>Dirección: </Text>
              <Text style={styles.clientInfoValue} >{orderItem.address}</Text>
            </View>
            <View style={styles.clientInfoRow} >
              <Text style={styles.clientInfoLabel} >Teléfono</Text>
              <Text style={styles.clientInfoValue} >{orderItem.phone}</Text>
            </View>
          </View>

          <View style={styles.productsRow} >
            <Text style={styles.productsTitle} >Pedido</Text>
            <Text style={styles.productsQuantityTitle} >Cantidad</Text>
          </View>

          <View style={styles.options} >
            <Text style={styles.optionsTitle}>Opciones</Text>
            <View style={styles.optionsRow} >
              <TouchableOpacity style={styles.btnCancelarPedido}>
                <Text style={styles.btnTextOption} >Cancelar pedido</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnContactar}>
                <Text style={styles.btnTextOption}>Contactarse con el comprador</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity style={styles.btnConfirmar}>
                <Text style={styles.btnConfirmarText} >Confirmar envío</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: 'black'
  },
  orderDetailTitle:{
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Roboto',

  },
  orderContainer: {
    alignItems: "flex-start",
    backgroundColor: '#191919',
    borderRadius: 5,
    borderWidth: 1, 
    padding: 12,
    flex: 1,
    flexDirection: 'column'
  },
  clientInfo: {
    alignItems: 'flex-start'
  },
  clientInfoTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',

  },
  clientInfoLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  clientInfoValue: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  clientInfoRow: {
    flexDirection: 'row'
  },
  productsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  productsQuantityTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  productsRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  optionsRow: {
    marginTop: 15
  },
  optionsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
  
  },
  optionsRow: {
    flexDirection: 'row',
    flex: 1
  },
  btnCancelarPedido: {
    backgroundColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10

  },
  btnTextOption: {
    fontSize: 18,
    color: 'black'
  },
  btnContactar: {
    backgroundColor: '#FBBD40',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  },
  btnConfirmar: {
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  },
  btnConfirmarText: {
    fontSize: 22,
    color: 'white'
  }







});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
