import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  RefreshControl,
  Text
} from "react-native";
import WeatherList from "./WeatherList";
import ActionBar from "./ActionBar";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import Header from "./Header";

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBarBackground style={{ backgroundColor: "black" }} /> */}
        <Header title="Settings" navigation={this.props.navigation} />
        <Text>yoo</Text>
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
