import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";


const numColumns = 2;
function ProductCard(props) {
  const { product, index } = props;
  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }
  return (
    <View style={styles.container} >
      <Text style={styles.itemText}>{product.id}</Text>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns - 20, // approximate a square
      },
      itemText: {
        color: '#fff',
      }, 
      itemInvisible: {
        backgroundColor: 'transparent',
      }
});
