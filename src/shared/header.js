import React from 'react'
import { Image, StyleSheet, View, StatusBar } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Header(props) {
	const { navigation } = props;
	const route = useRoute();
	const isLogged = useSelector(state => state.auth);
	const goBack = () => navigation.goBack();
	const goLogin = () => {
		navigation.navigate("Login");
	}
	const goHome = () => {
		navigation.navigate("Home");
	}

	let leftIcon = <MaterialIcons name='person' size={30} onPress={goLogin} style={styles.headerIcon} />;
	if (route.name !== "Home") {
		leftIcon = <MaterialIcons name='keyboard-return' size={30} onPress={goBack} style={styles.headerIcon} />;
	}
	return (
		<View style={styles.header}>
			<StatusBar barStyle="light-content" />
			{leftIcon}
			{route.name !== "Login" &&
				<TouchableOpacity style={styles.imageContainer} onPress={goHome}>
					<Image style={styles.headerLogo} source={require('../../assets/images/icon.png')} />
				</TouchableOpacity>
			}
			<ShoppingCartIcon />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: "space-between",
		backgroundColor: '#000',
		paddingHorizontal: 22,
		paddingVertical: 15,
		height: 70,
	},
	headerLogo: {
		width: 50,
		height: 50,
	},
	headerIcon: {
		color: '#fff',
		paddingTop: 2
	},
	imageContainer: {
		width: '100%',
		height: '100%',
		overflow: 'visible',
		justifyContent: "center",
		alignItems: 'center'
	}
});
