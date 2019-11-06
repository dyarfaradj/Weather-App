import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

export default WeathCard = props => {
  return (
    <View style={styles.container}>
      <ListItem
        leftAvatar={{
          source: {
            uri:
              "https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-14-512.png"
          }
        }}
        title={props.data.validTime}
        subtitle="3sa"
        topDivider
        bottomDivider
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});
