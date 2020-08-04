import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart, removeItem } from "../actions/cartActions";
import { FlatList } from "react-native-gesture-handler";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => index.toString();

  renderProducts = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{item.product.names}</Text>
        <Text>{item.quantity}</Text>
      </View>
    );
  };

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  render() {
    const { navigation, route } = this.props;
    const { orderItem } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.orderDetailTitle}>Detalles del pedido</Text>

        <View style={styles.orderContainer}>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoTitle}>Información del cliente</Text>
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientInfoLabel}>Nombre: </Text>
              <Text style={styles.clientInfoValue}>{orderItem.names} </Text>
            </View>
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientInfoLabel}>Dirección: </Text>
              <Text style={styles.clientInfoValue}>{orderItem.address}</Text>
            </View>
            <View style={styles.clientInfoRow}>
              <Text style={styles.clientInfoLabel}>Teléfono: </Text>
              <Text style={styles.clientInfoValue}>{orderItem.phone}</Text>
            </View>
          </View>

          <View style={styles.productsRow}>
            <Text style={styles.productsTitle}>Pedido</Text>
            <Text style={styles.productsQuantityTitle}>Cantidad</Text>
            <FlatList
              style={styles.orderList}
              data={orderItem.producs}
              renderItem={this.renderProducts}
              keyExtractor={this.keyExtractor}
            />
          </View>

          <View style={styles.options}>
            <Text style={styles.optionsTitle}>Opciones</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              <TouchableOpacity style={styles.btnCancelarPedido}>
                <Text style={styles.btnTextOption}>Cancelar pedido</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnContactar}>
                <Text numberOfLines={2} style={styles.btnTextOption}>
                  {`Contactarse con \nel comprador`}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.btnConfirmar}>
                <Text style={styles.btnConfirmarText}>Completar envío</Text>
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
      removeItem,
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "black",
  },
  orderDetailTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  orderContainer: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#191919",
    borderRadius: 5,
    borderWidth: 1,
    padding: 14,
    flexDirection: "column",
  },
  clientInfo: {
    alignItems: "flex-start",
  },
  clientInfoTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  clientInfoLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  clientInfoValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    fontFamily: "Roboto",
  },
  clientInfoRow: {
    flexDirection: "row",
  },
  productsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  productsQuantityTitle: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto",
  },
  productsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  optionsRow: {
    marginTop: 15,
    flexDirection: "row",
  },
  optionsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  optionsRow: {
    flexDirection: "row",
    flex: 1,
  },
  btnCancelarPedido: {
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  btnTextOption: {
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    textAlign: "center",
  },
  btnContactar: {
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnConfirmar: {
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnConfirmarText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  options: {
    flexDirection: "column",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
