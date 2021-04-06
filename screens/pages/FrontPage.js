import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import WeatherList from "../../components/Weather/WeatherList";
import ActionBar from "../../components/ActionBar";
import { _retrieveData, _storeData } from "../../utils/AsyncStorageHandler";
import * as WeatherAppActions from "../../actions/WeatherAppActions";
import weatherAppStore from "../../stores/WeatherAppStore";
import Header from "../../components/Header";
import OfflineBar from "../../components/OfflineBar";
import moment from "moment";

export default class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: weatherAppStore.getData(),
      refreshing: false,
      hasConnection: true,
      approvedTime: weatherAppStore.getApprovedTime(),
    };
  }

  componentWillMount() {
    weatherAppStore.on("change", this.getData);
  }

  componentDidMount() {
    // NetInfo.isConnected.addEventListener(
    //   "connectionChange",
    //   this.handleOfflineMode
    // );
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("change", this.getData);
    // NetInfo.isConnected.removeEventListener(
    //   "connectionChange",
    //   this.handleConnectivityChange
    // );
  }

  getData = () => {
    this.setState({
      fetchedData: weatherAppStore.getData(),
      approvedTime: weatherAppStore.getApprovedTime(),
    });
  };

  handleOfflineMode = (hasConnection) => {
    this.setState({ hasConnection });
  };

  printRefres = () => {
    this.setState({
      refreshing: true,
    });
    WeatherAppActions.reloadWeatherData();
    this.setState({
      refreshing: false,
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
            {!this.state.hasConnection && <OfflineBar />}
            <Text style={{ textAlign: "center", margin: 5 }}>
              Approved time:{" "}
              {moment(this.state.approvedTime).format("YYYY-MM-DD HH:MM")}
            </Text>
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
    width: "100%",
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
    bottom: 0,
  },
});
