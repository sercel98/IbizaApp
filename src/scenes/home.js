import React from "react";
import { StyleSheet, View } from "react-native";
import firebaseClient from "../services/firebaseClient";
import Products from "../components/products";
import { Searchbar } from "react-native-paper";
import productService from "../services/productService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.productService = productService;
    this.state = {
      products: [],
      searchQuery: "",
    };
  }
  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
    if(query) {
        this.setState({
            products: this.state
            .products
            .filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase())
                )
        });
    } else {
        this.setState({
            products: this.productService.testingProducts
        });
    }
  };
  componentDidMount() {
    this.setState({ products: this.productService.testingProducts });
  }
  render() {
    const { products } = this.state;
    return (
      <View style={styles.container}>
        <Searchbar
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={this._onChangeSearch}
          value={this.state.searchQuery}
          placeholderTextColor="#BBB"
          iconColor="#BBB"
        />
        <Products products={products} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#ccc",
  },
  searchInput: {
    backgroundColor: '#2C2C2C', 
    width: '90%', 
    borderRadius: 20, 
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10
  }
});

export default Home;
