import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import WeatherCard from "./WeatherCard";
export default class WeathList extends Component {
  constructor() {
    super();
  }

  render() {
    const dataList = this.props.list;
    return (
      <View style={styles.container}>
        {dataList &&
          dataList.map((item, id) => {
            return <WeatherCard key={id} data={item} />;
          })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
