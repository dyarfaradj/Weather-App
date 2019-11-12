import React, { Component } from "react";
import { EventEmitter } from "events";
import {
  _retrieveData,
  _storeData,
  clearAllData
} from "../utils/AsyncStorageHandler";
import dispatcher from "./dispatcher";

class WeatherAppStore extends EventEmitter {
  constructor() {
    super();
    this.approvedTime = "";
    this.lastTimeFetched = "";
    this.data = [];
    this.settings = {
      coordinates: true,
      lon: "",
      lat: "",
      location: "",
      updateInterval: "10"
    };
    this.favorites = ["Gävle", "Örebro", "Kiruna", "Stockholm"];
    this.loadData();
    this.loadApprovedTime();
    this.loadLastTimeFetched();
    this.loadSettings();
    this.loadFavorites();
  }

  loadData = async () => {
    this.data = await _retrieveData("weatherData");
  };

  loadApprovedTime = async () => {
    this.approvedTime = await _retrieveData("approvedTime");
  };

  loadLastTimeFetched = async () => {
    this.lastTimeFetched = await _retrieveData("lastTimeFetched");
  };

  loadSettings = async () => {
    this.settings = await _retrieveData("settings");
  };

  loadFavorites = async () => {
    this.favorites = await _retrieveData("favorites");
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
