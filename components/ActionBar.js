import React, { Component } from "react";
import { StyleSheet, Keyboard, NetInfo, Alert } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";

export default class ActionBar extends Component {
  constructor() {
    super();
    this.state = {
      settings: weatherAppStore.getSettings()
    };
  }

  componentWillMount() {
    weatherAppStore.on("changeSettings", this.getSettingsData);
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("changeSettings", this.getSettingsData);
  }

  getSettingsData = () => {
    this.setState({
      settings: weatherAppStore.getSettings()
    });
  };

  onInputChange = (name, value) => {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [name]: value.replace(",", ".")
      }
    }));
  };

  getData() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        let info = {
          lon: this.state.settings.lon,
          lat: this.state.settings.lat
        };
        let currentSettings = this.state.settings;
        WeatherAppActions.reloadWeatherData(info);
        WeatherAppActions.saveSettings(currentSettings);
        Keyboard.dismiss();
      } else {
        Alert.alert(
          "Internet Connection",
          "Please check your connection",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }

  render() {
    return (
      <LinearGradient
        colors={["#000000", "#000000", "#434343"]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.inputContainer}
      >
        {this.state.settings.coordinates ? (
          <>
            <CustomInputfield
              label="Longitude"
              placeholder={"Enter..."}
              keyboardType="numeric"
              onChangeText={text => this.onInputChange("lon", text)}
              name="lon"
              value={this.state.settings.lon}
              returnKeyType={"next"}
            ></CustomInputfield>
            <CustomInputfield
              label="Latitude"
              placeholder="Enter..."
              keyboardType="numeric"
              returnKeyType={"Search"}
              onChangeText={text => this.onInputChange("lat", text)}
              name="lat"
              value={this.state.settings.lat}
            ></CustomInputfield>
          </>
        ) : (
          <CustomInputfield
            label="Location"
            placeholder="Enter a location..."
            keyboardType="default"
            returnKeyType={"Search"}
            onChangeText={text => this.onInputChange("location", text)}
            name="location"
            value={this.state.settings.location}
          ></CustomInputfield>
        )}

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
