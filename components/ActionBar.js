import React, { Component } from "react";
import { StyleSheet, Keyboard } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";
import * as WeatherAppActions from "../actions/WeatherAppActions";

export default class ActionBar extends Component {
  constructor() {
    super();
    this.state = {
      lon: "14.333",
      lat: "60.383"
    };
  }

  onInputChange = (name, value) => {
    this.setState({ [name]: value.replace(",", ".") });
  };
  getData() {
    let info = { lon: this.state.lon, lat: this.state.lat };
    WeatherAppActions.reloadWeatherData(info);
    Keyboard.dismiss();
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
          onChangeText={text => this.onInputChange("lon", text)}
          name="lon"
          value={this.state.lon}
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
