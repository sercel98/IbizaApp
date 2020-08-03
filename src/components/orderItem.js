import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";

function OrderItem(props) {
  const { orderItem, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('OrderDetail', {
      orderItem
    })
  }

  const calculateTotal = (products) => {
    let total = 0;
    products.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  
  const calculateMinutes = (orderDate) =>{

    let now  = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    
    orderDate = moment(orderDate.toDate()).format("DD/MM/YYYY HH:mm:ss");

    console.log(orderDate);
    console.log(now);

    let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(orderDate,"DD/MM/YYYY HH:mm:ss"));
    console.log((ms/1000)/60)


    return (ms/1000)/60; 
  };



  return (
    <View style={styles.container}>
      <View style={styles.orderItemCard}>
        <View>
          <Text style={styles.orderText}>{orderItem.names}</Text>
          <Text style={styles.orderSubtext}>{orderItem.address}</Text>
          <Text style={styles.orderSubtext}>{orderItem.phone}</Text>
          <Text style={styles.orderText}>Total: ${calculateTotal(orderItem.products)}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={onPress} style={styles.viewOrderButton}>
            <Text style={styles.orderButtonText}>
              Ver pedido
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <AntDesign name="clockcircleo" size={22} color="gray" />
        <Text style={styles.timeText}>
          Hace {calculateMinutes(orderItem.createdAt)} minutos
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderItemCard: {
    backgroundColor: '#191919',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5, borderWidth: 1

  },
  orderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  orderSubtext: {
    color: 'gray',
    fontSize: 16
  },
  viewOrderButton: {
    fontSize: 18,
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  orderButtonText: {
    fontSize: 18
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    alignContent: "center",
    marginLeft: 10
  },
  timeText: {
    color: 'gray',
    fontWeight: '300',
    fontSize: 14,
    marginTop: 5
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

export default OrderItem;
