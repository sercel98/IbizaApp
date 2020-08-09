import React, { Component } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import ProductCard from "./productCard";

const screenWidth = Dimensions.get("window").width;
const numColumns = screenWidth < 992 ? 2 : 3;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ id: "-1", name: "-1", empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
    };
  }

  renderItem = ({ item, index }) => {
    return <ProductCard product={item} index={index} />;
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
        keyExtractor={(item, index) => item.id}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
});
