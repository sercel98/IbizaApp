import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Products from "../components/products";
import Categories from "../components/categories"
import { Searchbar } from "react-native-paper";
import productService from "../services/productService";
import categoryService from "../services/categoryService"
import firebaseClient from "../services/firebaseClient"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.productService = productService;
    this.state = {
      products: [],
      searchQuery: "",
      loading: true
    };
    this.ref = firebaseClient.firestoreDb.collection('productos');
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const productsQuery = [];
      querySnapshot.forEach(doc => {
        productsQuery.push({
          product: doc.data()
        });
        this.setState({
          products: productsQuery,
          loading: false,
        })
      });
    });
    this.render();
  }


  //revisar lógica
  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
    if (query) {
      this.setState({
        products: this.state.products
          .filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
      });
    } else {
      this.setState({
        products: this.productService.products,
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
          <Text style={styles.titleProducts} >Productos</Text>
          <ActivityIndicator />
        </View>
      )
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
          <Text style={styles.titleProducts} >Productos</Text>
          <Products products={products} />
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  searchInput: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
  },
  titleProducts: {
    marginTop: 15,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: 'white'
    //fontFamily:   Montserrat,
  },
  titleCategories: {
    marginTop: 15,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: 'white'
    //fontFamily:   Montserrat,
  }
});

export default Home;
