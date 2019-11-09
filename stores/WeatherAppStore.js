import React, { Component } from "react";
import { EventEmitter } from "events";
import { _retrieveData, _storeData } from "../utils/AsyncStorageHandler";
import { fetchData } from "../utils/APIHandler";
import { AsyncStorage } from "react-native";
import dispatcher from "./dispatcher";

class WeatherAppStore extends EventEmitter {
  constructor() {
    super();
    this.lastTimeUpdated = "";
    this.data = [];
    this.loadData();
    this.loadLastTimeUpdated();
  }

  loadData = async () => {
    this.data = await _retrieveData("weatherData");
  };

  loadLastTimeUpdated = async () => {
    this.lastTimeUpdated = await _retrieveData("lastTimeUpdated");
  };

  saveData(data) {
    this.data = data;
    this.emit("change");
  }
  saveLastTimeUpdated(data) {
    this.lastTimeUpdated = data;
    this.emit("change");
  }
  getData() {
    return this.data;
  }

  getLastTimeUpdated() {
    return this.lastTimeUpdated;
  }

  handleActions(action) {
    switch (action.type) {
      case "SAVE_DATA": {
        this.saveData(action.data);
        break;
      }
      case "SAVE_LAST_TIME_UPDATED": {
        this.saveLastTimeUpdated(action.data);
        break;
      }
      case "GET_DATA": {
        this.data = action.data;
        this.emit("change");
        break;
      }
      case "GET_LAST_TIME_UPDATED": {
        this.data = action.data;
        this.emit("change");
        break;
      }
    }
  }
}

const weatherAppStore = new WeatherAppStore();
dispatcher.register(weatherAppStore.handleActions.bind(weatherAppStore));

export default weatherAppStore;
