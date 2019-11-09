import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Switch } from "react-native";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import Header from "./Header";
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker
} from "react-native-settings-components";

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: weatherAppStore.getSettings(),
      username: "",
      allowPushNotifications: false,
      gender: ""
    };
  }
  componentWillMount() {
    weatherAppStore.on("changeSettings", this.getSettingsData);
  }

  getSettingsData = () => {
    console.log(weatherAppStore.getSettings());
    this.setState({
      settings: weatherAppStore.getSettings()
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {console.log(this.state.settings)}
        <Header title="Settings" navigation={this.props.navigation} />
        <Text>yoo</Text>
        <Switch value={this.state.settings.coordinates}></Switch>
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
