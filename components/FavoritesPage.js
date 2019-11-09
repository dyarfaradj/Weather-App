import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Switch } from "react-native";
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

  getFavoritesData = () => {
    this.setState({
      favorites: weatherAppStore.getFavorites()
    });
  };
  handleDeleteTask = id => {
    console.log(id);
    const newFavorites = this.state.favorites.filter(item => id !== item.id);
    this.setState({
      favorites: newFavorites
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Favorites" navigation={this.props.navigation} />
        <FlatList
          data={this.state.favorites}
          keyExtractor={item => item.id.toString()}
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