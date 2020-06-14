import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import firebaseClient from "../services/firebaseClient";

class Login extends React.Component {

    state = { email: '', password: '', errorMessage: null };

    constructor(props) {
        super(props);
    }

    handleLogin = () => {
        console.log(this.state.email); 
        console.log(this.state.password); 

        firebaseClient.auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            //console.log(error.code);
            state.errorMessage = "error fatal";
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Iniciar sesión</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>} 
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Contraseña"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Iniciar" onPress={this.handleLogin} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
      }
   
});
export default Login;
