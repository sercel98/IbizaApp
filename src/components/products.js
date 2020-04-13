import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import ProductCard from './productCard'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 992 ? 3 : 4;

const formatData = (data, numColumns) => {

  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ id: '-1', name: "-1", empty: true });
    numberOfElementsLastRow++;
  }
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
      <View style={styles.root}>
        <FlatList
          data={formatData(products, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          keyExtractor={item => item.id.toString()}
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
  root: {
    flex: 1,
  }
});