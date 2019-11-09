import dispatcher from "../stores/dispatcher";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";

export function saveData(data) {
  dispatcher.dispatch({
    type: "SAVE_DATA",
    data
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
      dispatcher.dispatch({
        type: "SAVE_DATA",
        data: data.timeSeries
      });
      dispatcher.dispatch({
        type: "SAVE_LAST_TIME_UPDATED",
        data: data.approvedTime
      });
      _storeData("weatherData", data.timeSeries);
      _storeData("lastTimeUpdated", data.approvedTime);
      console.log("fetched data and store");
    })
    .catch(error => {
      console.error(error);
    });
}
