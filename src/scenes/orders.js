import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderItem from "../components/orderItem";
import orderService from "../services/orderService";
import TextTitle from "./../components/textTitle";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.orderService = orderService;
    this.state = {
      orders: [],
      loading: true,
      showNotification: false,
    };
  }

  async componentDidMount() {
    const orders = await orderService.testingData();
    this.setState({
      orders: orders,
      loading: false,
    });
  }

  calculateTotal = (products) => {
    let total = 0;
    products.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  renderOrderItems = ({ item }) => {
    console.log(item);
    const total = this.calculateTotal(item.products);
    return <OrderItem orderItem={item} total={total} />;
  };

  render() {
    const { orders } = this.props;
    return (
      <View style={styles.container}>
        <TextTitle textBody="Mis Ordenes" />
        <FlatList
          style={styles.ordersList}
          data={orders}
          renderItem={this.renderOrderItems}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  ordersList: {
    marginLeft: 5,
    marginRight: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
