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
import StatusBarBackground from "./StatusBarBackground";

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
    await fetch(
      "https://maceo.sth.kth.se/api/category/pmp3g/version/2/geotype/point/lon/14.333/lat/60.383/"
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          approvedTime: data.approvedTime,
          fetchedData: data.timeSeries.slice(0, 10)
        });
      })
      .catch(error => {
        console.error(error);
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
        <StatusBarBackground style={{ backgroundColor: "black" }} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
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
