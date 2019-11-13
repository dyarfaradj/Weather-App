import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default CustomButton = props => {
  return (
    <View style={styles.container}>
      <Button onPress={props.onPress} title={props.title}></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
