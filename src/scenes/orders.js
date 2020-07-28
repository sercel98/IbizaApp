import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderItem from "../components/orderItem";
import { useNavigation } from "@react-navigation/native";
import orderService from "../services/orderService";

class Orders extends React.Component {

  constructor(props) {
    super(props);
    this.orderService = orderService;
    this.state = {
      orders: [],
      loading: true,
      showNotification: false
    };
  }

  async componentDidMount() {
    const orders = await orderService.testingData();
    this.setState({
      orders: orders,
      loading: false
    })
  }

  renderOrderItems = ({ item }) => {
    return (
      <OrderItem orderItem={item} />
    );
  };

  render() {
    const { orders } = this.state;
    console.log(orders);
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.cartDetailTitle}>Mis Ordenes</Text>
          <FlatList
            style={styles.cartList}
            data={orders}
            renderItem={this.renderOrderItems}
            keyExtractor={(item, index) => index.toString()} />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  cartList: {
    marginLeft: 15,
  },
  cartDetailTitle: {
    marginTop: 16,
    marginLeft: 21,
    fontSize: 22,
    fontWeight: "700",
    color: 'white',
    fontFamily: 'Roboto',
  },
  cartTotalInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  cartTotalContainer: {
    flexDirection: 'row',
    backgroundColor: '#191919',
    height: 100,
    padding: 15,
  },
  cartTotalText: {
    fontSize: 22,
    fontWeight: "400",
    color: '#EEE',
    fontFamily: 'Roboto',

  },
  cartTotalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: 'white',
    fontFamily: 'Roboto',
  },
  userFormButton: {
    backgroundColor: "#FBBD40",
    color: "#000",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10

  },
  userFormButtonText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    alignItems: "center",
    fontFamily: 'Roboto',
  }
});

export default Orders;
