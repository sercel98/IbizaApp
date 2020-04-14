import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Dimensions } from 'react-native'
import CategoryItem from './categoryItem'

const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 992 ? 3 : 4;


export default class categories extends Component {

  constructor(props) {
    super(props);
  }

  renderItem = ({ item, index }) => {
    return (
      <CategoryItem category={item} index={index} />
    );
  };

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.root}>
        <FlatList
          data={categories}
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
    flex: 1,
    flexDirection: 'row'
  }
});
