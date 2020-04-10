import React from 'react';
import {Button, StyleSheet, Text, View, StatusBar} from 'react-native';
import firebaseClient from "../services/firebaseClient";
import Header from '../shared/header';
import Products from '../components/products'

class Home extends React.Component {

    /*static navigationOptions = {
        headerTitle: () => <Header/>,
        headerStyle: {
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center'
        },
  
    };*/

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
            <View>
                <StatusBar  barStyle="light-content" />
                <Text>Home Component</Text>

                <Button
                    title="Go to About"
                    onPress={() => navigation.navigate('About', {companyName: 'TechDevCol'})}
                />
                <Products></Products>
                <Text>asd</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;