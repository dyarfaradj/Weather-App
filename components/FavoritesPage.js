import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Switch } from "react-native";
import * as WeatherAppActions from "../actions/WeatherAppActions";
import weatherAppStore from "../stores/WeatherAppStore";
import Header from "./Header";
import ListItem from "./ListItem";

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: weatherAppStore.getFavorites()
    };
  }
  componentWillMount() {
    weatherAppStore.on("changeFavorites", this.getFavoritesData);
  }

  componentWillUnmount() {
    weatherAppStore.removeListener("changeFavorites", this.getFavoritesData);
  }

  getFavoritesData = () => {
    this.setState({
      favorites: weatherAppStore.getFavorites()
    });
  };

  handleDeleteTask = item => {
    if (item) {
      WeatherAppActions.saveFavorite(item);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Favorites" navigation={this.props.navigation} />
        <FlatList
          data={this.state.favorites}
          keyExtractor={item => this.state.favorites.indexOf(item).toString()}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeperator}></View>
          )}
          contentContainerStyle={{
            borderBottomColor: "grey",
            borderBottomWidth: 1
          }}
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              index={index}
              handleDeleteTask={this.handleDeleteTask}
            />
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  itemSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});
