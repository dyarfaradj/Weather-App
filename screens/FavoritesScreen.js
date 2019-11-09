import React, { Component } from "react";
import FavoritesPage from "../components/FavoritesPage";

export default class FavoritesScreen extends Component {
  render() {
    return <FavoritesPage navigation={this.props.navigation} />;
  }
}
