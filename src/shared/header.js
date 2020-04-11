import React from 'react'
import {Image, StyleSheet, View, StatusBar} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native';
export default function Header(props) {
    const {navigation} = props;
    const route = useRoute();

    const goBack = () => navigation.goBack();
    const openFilter = () => {
        console.log("hey");
    };
    
    const openCartDetail = () => {
        console.log("hey again");
    };

    let leftIcon = <MaterialIcons name='filter-list' size={28} onPress={openFilter} style={styles.headerIcon}></MaterialIcons>;
    if (route.name == "ProductDetail") {
        leftIcon = <MaterialIcons name='keyboard-return' size={28} onPress={goBack} style={styles.headerIcon}></MaterialIcons>;
    }
    return (
        <View style={styles.header}>
            <StatusBar  barStyle="light-content" />
            {leftIcon}
            <Image style={styles.headerLogo} source={require('../../assets/images/homeLogo.png')}/>
            <MaterialIcons name='shopping-cart' size={28} onPress={openCartDetail}
                           style={styles.headerIcon}></MaterialIcons>
        </View>
    );
}

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
        color: '#fff',
    }
});