import React, { Component } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import PropTypes from "prop-types";

import { SCREEN_WIDTH } from "../constants/dimensions";
import CustomFontText from "./CustomFontText";
import { COLORS } from "../constants/colors";

class ButtonGeneric extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        underlayColor={"gray"}
        onPress={this.props.onPress}
      >
        <View>
          <CustomFontText style={styles.buttonText}>
            {this.props.text ? this.props.text : "Text Needed!"}{" "}
          </CustomFontText>
        </View>
      </TouchableHighlight>
    );
  }
}

ButtonGeneric.propTypes = {
  text: PropTypes.string
};

var styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH / 6 * 4,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.darkGreen,
    marginTop: 10,
    padding: 5
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "white"
  }
});

export default ButtonGeneric;
