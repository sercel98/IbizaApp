import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function OrderItem(props) {
  const { orderItem, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("OrderDetail", {
      orderItem,
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
        <View style={styles.textColumn}>
          <Text style={styles.orderText}>{orderItem.names}</Text>
          <Text style={styles.orderSubtext}>{orderItem.address}</Text>
          <Text style={styles.orderSubtext}>{orderItem.phone}</Text>
          <Text style={styles.orderText}>
            Total: ${calculateTotal(orderItem.products)}
          </Text>
        </View>
        <View style={styles.buttonColumn}>
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
    marginHorizontal: 6,
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
  textColumn: { width: "70%" },
  buttonColumn: { width: "30%" },
  viewOrderButton: {
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default OrderItem;
