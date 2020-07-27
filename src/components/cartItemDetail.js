import React from "react";
import { StyleSheet,  View, Text } from "react-native";
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

  const subtotal = productItem.product.price * productItem.quantity;

  return (
    <View style={styles.container} >
      <View style={{ justifyContent: "flex-start" }}>
        <AsyncImage style={styles.cartItemDetailImage} image={productItem.product.image} folder={'products'} ></AsyncImage>
      </View>
      <View style={styles.cartItemDetailTextContainer}>
        <Text style={styles.cartItemDetailTextName}>{productItem.product.name}</Text>
        <Text style={styles.productDetailTextQuantity}>Cantidad: {productItem.quantity}</Text>

        <View style={styles.subtotalContainer}>
          <View>
            <Text style={styles.productDetailTextSubtotalLabel}>Subtotal</Text>
            <Text style={styles.productDetailTextSubtotalValue}>${formatSubTotal(subtotal)}</Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editTextButton}>
              EDITAR
              </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  cartItemDetailTextContainer: {
    width: '65%',
    paddingTop: 5,
    backgroundColor: '#191919',
    paddingLeft: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  cartItemDetailTextName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  closeButton: {
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: 'white'
  },
  productDetailTextQuantity: {
    color: '#FFF',
    fontFamily: 'Roboto',
  },
  productDetailTextSubtotalLabel: {
    color: '#FFF',
    marginBottom: -4,
    fontFamily: 'Roboto',
  },
  productDetailTextSubtotalValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  cartItemDetailImage: {
    height: 100,
    width: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  editButton: {
    color: "#FBBD40",
  },
  editTextButton: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#FBBD40',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Roboto',
  },
  subtotalContainer: {
    justifyContent: "space-between",
    flexDirection: 'row',
    backgroundColor: '#191919'
  }
});

export default CartItemDetail;
