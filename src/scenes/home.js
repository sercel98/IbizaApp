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
    console.log(query);
    
    this.setState({ searchQuery: query });
    if(query) {
        this.setState({
            products: this.productService
            .testingProducts
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
          placeholder="Buscar"
          onChangeText={this._onChangeSearch}
          value={this.state.searchQuery}
          placeholderTextColor="#BBB"
          iconColor="#BBB"
          theme={{ colors: { text: "#BBB" } }}
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
    backgroundColor: '#000',
  },
  searchInput: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%', 
    borderRadius: 8, 
    backgroundColor: '#2C2C2C',
  }
});

export default Home;
