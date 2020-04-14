import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
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
      product
    })
  }

  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <AsyncImage image={product.image} style={styles.image}></AsyncImage>
      <View style={styles.product}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginBottom: 20,
    flex: 1 / numColumns,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  product: {
    padding: 3,
    flex: 1,
    justifyContent: 'center',
  },
  productPrice: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  productName: {
    fontSize: 9,
    textAlign: 'center',
    color: '#CCC',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image: {
    height: screenWidth / numColumns, // approximate a square
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }
});

export default ProductCard;
