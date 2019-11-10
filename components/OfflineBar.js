import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default OfflineBar = props => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  },
  offlineText: {
    color: "#fff"
  }
});
