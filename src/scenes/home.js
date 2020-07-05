import React from "react";
import { StyleSheet, View, Text } from "react-native";
import firebaseClient from "../services/firebaseClient";
import Products from "../components/products";
import Categories from "../components/categories"
import { Searchbar } from "react-native-paper";
import productService from "../services/productService";
import categoryService from "../services/categoryService"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.productService = productService;
    this.categoryService = categoryService;
    this.state = {
      products: [],
      searchQuery: "",
      categoryApplied: "",
    };
  }
  //revisar lógica
  _onChangeSearch = (query) => {
    this.setState({ searchQuery: query });
    if (query) {
      this.setState({
        products: this.productService
          .products
          .filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
      });
    } else {
      this.setState({
        products: this.productService.products,
        categories: this.categoryService.categories
      });
    }
  };

  _onChangeCategory = (category) => {
    console.log(category);

    this.setState({ categoryApplied: category });

    if (category) {
      this.setState({
        products: this.productService
          .testingProducts
          .filter(product =>
            product.categoryId === (category)
          )
      });
    } else {
      this.setState({
        products: this.productService.products
      });
    }
  };

  componentDidMount() {
    this.setState({ products: this.productService.products, categories: this.categoryService.categories });
  }

  render() {
    const { products } = this.state;
    const { categories } = this.state;
    console.log(categories)
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
        <Text style={styles.titleCategories} >Categories</Text>
        <Categories categories={categories}></Categories>
        <Text style={styles.titleProducts} >Productos</Text>
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
