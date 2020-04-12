import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import ProductCard from './productCard'

const numColumns = 2;
export default class Products extends Component {
  constructor(props){
    super(props);
  }
  renderItem = ({ item, index }) => {
    return (
      <ProductCard product={item} index={index}/>
    );
  };

  render() {
    const {products} = this.props;
    return (
      <View style={styles.root}> 
        <FlatList
          data={products}
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
  root: {
    flex: 1
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  itemInput: {},
});