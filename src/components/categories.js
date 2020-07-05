import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Dimensions, Text } from 'react-native'
import CategoryItem from './categoryItem'
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth < 992 ? 3 : 4;



export default class categories extends Component {

	constructor(props) {
		super(props);

	}


	renderItem = ({ item, index }) => {
		return (
			<CategoryItem category={item} index={index} />
		);
	};

	render() {
		const { categories } = this.props;
		const OFFSET = 500

		return (
			<View style={styles.categoriesContainer}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ marginRight: OFFSET }}>
					<View>
						<FlatList
							data={categories}
							style={styles.container}
							renderItem={this.renderItem}
							numColumns={numColumns}
							keyExtractor={item => item.id.toString()}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	categoriesContainer: {
		flexDirection: 'row'
	},
	container: {

	}

});
