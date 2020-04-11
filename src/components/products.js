import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import ProductCard from './productCard'

const numColumns = 2;
export default class Products extends Component {

  renderItem = ({ item, index }) => {
    return (
      <ProductCard product={item} index={index}/>
    );
  };

  render() {
    const {products} = this.props;
    return (
      <View>
        <FlatList
          data={products}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  itemInput: {},
});