import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

class AddEventButton extends Component {
  _onPressDisplayAddForm = () => {
    this.props.setFormModalVisibility(true);
  };
  render() {
    return (
      <MaterialCommunityIcons
        style={this.props.style}
        name="plus-circle"
        size={70}
        color={COLORS.lightGreen}
        onPress={this._onPressDisplayAddForm}
      />
    );
  }
}

export default AddEventButton;
