import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const numColumns = 1;

function OrderItem(props) {
  console.log(props);

  const { orderItem, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('OrderDetail', {
      orderItem
    })
  }

  return (
  <Text style={{color:'white'}}>{orderItem.id}</Text> 
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginBottom: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenWidth / numColumns - 20, // approximate a square
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
