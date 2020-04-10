import React from 'react';
import {Button, StyleSheet, Text, View, StatusBar} from 'react-native';
import firebaseClient from "../services/firebaseClient";
import Products from '../components/products'
import productService from '../services/productService';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.productService = productService;
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({products: this.productService.testingProducts});
    }
    render() {
        const {products} = this.state;
        return (
            <View style={styles.container} >
                <Products products={products}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
    },
});

export default Home;