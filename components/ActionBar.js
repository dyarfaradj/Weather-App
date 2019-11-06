import React, { Component } from "react";
import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";

export default class ActionBar extends Component {
  constructor() {
    super();
    this.state = {
      lot: "",
      lat: ""
    };
  }

  render() {
    return (
      <LinearGradient
        colors={["#000000", "#000000", "#434343"]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.inputContainer}
      >
        <CustomInputfield
          label="Longitude"
          placeholder="Enter..."
          onChangeText={text => this.setState({ lot })}
        ></CustomInputfield>
        <CustomInputfield
          label="Latitude"
          placeholder="Enter..."
        ></CustomInputfield>
        <CustomButton title="Search"></CustomButton>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: 100,
    bottom: 0
  }
});
