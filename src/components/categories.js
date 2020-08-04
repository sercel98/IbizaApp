import React, { Component } from "react";
import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native";
import CategoryItem from "./categoryItem";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

export default class categories extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item, index }) => {
    return <CategoryItem category={item} index={index} />;
  };

  render() {
    const { categories } = this.props;
    return (
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={4}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    marginTop: 10,
  },
});
