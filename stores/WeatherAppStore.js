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
    this.data = [];
    this.settings = {
      coordinates: true,
      lon: "",
      lat: "",
      location: "",
      lastTimeFetched: "",
      updateInterval: 10
    };
    this.favorites = ["Gävle", "Örebro", "Kiruna", "Stockholm"];
    this.loadData();
    this.loadApprovedTime();
    this.loadSettings();
    this.loadFavorites();
  }

  loadData = async () => {
    this.data = await _retrieveData("weatherData");
  };

  loadApprovedTime = async () => {
    this.approvedTime = await _retrieveData("approvedTime");
  };

  loadSettings = async () => {
    this.settings = await _retrieveData("settings");
  };

  loadFavorites = async () => {
    //this.favorites = await _retrieveData("favorites");
  };

  saveData(data) {
    this.data = data;
    _storeData("weatherData", data);
  }
  saveApprovedTime(data) {
    this.approvedTime = data;
    _storeData("approvedTime", data);
  }

  saveCoordinates(data) {
    this.settings.lon = data.lon;
    this.settings.lat = data.lat;
    _storeData("settings", this.settings);
  }

  saveLastTimeFetched() {
    this.settings.lastTimeFetched = new Date().toISOString();
    // console.log("XX; ", this.settings.lastTimeFetched);
    // console.log("YY; ", new Date(this.settings.lastTimeFetched));
    _storeData("settings", this.settings);
  }

  saveSettings(data) {
    this.settings = data;
    console.log("save sett: ", data);
    _storeData("settings", this.settings);
  }

  saveFavorite(data) {
    console.log("innan: ", this.favorites);
    var found = this.favorites.includes(data);
    console.log("PLATS: ", data, " FOUND; ", found);
    if (found) {
      this.favorites.splice(this.favorites.indexOf(data), 1);
      console.log("tar bort");
    } else {
      this.favorites.push(data);
      console.log("lägger in");
    }
    console.log("efter: ", this.favorites);
    _storeData("favorites", this.favorites);
  }

  getData() {
    return this.data;
  }

  getApprovedTime() {
    return this.approvedTime;
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
        this.saveCoordinates(action.data.coordinates);
        this.saveLastTimeFetched();
        this.emit("change");
        break;
      }
      case "SAVE_SETTINGS": {
        this.saveSettings(action.data);
        this.emit("changeSettings");
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
