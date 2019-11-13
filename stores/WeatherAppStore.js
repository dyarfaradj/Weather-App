import React, { Component } from "react";
import { EventEmitter } from "events";
import {
  _retrieveData,
  _storeData,
  clearAllData
} from "../utils/AsyncStorageHandler";
import { defaultData } from "../utils/DefaultData";
import dispatcher from "./dispatcher";

class WeatherAppStore extends EventEmitter {
  constructor() {
    super();
    this.approvedTime = defaultData.approvedTime;
    this.lastTimeFetched = defaultData.lastTimeFetched;
    this.data = defaultData.data;
    this.settings = defaultData.settings;
    this.favorites = defaultData.favorites;
    this.loadData();
    this.loadApprovedTime();
    this.loadLastTimeFetched();
    this.loadSettings();
    this.loadFavorites();
  }

  loadData = async () => {
    const retrievedData = await _retrieveData("weatherData");
    if (retrievedData)
      this.data = retrievedData;
    // clearAllData();
  };

  loadApprovedTime = async () => {
    const retrievedApprovedTime = await _retrieveData("approvedTime");
    if (retrievedApprovedTime)
      this.approvedTime = retrievedApprovedTime;
  };

  loadLastTimeFetched = async () => {
    const retrievedLastTimeFetched = await _retrieveData("lastTimeFetched");
    if (retrievedLastTimeFetched)
      this.lastTimeFetched = retrievedLastTimeFetched;
  };

  loadSettings = async () => {
    const retrievedSettings = await _retrieveData("settings");
    if (retrievedSettings)
      this.settings = retrievedSettings;
  };

  loadFavorites = async () => {
    const retrievedFavorites = await _retrieveData("favorites");
    if (retrievedFavorites)
      this.favorites = retrievedFavorites;
  };

  saveData(data) {
    this.data = data;
    _storeData("weatherData", data);
  }

  saveApprovedTime(data) {
    this.approvedTime = data;
    _storeData("approvedTime", data);
  }

  saveLastTimeFetched() {
    this.lastTimeFetched = new Date().toISOString();
    _storeData("lastTimeFetched", this.lastTimeFetched);
  }

  saveSettings(data) {
    this.settings = data;
    _storeData("settings", this.settings).then(() => {
      this.emit("changeSettings");
    });
  }

  saveFavorite(data) {
    var found = this.favorites.includes(data);
    if (found) {
      this.favorites.splice(this.favorites.indexOf(data), 1);
    } else {
      this.favorites.push(data);
    }
    _storeData("favorites", this.favorites);
  }

  getData() {
    return this.data;
  }

  getApprovedTime() {
    return this.approvedTime;
  }

  getLastTimeFetched() {
    return this.lastTimeFetched;
  }

  getSettings() {
    return this.settings;
  }

  getFavorites() {
    return this.favorites;
  }

  handleActions(action) {
    switch (action.type) {
      case "SAVE_DATA": {
        this.saveData(action.data.timeSeries);
        this.saveApprovedTime(action.data.approvedTime);
        this.emit("change");
        break;
      }
      case "SAVE_LAST_TIME_FETCHED": {
        this.saveLastTimeFetched();
        this.emit("changeLastTimeFetched");
        break;
      }
      case "SAVE_SETTINGS": {
        this.saveSettings(action.data);
        break;
      }
      case "SAVE_FAVORITE": {
        this.saveFavorite(action.data);
        this.emit("changeFavorites");
        break;
      }
    }
  }
}

const weatherAppStore = new WeatherAppStore();
dispatcher.register(weatherAppStore.handleActions.bind(weatherAppStore));

export default weatherAppStore;
