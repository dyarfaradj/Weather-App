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

export default class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: [],
      refreshing: false,
      approvedTime: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let data = await _retrieveData("weatherData");
    if (!data) {
      let value = await fetchData();
      data = value;
      this.setState({
        approvedTime: data.approvedTime,
        fetchedData: data.timeSeries
      });
      _storeData("weatherData", data.timeSeries);
    }
    this.setState({
      approvedTime: data.approvedTime,
      fetchedData: data
    });
  };

  printRefres = () => {
    this.setState({
      refreshing: true
    });
    this.fetchData();
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
