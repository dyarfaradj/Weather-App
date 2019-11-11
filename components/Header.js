import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  AppState
} from "react-native";
import { Header, Icon } from "react-native-elements";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";

export default class NavigationMenu extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    appState: AppState.currentState,
    settings: weatherAppStore.getSettings(),
    lastTimeFetched: weatherAppStore.getLastTimeFetched()
  };
  componentWillMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    weatherAppStore.on("changeLastTimeFetched", this.getFetchedTime);
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    weatherAppStore.removeListener(
      "changeLastTimeFetched",
      this.getFetchedTime
    );
  }

  getFetchedTime = () => {
    this.setState({
      lastTimeFetched: weatherAppStore.getLastTimeFetched()
    });
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      let inactiveTime = this.state.settings.updateInterval * 60 * 1000;
      let totalTime = Date.now() - new Date(this.state.lastTimeFetched);
      if (totalTime > inactiveTime) {
        WeatherAppActions.reloadWeatherData();
      }
    }
    this.setState({ appState: nextAppState });
  };

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
