import React from 'react'
import { Image, StyleSheet, View, StatusBar } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import ShoppingCartIcon from '../components/ShoppingCartIcon';
import { useRoute } from '@react-navigation/native';

export default function Header(props) {
	const { navigation } = props;
	const route = useRoute();

	const goBack = () => navigation.goBack();
	const goLogin = () => {
		navigation.navigate("Login");
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
			<Image style={styles.headerLogo} source={require('../../assets/images/logoSmall.png')} />
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
		width: "18%",
		height: "auto",
	},
	headerIcon: {
		color: '#fff',
		paddingTop: 2
	}
});
