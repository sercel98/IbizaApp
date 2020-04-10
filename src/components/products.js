import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import ProductCard from './productCard'

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' },
];



const formatData = (data, numColumns) => {

  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

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