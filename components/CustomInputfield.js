import React from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default CustomInputfield = props => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.textInput}
        placeholder={props.placeholder}
        errorStyle={props.errorStyle ? props.errorStyle : { color: "red" }}
        errorMessage={props.errorMessage ? props.errorMessage : ""}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput: {
    color: "green"
  }
});
