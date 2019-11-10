import dispatcher from "../stores/dispatcher";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";

export function saveSettings(data) {
  dispatcher.dispatch({
    type: "SAVE_SETTINGS",
    data: data
  });
}

export function getData() {
  dispatcher.dispatch({
    type: "GET_DATA",
    data
  });
}

export function getLastTimeUpdated() {
  dispatcher.dispatch({
    type: "GET_LAST_TIME_UPDATED",
    data
  });
}

export function reloadWeatherData(info) {
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
      console.log("fetched data and store");
    })
    .catch(error => {
      console.error(error);
    });
}
