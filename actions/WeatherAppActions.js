import dispatcher from "../stores/dispatcher";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import { Alert } from "react-native";

export function saveLastTimeFetched(data) {
  dispatcher.dispatch({
    type: "SAVE_LAST_TIME_FETCHED",
    data: data
  });
}

export function saveSettings(data) {
  dispatcher.dispatch({
    type: "SAVE_SETTINGS",
    data: data
  });
}

export function saveFavorite(data) {
  dispatcher.dispatch({
    type: "SAVE_FAVORITE",
    data: data
  });
}

export function reloadWeatherData(info, currentSettings) {
  if (!info) info = { lon: "14.333", lat: "60.383" };
  console.log("fetching:  ", info);
  dispatcher.dispatch({ type: "FETCH_TODOS", info });
  fetch(
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/" +
      info.lon +
      "/lat/" +
      info.lat +
      "/data.json"
  )
    .then(response => response.json())
    .then(data => {
      data.coordinates = {
        lon: info.lon,
        lat: info.lat
      };
      dispatcher.dispatch({
        type: "SAVE_DATA",
        data: data
      });
      if (currentSettings) {
        console.log("ACION: ", currentSettings);
        dispatcher.dispatch({
          type: "SAVE_SETTINGS",
          data: currentSettings
        });
      }
      dispatcher.dispatch({
        type: "SAVE_LAST_TIME_FETCHED",
        data: data
      });
      console.log("fetched data and store");
    })
    .catch(error => {
      Alert.alert(
        "Invalid search result",
        "Please check your entered information",
        [{ text: "OK" }],
        { cancelable: false }
      );
    });
}
