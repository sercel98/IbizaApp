import React, { Component } from 'react'

export default class Product extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <View
            style={styles.item}
        >
            <Text style={styles.itemText}>{props.item.key}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: Dimensions.get('window').width / numColumns - 20, // approximate a square
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
  });