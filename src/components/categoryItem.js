import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import AsyncImage from "../shared/AsyncImage";
import Home from "../scenes/home";

const categoryItem = (props) => {

  const { category } = props;

  return (
    <View>
      <TouchableOpacity style={styles.container} >
        <View style={styles.category}>
          <Button style={styles.categoryButton}>
            <AsyncImage image={category.image} folder={'categories'} style={styles.image}></AsyncImage>
          </Button>
        </View>
      </TouchableOpacity>
      <Text style={styles.categoryName}> {category.name} </Text>   
    </View>
  );

}
const styles = StyleSheet.create({
  container: { 
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryName: {
    color: 'white',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginTop: 10,
    fontSize:16

  },
  categoryButton: {
    backgroundColor: 'red',
    borderWidth: 1,
    minWidth: 50,
    width: 50,
    height: 50,
    borderRadius: 100,
    paddingVertical:5,
    marginHorizontal: 'auto',
    
  },
  image: {
    width: 20,
    height: 20,
    overflow:'visible'

  }

});

export default categoryItem
