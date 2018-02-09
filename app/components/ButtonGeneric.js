import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight, View } from "react-native";

import { SCREEN_WIDTH } from "../constants/dimensions";

class ButtonGeneric extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        underlayColor={"gray"}
        onPress={this.props.onPress}
      >
        <View>
          <Text>{this.props.text ? this.props.text : "Text Needed!"} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH / 6 * 4,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    padding: 5
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "black"
  }
});

export default ButtonGeneric;
