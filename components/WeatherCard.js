import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { weatherIcon } from "../utils/ImageHandler";

function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}
function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  return arr[val % 16];
}
export default WeathCard = props => {
  return (
    <View style={styles.container}>
      <Image
        source={weatherIcon[props.data.parameters[18].values[0]]}
        style={{ width: 70, height: 70 }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{props.data.validTime}</Text>
        <Text style={styles.celcius}>
          {props.data.parameters[1].values[0]}°C
        </Text>
        <Text style={styles.wind}>
          Sight: {props.data.parameters[2].values[0]}km
        </Text>
        <Text style={styles.precipitation}>
          Humidity: {props.data.parameters[5].values[0]}%
        </Text>
      </View>
      <Image
        style={{
          width: 25,
          height: 55,
          transform: [
            { rotate: 180 + props.data.parameters[3].values[0] + "deg" }
          ]
        }}
        resizeMode="stretch"
        source={require("../assets/images/arrow.png")}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.wind}>
          Wind: {degToCompass(props.data.parameters[3].values[0])}{" "}
          {props.data.parameters[4].values[0]}m/s
        </Text>
        <Text style={styles.precipitation}>
          Min: {props.data.parameters[12].values[0]} Max:{" "}
          {props.data.parameters[13].values[0]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "black"
  },
  contentContainer: {
    flexDirection: "column"
  },
  title: {
    color: "black"
  },
  celcius: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold"
  },
  wind: {
    color: "black"
  },
  precipitation: {
    color: "black"
  }
});
