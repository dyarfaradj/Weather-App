import React, { Component } from "react";
import { StyleSheet, Keyboard, NetInfo, Alert, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomInputfield from "./CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import {
  Autocomplete,
  withKeyboardAwareScrollView,
  Dropdown,
  DropdownItem
} from "react-native-dropdown-autocomplete";

export default class ActionBar extends Component {
  constructor() {
    super();
    this.state = {
      settings: weatherAppStore.getSettings(),
      error: ""
    };
  }

  componentWillMount() {
    weatherAppStore.on("changeSettings", this.getSettingsData);
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("changeSettings", this.getSettingsData);
  }

  getSettingsData = () => {
    this.setState({
      settings: weatherAppStore.getSettings()
    });
  };

  onInputChange = (name, value) => {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [name]: value.replace(",", ".")
      }
    }));
  };

  getData() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        let info = {
          lon: this.state.settings.lon,
          lat: this.state.settings.lat
        };
        let currentSettings = this.state.settings;
        let test = WeatherAppActions.reloadWeatherData(info);
        console.log("HAHAH: ", test);
        if (!test) {
          this.setState({ error: "Fel" });
        } else {
          this.setState({ error: "" });
          WeatherAppActions.saveSettings(currentSettings);
        }

        Keyboard.dismiss();
      } else {
        Alert.alert(
          "Internet Connection",
          "Please check your connection",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }
  handleSelectItem(item, index) {
    console.log(item);
    console.log(item.place, "lat: ", item.lat, " lon: ", item.lon);
    this.setState({
      settings: {
        lon: item.lon.toFixed(3),
        lat: item.lat.toFixed(3),
        location: item.place
      }
    });
    this.getData();
  }

  render() {
    const autocompletes = [...Array(10).keys()];
    const apiUrl = "http://smhi.se/wpt-a/backend_solr/autocomplete/search/g";
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;
    return (
      <LinearGradient
        colors={["#000000", "#000000", "#434343"]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.inputContainer}
      >
        {this.state.settings.coordinates ? (
          <>
            <CustomInputfield
              label="Longitude"
              placeholder={"Enter..."}
              keyboardType="numeric"
              onChangeText={text => this.onInputChange("lon", text)}
              name="lon"
              value={this.state.settings.lon}
              errorMessage={this.state.error}
              returnKeyType={"next"}
            ></CustomInputfield>
            <CustomInputfield
              label="Latitude"
              placeholder="Enter..."
              keyboardType="numeric"
              returnKeyType={"Search"}
              onChangeText={text => this.onInputChange("lat", text)}
              name="lat"
              value={this.state.settings.lat}
              errorMessage={this.state.error}
            ></CustomInputfield>
            <CustomButton
              onPress={() => this.getData()}
              title="Search"
            ></CustomButton>
          </>
        ) : (
          <>
            {/* <CustomInputfield
              label="Location"
              placeholder="Enter a location..."
              keyboardType="default"
              returnKeyType={"Search"}
              onChangeText={text => this.onInputChange("location", text)}
              name="location"
              value={this.state.settings.location}
            ></CustomInputfield> */}
            <View style={styles.autocompletesContainer}>
              <Autocomplete
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContainer2}
                placeholder="Enter a location..."
                spinnerColor="white"
                // scrollToInput={ev => scrollToInput(ev)}
                handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
                // onDropdownClose={() => onDropdownClose()}
                // onDropdownShow={() => onDropdownShow()}
                fetchDataUrl={apiUrl}
                minimumCharactersCount={1}
                highlightText
                valueExtractor={item => item.place}
                rightContent
                rightTextExtractor={item =>
                  item.lat.toFixed(3) + ", " + item.lon.toFixed(3)
                }
              />
            </View>
          </>
        )}
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8
  },
  input: {
    borderColor: "white",
    maxHeight: 100,
    color: "white"
  },
  inputContainer2: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10
  }
});
