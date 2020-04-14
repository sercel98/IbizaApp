import React from "react";
import { StyleSheet, View , Text} from "react-native";
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
    this.categoryService = categoryService
    this.state = {
      products: [],
      searchQuery: "",
      categoryApplied: null,
      categories: [],
    };
  }
  _onChangeSearch = (query) => {
    console.log(query);

    this.setState({ searchQuery: query });
    if (query) {
      this.setState({
        products: this.productService
          .testingProducts
          .filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
      });
    } else {
      this.setState({
        products: this.productService.testingProducts,
        categories: this.categoryService.testingCategories
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
            product.categoryId===(category.id)
          )
      });
    } else {
      this.setState({
        products: this.productService.testingProducts
      });
    }
  };

  componentDidMount() {
    this.setState({ products: this.productService.testingProducts, 
      categories: this.categoryService.testingCategories});
  }
  
  render() {
    const { products } = this.state;
    const { categories } = this.state;
    console.log(categories)
    return (
      <View style={styles.container}>
        <Searchbar
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={this._onChangeSearch}
          value={this.state.searchQuery}
          placeholderTextColor="#BBB"
          iconColor="#BBB"
          theme={{ colors: { text: "#BBB" } }}
        />
        <Text>Categories:</Text>
        <Categories categories={categories}></Categories>
        <Products products={products} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ccc',
  },
  searchInput: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '88%',
    borderRadius: 20,
    backgroundColor: '#2C2C2C',
  }
});

export default Home;
