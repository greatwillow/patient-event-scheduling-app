import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

class AddEventButton extends Component {
  _onPressDisplayAddForm = () => {
    this.props.setModalVisibility(true);
  };
  render() {
    return (
      <MaterialCommunityIcons
        name="plus-circle"
        size={70}
        color={COLORS.red}
        onPress={this._onPressDisplayAddForm}
      />
    );
  }
}

export default AddEventButton;
