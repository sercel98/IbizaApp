import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import AsyncImage from "../shared/AsyncImage";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const numColumns = screenWidth < 992 ? 3 : 4;

function ProductCard(props) {
  const { product, index } = props;
  const navigation = useNavigation();
  const formatPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const onPress = () => {
    navigation.navigate("ProductDetail", {
      product: product,
      quantity: 1,
    });
  };

  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.tittleText}>{new String(product.name).toUpperCase()}</Text>
      <AsyncImage
        image={product.image}
        folder={"products"}
        style={styles.image}
      />
      <Text style={styles.priceText}>${formatPrice(product.price)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: screenWidth / numColumns + 60, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  image: {
    flex: 10,
    height: "100%", // approximate a square
    width: "100%",
    //resizeMode: "cover",
  },
  tittleText: {
    flex: 2,
    justifyContent: "center",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  priceText: {
    flex: 1.5,
    justifyContent: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#FFFFFF",
    //fontFamily: "Roboto",
  },
});

export default ProductCard;
