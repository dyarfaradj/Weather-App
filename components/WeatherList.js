import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import WeatherCard from "./WeatherCard";
import weatherAppStore from "../stores/WeatherAppStore";

export default class WeathList extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.list.map((item, id) => {
          return <WeatherCard key={id} data={item} />;
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
