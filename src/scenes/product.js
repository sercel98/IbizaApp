import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class ProductDetail extends Component {
  render() {
    const { navigation, route } = this.props;
    const { product } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.itemText}> {product.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "#fff",
  },
});
