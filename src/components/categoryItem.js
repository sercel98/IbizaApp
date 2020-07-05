import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-paper';

const categoryItem = (props) => {

  console.log(props)
  const { category } = props;
  return (
    <TouchableOpacity style={styles.container} >
      <View style={styles.category}>
        <Button style={styles.categoryButton}><Image style={{ width: 30, height: 30 }}
          source={require('../../assets/images/userIcon.png')} /></Button>
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>

  );

}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 100
  },
  categoryName: {
    color: 'white'
  },
  categoryButton: {
    backgroundColor: 'red',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 30
  }

});

export default categoryItem
