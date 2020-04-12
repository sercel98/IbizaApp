import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

export default function About(props) {
    const {navigation, route} = props;
    const {companyName} = route.params;
    return (
        <View style={styles.container}>
            <Text>About {companyName}</Text>
            <Button
                title="Go to About... again"
                onPress={() =>
                    navigation.push('About', {
                        companyName: companyName + Math.floor(Math.random() * 100),
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')}/>
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
}
About.navigationOptions = {
    title: 'About',
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});