import React, { Component }  from "react";
import { StyleSheet,  View } from "react-native";
import AsyncImage from "../shared/AsyncImage"
import { useNavigation } from '@react-navigation/native';

export default class CartItemDetail extends Component {

  constructor(props) {
		super(props);
    product = props;
    navegation = useNavigation();
	}

  onEdit = () => {
    navigation.navigate('ProductDetail', {
      product
    })
  }

	render() {

    const { product } = this.props; 
    <View style={styles.container} >
      <AsyncImage image={product.image} folder={'products'} style={styles.image}></AsyncImage>
        <Text></Text>
    </View>

  }

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200 , // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  image: {
    height: 50 , // approximate a square
    width: '100%',
    resizeMode: 'cover'
  }
});

