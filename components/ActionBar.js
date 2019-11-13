import React, { Component } from "react";
import {
  StyleSheet,
  Keyboard,
  NetInfo,
  Alert,
  View,
  SafeAreaView
} from "react-native";
import CustomButton from "./utils/CustomButton";
import CustomInputfield from "./utils/CustomInputfield";
import { LinearGradient } from "expo-linear-gradient";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import { Autocomplete } from "react-native-dropdown-autocomplete";
import { Ionicons } from "@expo/vector-icons";

export default class ActionBar extends Component {
  constructor() {
    super();
    const currentSettings = weatherAppStore.getSettings();
    this.state = {
      apiUrl: "g",
      settings: currentSettings,
      favorites: weatherAppStore.getFavorites(),
      error: "",
      currentSelectedPlace: currentSettings.location
    };
  }

  componentWillMount() {
    weatherAppStore.on("changeFavorites", this.getFavoritesData);
    weatherAppStore.on("changeSettings", this.getSettingsData);
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("changeSettings", this.getSettingsData);
    weatherAppStore.removeListener("changeFavorites", this.getFavoritesData);
  }
  getFavoritesData = () => {
    this.setState({
      favorites: weatherAppStore.getFavorites()
    });
  };

  getSettingsData = () => {
    const currentSettings = weatherAppStore.getSettings();
    if (currentSettings.location != this.state.currentSelectedPlace) {
      this.setState({
        settings: currentSettings,
        currentSelectedPlace: currentSettings.location
      });
      this.getData();
    } else {
      this.setState({
        settings: currentSettings,
        currentSelectedPlace: currentSettings.location
      });
    }
  };

  onInputChange = (name, value) => {
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        [name]: value.replace(",", ".")
      }
    }));
  };

  onInputChangeAPI = value => {
    this.setState({
      apiUrl: value
    });
  };

  toggleFavorite = item => {
    if (item) {
      const newFavorite = {
        place: item,
        lon: this.state.settings.lon,
        lat: this.state.settings.lat
      };
      WeatherAppActions.saveFavorite(newFavorite);
    }
  };

  getData() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ error1: "", error2: "" });
        let info = {
          lon: this.state.settings.lon,
          lat: this.state.settings.lat
        };
        let currentSettings = this.state.settings;
        if (!currentSettings.coordinates) {
          WeatherAppActions.reloadWeatherData(info, currentSettings);
          Keyboard.dismiss();
        } else {
          if (this.state.settings.lon === "") {
            this.setState({ error1: "Fel" });
          }
          if (this.state.settings.lat === "") {
            this.setState({ error2: "Fel" });
          }
          if (this.state.settings.lat != "" && this.state.settings.lon != "") {
            WeatherAppActions.reloadWeatherData(info, currentSettings);
            Keyboard.dismiss();
          }
        }
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
    this.setState(prevState => ({
      settings: {
        ...prevState.settings,
        lon: item.lon.toFixed(3),
        lat: item.lat.toFixed(3),
        location: item.place
      },
      currentSelectedPlace: item.place
    }));
    this.getData();
  }

  render() {
    return (
      <LinearGradient
        colors={["#000000", "#000000", "#434343"]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.inputContainer}
      >
        {this.state.settings &&
          this.state.favorites &&
          this.state.settings.coordinates ? (
            <>
              <CustomInputfield
                color="#ffffff"
                label="Longitude"
                placeholder={"Enter..."}
                keyboardType="numeric"
                onChangeText={text => this.onInputChange("lon", text)}
                name="lon"
                value={this.state.settings.lon}
                errorMessage={this.state.error1}
                returnKeyType={"next"}
              ></CustomInputfield>
              <CustomInputfield
                color="#ffffff"
                label="Latitude"
                placeholder="Enter..."
                keyboardType="numeric"
                returnKeyType={"Search"}
                onChangeText={text => this.onInputChange("lat", text)}
                name="lat"
                value={this.state.settings.lat}
                errorMessage={this.state.error2}
              ></CustomInputfield>
              <CustomButton
                onPress={() => this.getData()}
                title="Search"
              ></CustomButton>
            </>
          ) : (
            <View style={styles.autocompletesContainer}>
              <SafeAreaView>
                <Autocomplete
                  key={this.state.currentSelectedPlace}
                  inputStyle={styles.input}
                  inputContainerStyle={styles.inputContainer2}
                  containerStyle={styles.pickerStyle}
                  spinnerStyle={styles.spinnerStyle}
                  placeholder="Enter a location..."
                  spinnerColor="white"
                  handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
                  onChangeText={text => this.onInputChangeAPI(text)}
                  renderIcon={() => (
                    <Ionicons
                      style={styles.starIcon}
                      name="ios-star"
                      size={40}
                      color={
                        this.state.favorites &&
                          this.state.favorites.some(
                            item => item.place === this.state.currentSelectedPlace
                          )
                          ? "#ffff00"
                          : "#c7c6c1"
                      }
                      onPress={() =>
                        this.toggleFavorite(this.state.currentSelectedPlace)
                      }
                    />
                  )}
                  fetchDataUrl={
                    "http://smhi.se/wpt-a/backend_solr/autocomplete/search/" +
                    this.state.apiUrl
                  }
                  minimumCharactersCount={1}
                  highlightText
                  valueExtractor={item => item.place}
                  rightTextExtractor={item =>
                    item.lat.toFixed(3) + ", " + item.lon.toFixed(3)
                  }
                  initialValue={this.state.currentSelectedPlace}
                />
              </SafeAreaView>
            </View>
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
    height: "auto",
    minHeight: 100,
    maxHeight: 300
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
  spinnerStyle: {
    marginTop: 15,
    marginRight: 16
  },
  starIcon: {
    paddingRight: 6
  }
});
