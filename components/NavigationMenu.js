import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";

export default class NavigationMenu extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Header
        containerStyle={{
          backgroundColor: "black",
          justifyContent: "space-around"
        }}
        statusBarProps={{ barStyle: "light-content" }}
        leftComponent={{ icon: "settings", color: "#fff" }}
        centerComponent={{ text: "Weather", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
