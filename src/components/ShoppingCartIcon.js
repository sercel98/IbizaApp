import React from 'react'
import {connect} from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const ShoppingCartIcon = (props) => {
    return (
        <View>
            <View style={styles.productCounter}>
    <Text style = {styles.textCounter}>{props.cartItems}</Text>
            </View>
            <MaterialIcons name='shopping-cart' size={28}
                style={styles.headerIcon}></MaterialIcons>
        </View>
    )
}

const mapStateToProps= (state) =>{
    return {
        cartItems: state
    }
}

export default connect()(ShoppingCartIcon);

const styles = StyleSheet.create({
  
    productCounter: {
        position: 'absolute',
        height: 15,
        width: 15,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        zIndex: 5000, 
        marginLeft:15

    },
    textCounter: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft:'auto',
        marginRight: 'auto', 
        fontSize: 11
    },
    headerIcon: {
        color: '#fff'
    }
});

