import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { weatherIcon } from "../../utils/ImageHandler";
import moment from "moment";
function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}
function degToCompass(num) {
  var index = Math.floor(num / 22.5 + 0.5);
  var values = [
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
  return values[index % 16];
}

function valueToOkta(num) {
  var values = [
    "Sky clear",
    "Few",
    "Few",
    "Scattered",
    "Broken",
    "Broken",
    "Broken",
    "Overcast",
    "Sky obstructed"
  ];
  return values[num];
}
export default WeathCard = props => {
  return (
    <View style={styles.container}>
      <Image
        source={weatherIcon[props.data.parameters[18].values[0]]}
        style={{ width: 85, height: 70 }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {moment(props.data.validTime).format("YYYY-MM-DD HH:MM")}
        </Text>
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
          width: 15,
          height: 25,
          marginLeft: 5,
          marginRight: 5,
          transform: [
            { rotate: 180 + props.data.parameters[3].values[0] + "deg" }
          ]
        }}
        resizeMode="contain"
        source={require("../../assets/images/arrow.png")}
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
        <Text style={styles.wind}>
          Air pressure: {props.data.parameters[0].values[0]}hPa
        </Text>
        <Text style={styles.wind}>
          Cloud cover: {valueToOkta(props.data.parameters[7].values[0])}
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
    fontSize: 35,
    fontWeight: "bold"
  },
  wind: {
    color: "black"
  },
  precipitation: {
    color: "black"
  }
});
