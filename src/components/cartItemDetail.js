import React from "react";
import { StyleSheet, Button,   View, Text } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

function CartItemDetail(props) {

  const { productItem } = props;

  const navigation = useNavigation();

  const onEdit = () => {
    navigation.navigate('ProductDetail', {
      productItem
    })
  }

  const onDelete = () => {
    navigation.navigate('ProductDetail', {
      productItem
    })
  }


  const subtotal =  productItem.product.price * productItem.quantity; 

  return (
    //flexDirection: row
    //flex: 1
    // Button 
      //zIndex: 
      //round: width/2
      //width height 
    <View style={styles.container} >  
      <View>
      <Ionicons style={styles.close} name="ios-close-circle" size={25} color='red'/>
      </View>
      <AsyncImage style={styles.productDetailImage} image={productItem.product.image} folder={'products'} style={styles.image}></AsyncImage>
      <View style={{ width:140, paddingTop:10, paddingLeft: 10}}>
        <Text style={styles.productDetailText}>{productItem.product.name}</Text>
        <Text style={styles.productDetailText}>Cantidad: {productItem.quantity}</Text>
        <Text style={styles.productDetailText}>Subtotal:</Text>
        <Text style={styles.productDetailText}>{subtotal}</Text>
      </View>
      <View style={{justifyContent: "flex-end"}}>
        <Button color="#FBBD40"  title="Editar" onPress={onEdit}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#2f2f2f'
  },
  closeButton:{
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor:'white' 
  }, 
  productDetailText: {
    color: '#DDDddd',
  },
  image: {
    height: 90,
    width: 90,
  }

  
});

export default CartItemDetail;
