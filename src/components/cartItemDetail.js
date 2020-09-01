import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncImage from "../shared/AsyncImage";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeItem } from "../actions/cartActions";
import AwesomeAlert from "react-native-awesome-alerts";

function CartItemDetail(props) {
  const { productItem } = props;
  const [showAlert, setShowAlert] = useState(false);

  const navigation = useNavigation();

  const onEdit = () => {
    navigation.navigate("ProductDetail", {
      product: productItem.product,
      quantity: productItem.quantity,
    });
  };

  const onDelete = () => {
    setShowAlert(true);
  };

  const confirmDelete = () => {
    setShowAlert(false);
    props.removeItem(productItem.product);
  };

  const dismissDelete = () => {
    setShowAlert(false);
  };

  const formatSubTotal = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const subtotal = productItem.product.price * productItem.quantity;

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        title="Eliminar Producto"
        message="Realmente desea eliminar el producto?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        showCancelButton={true}
        confirmText="Eliminar"
        cancelText="Atrás"
        confirmButtonColor="red"
        cancelButtonColor="gray"
        overlayStyle={styles.alertContainer}
        titleStyle={styles.alertTitleText}
        confirmButtonTextStyle={styles.alertButtonText}
        cancelButtonTextStyle={styles.alertButtonText}
        contentContainerStyle={styles.alertPopup}
        onConfirmPressed={() => {
          confirmDelete();
        }}
        onCancelPressed={() => {
          dismissDelete();
        }}
        onDismiss={() => {
          dismissDelete();
        }}
      />
      <View style={{ width: "25%" }}>
        <AsyncImage
          style={styles.cartItemDetailImage}
          image={productItem.product.image}
          folder={"products"}
        ></AsyncImage>
      </View>
      <Feather
        name="x"
        size={26}
        color="white"
        onPress={() => onDelete()}
        style={styles.deleteButton}
      />
      <View style={styles.cartItemDetailTextContainer}>
        <Text style={styles.cartItemDetailTextName}>
          {productItem.product.name}
        </Text>
        <Text style={styles.productDetailTextQuantity}>
          Cantidad: {productItem.quantity}
        </Text>

        <View style={styles.subtotalContainer}>
          <View>
            <Text style={styles.productDetailTextSubtotalLabel}>Subtotal</Text>
            <Text style={styles.productDetailTextSubtotalValue}>
              ${formatSubTotal(subtotal)}
            </Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editTextButton}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeItem,
    },
    dispatch
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    marginHorizontal: 12,
  },
  cartItemDetailTextContainer: {
    width: "75%",
    paddingTop: 5,
    backgroundColor: "#191919",
    paddingLeft: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cartItemDetailTextName: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  closeButton: {
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    backgroundColor: "white",
  },
  productDetailTextQuantity: {
    color: "#FFF",
    fontFamily: "Roboto",
  },
  productDetailTextSubtotalLabel: {
    color: "#FFF",
    marginBottom: -4,
    fontFamily: "Roboto",
  },
  productDetailTextSubtotalValue: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  cartItemDetailImage: {
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  editButton: {
    backgroundColor: "#FBBD40",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    top: -15,
    left: -10,
  },
  editTextButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    padding: 10,
    borderRadius: 10,
    fontFamily: "Roboto",
  },
  subtotalContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    left: -10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 26,
    height: 26,
  },
  alertTitleText: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertButtonText: {
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "Roboto",
    lineHeight: 27,
  },
  alertContainer: {
    height: "100%",
    width: "100%",
  },
  alertPopup: {
    borderRadius: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemDetail);
