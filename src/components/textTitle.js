import React from "react";
import { Text, StyleSheet } from "react-native";

const TextTitle = ({ textBody }) => {
  return <Text style={styles.textTitle}>{textBody}</Text>;
};

const styles = StyleSheet.create({
  textTitle: {
    marginTop: 16,
    marginLeft: 21,
    fontSize: 22,
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },
});

export default TextTitle;
