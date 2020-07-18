import React from "react";
import { StyleSheet,  View, TouchableOpacity } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';

function CartItemDetail(props) {

  const { product } = props;
  const navigation = useNavigation();

  const onEdit = () => {
    navigation.navigate('ProductDetail', {
      product
    })
  }

  const onDelete = () => {
    
  }

  return (
    <TouchableOpacity style={styles.container} >
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
    height: 200 , // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image: {
    height: 50 , // approximate a square
    width: '100%',
    resizeMode: 'cover'
  }
});

export default CartItemDetail;
