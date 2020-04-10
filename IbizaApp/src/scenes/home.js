import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import firebaseClient from "../services/firebaseClient";

class Home extends React.Component {
    static navigationOptions = {title: "Home"};

    componentDidMount() {
        this.testFirestore();
    }
    testFirestore(){
        firebaseClient
            .firestoreDb
            .collection('products')
            .onSnapshot(products => {
                console.log('---------------------');
                products.forEach(product => console.log(product.data()));
            });
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>Home Component</Text>
                <Button
                    title="Go to About"
                    onPress={() => navigation.navigate('About', {companyName: 'TechDevCol'})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;