import React, { Component } from "react";
import NavigationMenu from "./components/NavigationMenu";
import { AppState } from "react-native";
import * as WeatherAppActions from "./actions/WeatherAppActions";
import weatherAppStore from "./stores/WeatherAppStore";

export default class App extends Component {
  state = {
    appState: AppState.currentState,
    settings: weatherAppStore.getSettings()
  };
  componentWillMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    weatherAppStore.on("changeSettings", this.getSettingsData);
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    weatherAppStore.removeListener("changeSettings", this.getSettingsData);
  }

  getSettingsData = () => {
    this.setState({
      settings: weatherAppStore.getSettings()
    });
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      let inactiveTime = this.state.settings.updateInterval * 60 * 1000;
      let totalTime =
        Date.now() - new Date(this.state.settings.lastTimeFetched);
      if (totalTime > inactiveTime) {
        WeatherAppActions.reloadWeatherData();
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return <NavigationMenu />;
  }
}
