import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

class ButtonAddUpdateDeleteEvent extends Component {
  //GETTING ICON THAT CORRESPONDS WITH PURPOSE
  _getIconName = () => {
    let iconName;
    if (this.props.purpose == "Add") {
      iconName = "plus-circle";
    } else if (this.props.purpose == "Update") {
      iconName = "pencil";
    } else if (this.props.purpose == "Delete") {
      iconName = "delete";
    }
    return iconName;
  };

  render() {
    return (
      <MaterialCommunityIcons
        style={this.props.style}
        name={this._getIconName()}
        size={this.props.size}
        color={this.props.color}
        onPress={this.props.onPress}
      />
    );
  }
}

export default ButtonAddUpdateDeleteEvent;
