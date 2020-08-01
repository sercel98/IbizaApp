import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import firebaseClient from "../services/firebaseClient";
import Loader from '../shared/loader'

class Login extends React.Component {

	state = {
		email: '',
		password: '',
		errorMessage: null,
		isLoading: false
	};

	constructor(props) {
		super(props);
	}

	handleLogin = async () => {
		const { navigation } = this.props;
		try {
			this.setState({ isLoading: true });
			const authCredentials = await firebaseClient.auth.signInWithEmailAndPassword(this.state.email, this.state.password);
			navigation.navigate('Orders');
		} catch (e) {
			alert("Correo/Contraseña incorrecta");
			console.log(e);
		}
		this.setState({ isLoading: false });
	}

	render() {
		const { navigation } = this.props;
		const { isLoading } = this.state
		return (
			<View style={styles.container}>
				<Loader loading={isLoading} />
				{this.state.errorMessage &&
					<Text style={styles.textError}>
						{this.state.errorMessage}
					</Text>
				}
				<Image
					source={require('../../assets/images/splashLogo.png')}
					style={styles.logoImage}
				/>
				<Text style={styles.textInputTitle}>Usuario:</Text>
				<View style={styles.SectionStyle}>
					<Image
						source={require('../../assets/images/userIcon.png')}
						style={styles.ImageStyle}
					/>
					<TextInput
						style={{ flex: 1 }}
						autoCapitalize="none"
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
					/>
				</View>
				<Text style={styles.textInputTitle}>Contraseña:</Text>
				<View style={styles.SectionStyle}>
					<Image
						source={require('../../assets/images/lockIcon.png')}
						style={styles.ImageStyle}
					/>
					<TextInput
						secureTextEntry
						style={{ flex: 1 }}
						autoCapitalize="none"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
					/>
				</View>
				<TouchableOpacity style={styles.button} onPress={this.handleLogin}>
					<Text style={styles.loginButtonText}>Iniciar Sesion</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
	},
	textInput: {
		height: 40,
		width: '75%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8,
		borderRadius: 5,
		backgroundColor: '#FFFFFF',
	},
	textInputTitle: {
		width: 340,
		textAlign: 'left',
		fontSize: 20,
		lineHeight: 20,
		fontStyle: 'normal',
		fontWeight: 'normal',
		color: '#FFFFFF',
		fontFamily: 'Roboto',
	},
	textError: {
		fontFamily: 'Roboto',
		color: 'red'
	},
	SectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderWidth: 0.5,
		borderColor: '#000',
		height: 50,
		width: 340,
		borderRadius: 5,
		margin: 10,
		bottom: 10,
	},

	ImageStyle: {
		padding: 10,
		margin: 5,
		height: 25,
		width: 25,
		resizeMode: 'stretch',
		alignItems: 'center',
	},

	button: {
		marginTop: 50,
		width: 340,
		height: 60,
		backgroundColor: "#E93A3B",
		color: "#000",
		borderRadius: 10,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	loginButtonText: {
		fontSize: 22,
		fontWeight: "700",
		textAlign: "center",
		alignItems: "center",
		fontFamily: 'Roboto',
		color: "#fff",
	},
	logoImage: {
		bottom: 30,
		width: "60%",
		height: "40%",
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
export default Login;
