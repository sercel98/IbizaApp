import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Products from "../components/products";
import { Searchbar } from "react-native-paper";
import productService from "../services/productService";
import firebaseClient from "../services/firebaseClient";
import orderService from "../services/orderService";
import {
  askPermissions,
  processOrderNotification,
} from "../shared/notifications";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, logout } from "../actions/authenticationActions";
import { newOrder, removeOrder } from "../actions/ordersActions";
import { Notifications } from "expo";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.productService = productService;
    this.state = {
      allProducts: [],
      products: [],
      loading: true,
      showNotification: false,
      change: 0,
    };
  }

  async componentDidMount() {
    const products = await productService.testingProducts();
    this.setState({
      products: products,
      allProducts: products,
      loading: false,
    });
    this.unsubscribeAuthChanges = firebaseClient.auth.onAuthStateChanged(
      this.handleAuthChange
    );
  }
  componentWillUnmount() {
    if (this.unsubscribeAuthChanges) {
      this.unsubscribeAuthChanges();
    }
    this.unsubscribeOrders();
    this.unsubscribeNotificationsListener();
  }

  handleAuthChange = (user) => {
    if (user && !user.isAnonymous) {
      //console.log("User logged");
      this.unsubscribeOrders();
      this.unsubscribeNotificationsListener();
      this.unsubscribeOrdersSnapshot = orderService
        .getOrdersCollectionQuery()
        .onSnapshot(this.handleOrdersSnapshot);
      askPermissions().then((result) =>
        this.setState({ showNotification: result })
      );
      this.notificationListenerSuscription = Notifications.addListener(
        this.handleNotifications
      );
      this.props.login();
      this.props.navigation.navigate("Orders");
    } else {
      //console.log( "User not logged",  user && user.isAnonymous ? "-> isAnonymous" : ""     );
      this.props.logout();
      this.unsubscribeOrders();
      this.unsubscribeNotificationsListener();
    }
  };
  handleNotifications = (notification) => {
    //console.log("Notifications listener -> ", notification);
    if (notification.origin === "selected") {
      const { navigation } = this.props;
      if (notification.isMultiple) {
        navigation.navigate("Orders");
      } else {
        const orderStr = JSON.stringify(notification.data);
        navigation.navigate("OrderDetail", {
          orderItem: orderStr,
        });
      }
    }
  };
  unsubscribeOrders = () => {
    if (this.unsubscribeOrdersSnapshot) {
      this.unsubscribeOrdersSnapshot();
    }
  };
  unsubscribeNotificationsListener = () => {
    if (this.notificationListenerSuscription) {
      this.notificationListenerSuscription.remove();
    }
  };
  handleOrdersSnapshot = (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const order = change.doc.data();
      order.id = change.doc.id;
      order.createdAt = order.createdAt.toDate();
      if (change.type === "added") {
        this.props.newOrder(order);
        this.state.showNotification && processOrderNotification(order);
      } else if (change.type === "removed") {
        this.props.removeOrder(order);
      } else {
        this.props.newOrder(order);
      }
      //console.log("Order " + change.type);
    });
  };

  render() {
    const { products } = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Products products={this.state.products} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
  },
  titleProducts: {
    marginTop: 15,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    fontFamily: "Roboto",
  },
  titleCategories: {
    marginTop: 15,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    //fontFamily:   Montserrat,
  },
});
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      login,
      logout,
      newOrder,
      removeOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
