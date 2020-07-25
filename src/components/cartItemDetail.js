import React from "react";
import { StyleSheet, Button,   TouchableOpacity, Text } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';

function CartItemDetail(props) {

  const { productItem } = props;

  const navigation = useNavigation();

  const onEdit = () => {
    navigation.navigate('ProductDetail', {
      productItem
    })
  }

  const subtotal =  productItem.product.price * productItem.quantity; 

  return (

    <TouchableOpacity style={styles.container} >  
      <AsyncImage style={styles.productDetailImage} image={productItem.product.image} folder={'products'} style={styles.image}></AsyncImage>
      <Text style={styles.productDetailText}>{productItem.product.name}</Text>
      <Text style={styles.productDetailText}>Cantidad: {productItem.quantity}</Text>
      <Text style={styles.productDetailText}>Subtotal: {subtotal}</Text>
      <Button color="#FBBD40"  title="Editar" onPress={onEdit}></Button>
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
    height: 200,
  },
  productDetailText: {
    color: '#FFF',
  },
  image: {
    height: 90,
    width: 90,
  }

  
});

export default CartItemDetail;
