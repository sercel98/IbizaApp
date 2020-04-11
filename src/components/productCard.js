import React from "react";
import { StyleSheet, Text, View,Dimensions } from "react-native";


const numColumns = 2;
function ProductCard(props) {
  const { product, index } = props;
  const url = product.image;
  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }
  return (
    <View style={styles.container} >
      <Image style={styles.itemImage} source={require(`../../assets/images/${product.image}`)}></Image>
      <Text style={styles.itemText}>{product.name}</Text>
    </View>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 1,
        height: Dimensions.get('window').width / numColumns - 20, // approximate a square
        width: Dimensions.get('window').width / numColumns - 20
      },
      itemText: {
        color: '#fff',
      }, 
      itemInvisible: {
        backgroundColor: 'transparent',
      }
});
