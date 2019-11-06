import React from "react";
import { View, StatusBar, StyleSheet, Platform } from "react-native";

export default StatusBarBackground = props => {
  return (
    <View style={[styles.statusBarBackground, props.style || {}]}>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "white"
  }
});
