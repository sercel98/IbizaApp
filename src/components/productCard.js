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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{product.name}</Text>
      </View>
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
    marginHorizontal: 8,
    marginBottom: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: screenWidth / numColumns + 60,
    backgroundColor: "#191919",
    borderRadius: 10,
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
  titleText: {
    justifyContent: "center",
    fontSize: 13,
    fontStyle: "normal",
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  priceText: {
    flex: 1.5,
    justifyContent: "center",
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductCard;
