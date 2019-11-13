import React, { Component } from "react";
import FavoritesPage from "./pages/FavoritesPage";

export default class FavoritesScreen extends Component {
  render() {
    return <FavoritesPage navigation={this.props.navigation} />;
  }
}
