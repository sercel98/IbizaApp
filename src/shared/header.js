import React from 'react'
import {Image, StyleSheet, View, StatusBar} from 'react-native'
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'

export default function Header(props) {
    const {navigation, route} = props;
    return (
        <View style={styles.header}>
            <StatusBar  barStyle="light-content" />
            <MaterialCommunityIcons name='filter' size={28} onPress={openFilter} style={styles.headerIcon}></MaterialCommunityIcons>
            <Image style={styles.headerLogo} source={require('../../assets/images/homeLogo.png')}/>
            <MaterialIcons name='shopping-cart' size={28} onPress={openCartDetail}
                           style={styles.headerIcon}></MaterialIcons>
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
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#000',
        padding: 10,
    },
    headerLogo: {
        width: 112,
        height: 35,
    },
    headerIcon: {
        color: '#fff'
    }
});