import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Products from "../components/products";
import { Searchbar } from "react-native-paper";
import productService from "../services/productService";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.productService = productService;
    this.state = {
      allProducts: [],
      products: [],
      searchQuery: "",
      loading: true
    };
  }

  async componentDidMount() {
    const products = await productService.testingProducts();
    this.setState({
      products: products,
      allProducts: products,
      loading: false
    })
  }

  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
    if (query) {
      this.setState({
        products: this.state.allProducts
          .filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
      });
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
    color: 'white',
    fontFamily: 'Roboto',
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
