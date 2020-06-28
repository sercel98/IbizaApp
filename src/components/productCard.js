import React from "react";
import { StyleSheet, Text, View,Dimensions, TouchableOpacity, Image } from "react-native";
import  AsyncImage  from "../shared/AsyncImage"
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
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenWidth / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image : {
    height: screenWidth / numColumns, // approximate a square
    width: '100%',
    resizeMode: 'cover'
  }
});
