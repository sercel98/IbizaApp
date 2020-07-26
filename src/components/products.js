import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import ProductCard from './productCard'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 992 ? 3 : 4;

const formatData = (data, numColumns) => {


 
  return data;
};

export default class Products extends Component {

  constructor(props) {
    super(props);
  }

  renderItem = ({ item, index }) => {
    return (
      <ProductCard product={item} index={index} />
    );
  };

  render() {
    const { products } = this.props;
    return (
      <FlatList
        data={formatData(products, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20
  }
});