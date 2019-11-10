import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Switch } from "react-native";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import Header from "./Header";

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
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

  onSwitchChange = value => {
    let currentSettings = this.state.settings;
    currentSettings.coordinates = value;
    WeatherAppActions.saveSettings(currentSettings);
  };

  render() {
    return (
      <View style={styles.container}>
        {console.log(this.state.settings)}
        <Header title="Settings" navigation={this.props.navigation} />
        <Text>yoo</Text>
        <Switch
          onValueChange={this.onSwitchChange}
          value={this.state.settings.coordinates}
        ></Switch>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#000000",
    width: "100%",
    height: 100,
    bottom: 0
  }
});
