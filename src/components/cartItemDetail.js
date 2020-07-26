import React from "react";
import { StyleSheet, Button,   View, Text } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const formatSubTotal = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
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
      <View style={{justifyContent:"flex-start"}}>
        <AsyncImage style={styles.cartItemDetailImage} image={productItem.product.image} folder={'products'} ></AsyncImage>
      </View>
      <View style={styles.cartItemDetailTextContainer }>
        <Text style={styles.cartItemDetailTextName}>{productItem.product.name}</Text>
        <Text style={styles.productDetailTextQuantity}>Cantidad: {productItem.quantity}</Text>
        <Text style={styles.productDetailTextSubtotal}>Subtotal:${formatSubTotal(subtotal)}</Text>
      </View>
      <View style={{justifyContent: "flex-end"}}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editTextButton}>
            EDITAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#191919',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: 'center',
    marginHorizontal: 20

  },
  cartItemDetailTextContainer: {
    width:140,
    paddingTop:10,
    paddingLeft: 10
  }, 
  cartItemDetailTextName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
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
  productDetailTextQuantity: {
    color: '#FFF',
  }, 
  productDetailTextSubtotal: {
    color: '#FFF',
  },
  cartItemDetailImage: {
    height: 100,
    width: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10 
  },
  editButton: {
    color:"#FBBD40",
    
  },
  editTextButton: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
     backgroundColor: '#FBBD40',
     padding: 10,
     borderRadius: 10

  }


  
});

export default CartItemDetail;
