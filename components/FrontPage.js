import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView
} from "react-native";
import WeathList from "./WeatherList";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import StatusBarBackground from "./StatusBarBackground";
import { LinearGradient } from "expo-linear-gradient";

export default class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      fetchedData: []
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
          fetchedData: data.timeSeries.slice(0, 10)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBarBackground style={{ backgroundColor: "black" }} />
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView>
            <WeathList list={this.state.fetchedData} />
          </ScrollView>

          <LinearGradient
            colors={["#000000", "#000000", "#434343"]}
            start={[0, 1]}
            end={[0, 0]}
            style={styles.inputContainer}
          >
            <CustomInputfield placeholder="lot"></CustomInputfield>
            <CustomInputfield placeholder="lot"></CustomInputfield>
            <CustomButton title="Search"></CustomButton>
          </LinearGradient>
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
