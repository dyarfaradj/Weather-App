import React, { Component } from "react";
import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";

export default class ActionBar extends Component {
  constructor() {
    super();
    this.state = {
      lot: "14.333",
      lat: "60.383"
    };
  }

  onInputChange = (name, value) => {
    console.log("name: ", name, " value: ", value);
    this.setState({ [name]: value });
  };
  getData() {
    console.log(this.state.lot + "  lol : " + this.state.lat);
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
          placeholder={"Enter..."}
          onChangeText={text => this.onInputChange("lot", text)}
          name="lot"
          value={this.state.lot}
          returnKeyType={"next"}
        ></CustomInputfield>
        <CustomInputfield
          label="Latitude"
          placeholder="Enter..."
          returnKeyType={"Search"}
          onChangeText={text => this.onInputChange("lat", text)}
          name="lat"
          value={this.state.lat}
        ></CustomInputfield>
        <CustomButton
          onPress={() => this.getData()}
          title="Search"
        ></CustomButton>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100
  }
});
