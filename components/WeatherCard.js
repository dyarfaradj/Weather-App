import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Image } from "react-native-elements";

export default WeathCard = props => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/PartCloudRainThunderDay.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.title}>{props.data.validTime}</Text>
      <Text style={styles.title}>{props.data.parameters[1].values[0]}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderBottomColor: "black"
  },
  title: {
    color: "black"
  }
});
