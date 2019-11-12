import React, { Component } from "react";
import { StyleSheet, View, Text, Switch, Slider } from "react-native";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import Header from "./Header";

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: weatherAppStore.getSettings(),
      error1: ""
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

  onSwitchChange = value => {
    let currentSettings = this.state.settings;
    currentSettings.coordinates = value;
    WeatherAppActions.saveSettings(currentSettings);
  };

  onSliderChange = value => {
    let currentSettings = this.state.settings;
    currentSettings.updateInterval = value.toString();
    WeatherAppActions.saveSettings(currentSettings);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Settings" navigation={this.props.navigation} />
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsLabel}>Use coordinates: </Text>
          <Switch
            style={styles.settingsComponent}
            onValueChange={this.onSwitchChange}
            value={this.state.settings.coordinates}
          ></Switch>
        </View>
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsLabel}>Update Time interval: </Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={(styles.settingsComponent, { width: 200, height: 10 })}
              value={this.state.settings.updateInterval}
              onSlidingComplete={this.onSliderChange}
              step={1}
              maximumValue={10}
              minimumValue={1}
              minimumTrackTintColor="#00BFFF"
              thumbTintColor="#grey"
            />
            <Text style={styles.sliderText}>
              {this.state.settings.updateInterval}minutes
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsLabel: {
    marginLeft: 10
  },
  settingsComponent: {
    marginRight: 10,
    color: "white"
  },
  settingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 45,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  sliderText: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginTop: 15
  },
  sliderContainer: {
    top: 5,
    flexDirection: "column"
  }
});
