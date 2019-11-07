import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

export default WeathCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data.validTime}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderBottomColor: "black"
  },
  title: {
    color: "black"
  }
});
