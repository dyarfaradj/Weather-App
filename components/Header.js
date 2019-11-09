import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import { Header, Icon } from "react-native-elements";

export default class NavigationMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header
        containerStyle={{
          backgroundColor: "black",
          justifyContent: "space-around"
        }}
        statusBarProps={{ barStyle: "light-content" }}
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#fff"
            onPress={() => this.props.navigation.openDrawer()}
          />
        }
        centerComponent={{ text: this.props.title, style: { color: "#fff" } }}
        // rightComponent={{ icon: "home", color: "#fff" }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
