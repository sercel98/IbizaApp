import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import TextTitle from "./../components/textTitle";
import AwesomeAlert from "react-native-awesome-alerts";
import orderService from "../services/orderService";

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorNumberAlert: false,
      showCompletedOrderAlert: false,
      showCancelOrderAlert: false,
    };
  }

  formatProductPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.textLabel, styles.orderValue]}>
          {item.product.name}
        </Text>
        <Text style={[styles.textLabel, styles.orderValue]}>
          {item.quantity}
        </Text>
      </View>
    );
  };

  cancelOrder = (id) => {
    const result = orderService.cancelOrder(id);
    this.setState({ showCancelOrderAlert: true });
  };

  confirmOrder = (id) => {
    const result = orderService.confirmOrder(id);
    this.setState({ showCompletedOrderAlert: true });
  };

  contactBuyer = async (phone) => {
    const route = "https://wa.me/57" + phone;
    const supported = await Linking.canOpenURL(route);
    if (supported) {
      await Linking.openURL(route);
    } else {
      this.showErrorNumberAlert();
    }
  };

  showErrorNumberAlert = () => {
    this.setState({ showErrorNumberAlert: true });
  };

  hideAlerts = () => {
    const { navigation } = this.props;
    this.setState({ showErrorNumberAlert: false });
    this.setState({ showCancelOrderAlert: false });
    this.setState({ showCompletedOrderAlert: false });
    navigation.navigate("Orders");
  };

  render() {
    const { navigation, route } = this.props;
    const orderItem = JSON.parse(route.params.orderItem);
    const total = route.params.total;
    return (
      <View style={styles.container}>
        <AwesomeAlert
          show={this.state.showErrorNumberAlert}
          title="Ha ocurrido un error"
          message="El número provisto por el usuario no es válido para contactarse"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#BC4B51"
          overlayStyle={styles.alertContainer}
          titleStyle={styles.alertTitleText}
          confirmButtonTextStyle={styles.alertButtonText}
          contentContainerStyle={styles.alertPopup}
          onConfirmPressed={() => {
            this.hideAlerts();
          }}
          onDismiss={() => {
            this.hideAlerts();
          }}
        />
        <AwesomeAlert
        show={this.state.showCancelOrderAlert}
        title="Orden Cancelada"
        message="Esta orden ha sido cancelada"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="orange"
        overlayStyle={styles.alertContainer}
        titleStyle={styles.alertTitleText}
        confirmButtonTextStyle={styles.alertButtonText}
        contentContainerStyle={styles.alertPopup}
        onConfirmPressed={() => {
          this.hideAlerts();
        }}
        onDismiss={() => {
          this.hideAlerts();
        }}
      />
      <AwesomeAlert
        show={this.state.showCompletedOrderAlert}
        title="Pedido Completado"
        message="El pedido ha sido completado"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="green"
        overlayStyle={styles.alertContainer}
        titleStyle={styles.alertTitleText}
        confirmButtonTextStyle={styles.alertButtonText}
        contentContainerStyle={styles.alertPopup}
        onConfirmPressed={() => {
          this.hideAlerts();
        }}
        onDismiss={() => {
          this.hideAlerts();
        }}
      />
        <TextTitle textBody="Detalles del pedido" />
        <View style={styles.orderContainer}>
          <View style={styles.clientInfo}>
            <Text style={[styles.textLabel, styles.orderSubtitle]}>
              Información del cliente
            </Text>
            <View style={styles.clientInfoRow}>
              <Text style={[styles.textLabel, styles.clientInfoLabel]}>
                Nombre:
              </Text>
              <Text style={[styles.textLabel, styles.orderValue]}>
                {orderItem.names}
              </Text>
            </View>
            <View style={styles.clientInfoRow}>
              <Text style={[styles.textLabel, styles.clientInfoLabel]}>
                Dirección:
              </Text>
              <Text style={[styles.textLabel, styles.orderValue]}>
                {orderItem.address}
              </Text>
            </View>
            <View style={styles.clientInfoRow}>
              <Text style={[styles.textLabel, styles.clientInfoLabel]}>
                Teléfono:
              </Text>
              <Text style={[styles.textLabel, styles.orderValue]}>
                {orderItem.phone}
              </Text>
            </View>
          </View>

          <View style={styles.productInfo}>
            <View style={styles.productsRow}>
              <Text style={[styles.textLabel, styles.orderSubtitle]}>
                Pedido
              </Text>

              <Text style={[styles.textLabel, styles.productsQuantityTitle]}>
                Cantidad
              </Text>
            </View>

            <FlatList
              data={orderItem.products}
              style={styles.productsList}
              keyExtractor={(item, index) =>
                item.id + item.product.id.toString()
              }
              renderItem={this.renderItem}
            />

            <Text style={[styles.textLabel, styles.textTotal]}>
              Total: ${total}
            </Text>
          </View>

          <View style={styles.options}>
            <Text style={[styles.textLabel, styles.orderSubtitle]}>
              Opciones
            </Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                onPress={() => this.cancelOrder(orderItem.id)}
                style={styles.btnCancelarPedido}
              >
                <Text style={styles.btnTextOption}>Cancelar pedido</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.contactBuyer(orderItem.phone)}
                style={styles.btnContactar}
              >
                <Text style={styles.btnTextOption}>Contactar comprador</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.confirmOrder(orderItem.id)}
                style={styles.btnConfirmar}
              >
                <Text style={styles.btnConfirmarText}>Completar pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "black",
  },
  textLabel: {
    color: "white",
    fontFamily: "Roboto",
  },
  orderContainer: {
    alignItems: "flex-start",
    backgroundColor: "#191919",
    borderRadius: 5,
    borderWidth: 1,
    padding: 12,
    flexDirection: "column",
    marginHorizontal: 21,
  },
  clientInfo: {
    alignItems: "flex-start",
  },
  textTotal: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 5,
  },
  orderSubtitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 5,
  },
  clientInfoLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 5,
  },
  orderValue: {
    fontSize: 16,
    fontWeight: "300",
  },
  clientInfoRow: {
    flexDirection: "row",
  },
  productsQuantityTitle: {
    fontSize: 20,
  },
  productInfo: {
    width: "100%",
  },
  productsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  options: { width: "100%", marginTop: 15, marginBottom: 15 },
  optionsRow: {
    flexDirection: "row",
    marginVertical: "2.5%",
  },
  btnCancelarPedido: {
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    width: "47.5%",

    marginRight: "2.5%",
  },
  btnTextOption: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  btnContactar: {
    backgroundColor: "#BC4B51",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: "2.5%",
    height: 55,
    width: "47.5%",
  },
  btnConfirmar: {
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    padding: 10,
    height: 55,
    width: "100%",
    alignItems: "center",
  },
  btnConfirmarText: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  alertTitleText: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertButtonText: {
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "Roboto",
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

export default OrderDetail;
