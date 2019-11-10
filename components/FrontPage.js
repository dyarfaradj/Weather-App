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

export default class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: weatherAppStore.getData(),
      refreshing: false,
      approvedTime: weatherAppStore.getApprovedTime()
    };
  }

  componentWillMount() {
    weatherAppStore.on("change", this.getData);
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("change", this.getData);
  }

  getData = () => {
    this.setState({
      fetchedData: weatherAppStore.getData(),
      approvedTime: weatherAppStore.getApprovedTime()
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
        <Header title="Home" navigation={this.props.navigation} />
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
