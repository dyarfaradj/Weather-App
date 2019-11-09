import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FrontPage from "./components/FrontPage";
import NavigationMenu from "./components/NavigationMenu";

export default function App() {
  return <NavigationMenu />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
