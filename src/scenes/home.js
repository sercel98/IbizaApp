import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
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
import { newOrder } from "../actions/ordersActions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.productService = productService;
    this.state = {
      allProducts: [],
      products: [],
      searchQuery: "",
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
    this.unsuscribeOrders();
  }
  handleAuthChange = (user) => {
    if (user && !user.isAnonymous) {
      console.log("User logged");
      this.unsuscribeOrders();
      this.unsubscribeOrdersSnapshot = orderService
        .getOrdersCollectionQuery()
        .onSnapshot(this.handleOrdersSnapshot);
      askPermissions().then((result) =>
        this.setState({ showNotification: result })
      );
      this.props.login();
      this.props.navigation.navigate("Orders");
    } else {
      console.log(
        "User not logged",
        user && user.isAnonymous ? "-> isAnonymous" : ""
      );
      this.props.logout();
      this.unsuscribeOrders();
    }
  };
  unsuscribeOrders = () => {
    if (this.unsubscribeOrdersSnapshot) {
      this.unsubscribeOrdersSnapshot();
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
      }
      console.log("Order " + change.type);
    });
  };

  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
    if (query) {
      this.setState({
        products: this.state.allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        ),
      });
      this.setState({ change: this.state });
    } else {
      this.setState({
        products: this.state.allProducts,
      });
    }
  };

  render() {
    const { products } = this.state;
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Searchbar
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={this._onChangeSearch}
            value={this.state.searchQuery}
            placeholderTextColor="#BBB"
            iconColor="#BBB"
            theme={{ colors: { text: "#BBB" } }}
          />
          <Text style={styles.titleProducts}>Productos</Text>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Searchbar
            style={styles.searchInput}
            placeholder="Buscar"
            onChangeText={this._onChangeSearch}
            value={this.state.searchQuery}
            placeholderTextColor="#BBB"
            iconColor="#BBB"
            theme={{ colors: { text: "#BBB" } }}
          />
          <Text style={styles.titleProducts}>Productos</Text>
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
  searchInput: {
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#2C2C2C",
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
