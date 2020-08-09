import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function OrderItem(props) {
  const { orderItem, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("OrderDetail", {
      orderItem: JSON.stringify(orderItem),
    });
  };

  const calculateTotal = (products) => {
    let total = 0;
    products.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <View style={styles.container}>
      <View style={styles.orderItemCard}>
        <View>
          <Text style={styles.orderText}>{orderItem.names}</Text>
          <Text style={styles.orderSubtext}>{orderItem.address}</Text>
          <Text style={styles.orderSubtext}>{orderItem.phone}</Text>
          <Text style={styles.orderText}>
            Total: ${calculateTotal(orderItem.products)}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={onPress} style={styles.viewOrderButton}>
            <Text style={styles.orderButtonText}>Ver pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  orderItemCard: {
    backgroundColor: "#191919",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
  },
  orderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  orderSubtext: {
    color: "gray",
    fontSize: 16,
  },
  viewOrderButton: {
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  orderButtonText: {
    fontSize: 18,
  },
});

export default OrderItem;
