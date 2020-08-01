import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 992 ? 3 : 4;

function ProductCard(props) {
  const { product, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ProductDetail', {
      product: product, quantity: 1
    })
  }

  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <AsyncImage image={product.image} folder={'products'} style={styles.image}></AsyncImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenWidth / numColumns + 20, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image: {
    height: '100%',  // approximate a square
    width: '100%',
    resizeMode: 'cover'
  }
});

export default ProductCard;
