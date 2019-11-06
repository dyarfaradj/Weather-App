import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default CustomInputfield = props => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.textInput}
        label={props.label}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        errorStyle={props.errorStyle ? props.errorStyle : { color: "red" }}
        errorMessage={props.errorMessage ? props.errorMessage : ""}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  textInput: {
    lineHeight: 22,
    fontSize: 17,
    backgroundColor: "#3f51b5",
    color: "#ffffff"
  }
});
