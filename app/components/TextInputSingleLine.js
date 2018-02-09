import React, { Component } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import { SCREEN_WIDTH } from "../constants/dimensions";

class TextInputSingleLine extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={[
            styles.textInputSingleLine,
            this.props.style,
            this.props.valid
              ? { borderColor: "black", borderWidth: 1 }
              : { borderColor: "red", borderWidth: 3 }
          ]}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.valid ? "grey" : "red"}
          keyboardType={this.props.keyboardType}
          underlineColorAndroid={"rgba(0,0,0,0)"}
          //returnKeyType={this.props.returnKeyType || "next"}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize="words"
          autoCorrect={false}
          clearButtonMode="while-editing"
          autoFocus={this.props.autoFocus || false}
          maxLength={50}
          defaultValue={this.props.defaultValue}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}
          onEndEditing={this.props.onEndEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputSingleLine: {
    backgroundColor: "white",
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: SCREEN_WIDTH / 6 * 5,
    alignSelf: "center"
  },
  invalidTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 6 * 5,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    margin: 10
  },
  invalidText: {
    fontSize: 15,
    color: "red"
  }
});

export default TextInputSingleLine;
