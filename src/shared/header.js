import React from 'react'
import { StyleSheet,  Text, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function Header(){
    return (
        <View style= {styles.header} >
            <MaterialIcons name= 'menu' size={28} onPress= {openFilter} style={styles.headerIcon}></MaterialIcons>
            <Image style={styles.headerLogo} source={require('../../assets/images/homeLogo.png')} />
            <MaterialIcons name= 'shopping-cart' size={28} onPress= {openCartDetail} style={styles.headerIcon}></MaterialIcons>
        </View>
    );
}

const openFilter = () => {
    console.log("hey");
};

const openCartDetail = () => {
    console.log("hey again");
};

const styles = StyleSheet.create({
    header: {
        width: '100%', 
        height: '100%', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: '#000'

    }, 
    headerLogo: {
        width: 112, 
        height: 35, 
    }, 
    headerIcon: {
        color: '#fff'
    }

})