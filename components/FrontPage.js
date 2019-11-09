import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  RefreshControl,
  Text,
  AsyncStorage
} from "react-native";
import WeatherList from "./WeatherList";
import ActionBar from "./ActionBar";
import StatusBarBackground from "./StatusBarBackground";
import NavigationMenu from "./NavigationMenu";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import { fetchData } from "../utils/APIHandler";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";

export default class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: weatherAppStore.getData(),
      refreshing: false,
      approvedTime: weatherAppStore.getLastTimeUpdated()
    };
  }

  componentWillMount() {
    weatherAppStore.on("change", this.getData);
  }

  getData = () => {
    this.setState({
      fetchedData: weatherAppStore.getData(),
      approvedTime: weatherAppStore.getLastTimeUpdated()
    });
  };

  printRefres = () => {
    this.setState({
      refreshing: true
    });
    WeatherAppActions.reloadWeatherData();
    this.setState({
      refreshing: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBarBackground style={{ backgroundColor: "black" }} /> */}
        <NavigationMenu />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.printRefres}
              />
            }
          >
            <Text>Approved time: {this.state.approvedTime}</Text>
            <WeatherList list={this.state.fetchedData} />
          </ScrollView>
          <ActionBar />
        </KeyboardAvoidingView>
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
