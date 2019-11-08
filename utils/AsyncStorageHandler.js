import { AsyncStorage } from "react-native";
import React from "react";
export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("saved data");
  } catch (error) {
    // Error saving data
  }
};

export async function _retrieveData(key) {
  return await AsyncStorage.getItem(key).then(data => {
    return JSON.parse(data);
  });
}
