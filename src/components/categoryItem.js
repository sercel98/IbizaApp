import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const categoryItem = (props) => {
    
    const { category, index } = props;
    const navigation = useNavigation();
    const onPress = () => {
       /*

        navigation.navigate('ProductDetail', {
            product
        })
        */
    }

    return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <View style={styles.category}>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
   
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  root: {
    flex: 1,
  }
});

export default categoryItem