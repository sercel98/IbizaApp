import React from "react";
import { StyleSheet, Text, View,Dimensions, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const numColumns = 2;
function ProductCard(props) {
  const { product, index } = props;
  
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('ProductDetail', {
      product
    })
  }
  if (product.empty === true) {
    return <View style={[styles.container, styles.itemInvisible]} />;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <Image source={product.image} style={styles.image}/>
      <View>
      <Text style={styles.itemText}>{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / numColumns - 20,
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      },
      itemText: {
        color: '#fff',
      }, 
      itemInvisible: {
        backgroundColor: 'transparent',
      },
      image : {
        height: Dimensions.get('window').width / numColumns - 20, // approximate a square
        width: Dimensions.get('window').width / numColumns - 20
      }
});
