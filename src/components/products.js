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

  state = {
    searchQuery: '',
  };
  
  _onChangeSearch = query =>{
    this.setState({ searchQuery: query });
    console.log(this.state.searchQuery);
  };
  renderItem = ({ item, index }) => {
    return (
      <ProductCard product={item} index={index}/>
    );
  };

  render() {
    const {products} = this.props;
    return (
      <View>
        <Searchbar style= {styles.searchInput}
          placeholder="Search"
          onChangeText={this._onChangeSearch}
          value={this.state.searchQuery}
          placeholderTextColor="#BBB"
          iconColor='#BBB'
        />
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
  searchInput: {
    backgroundColor: '#2C2C2C', 
    width: '90%', 
    borderRadius: 20, 
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10
  }
});