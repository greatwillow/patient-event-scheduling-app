import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { checkIfInteger } from "../utils/checkIfInteger";
import TextInputSingleLine from "./TextInputSingleLine";
import ButtonGeneric from "./ButtonGeneric";

class FormAddOrUpdateEvent extends Component {
  constructor() {
    super();
    this.state = {
      nameFieldTouched: false,
      nameFieldProper: true,
      durationFieldTouched: false,
      durationFieldProper: true,
      nameFieldValid: true,
      durationFieldValid: true
    };
  }
  _validifyNameInput = value => {
    console.log("VAL is ", value);
    console.log("VAL length is ", value.length);
    if (value.length >= 3) {
      this.setState({
        nameFieldTouched: true,
        nameFieldProper: true
      });
      console.log("Name Valid True ", this.state.nameFieldValid);
    } else {
      this.setState({
        nameFieldProper: false
      });
    }
  };

  _validifyDurationInput = value => {
    if (checkIfInteger(value) && value >= 1 && value <= 14) {
      this.setState(
        {
          durationFieldTouched: true,
          durationFieldProper: true
        },
        () => {
          console.log("Duration Proper True ", this.state.durationFieldProper);
        }
      );
    } else {
      this.setState(
        {
          durationFieldProper: false
        },
        () => {
          console.log("Duration Proper False ", this.state.durationFieldProper);
        }
      );
    }
  };

  _triggerButtonAction = () => {
    console.log("BUTTON TRIGGERED -------------");
  };

  _onPressButton = () => {
    if (
      this.state.nameFieldTouched &&
      this.state.nameFieldProper &&
      this.state.durationFieldTouched &&
      this.state.durationFieldProper
    ) {
      this._triggerButtonAction();
    } else {
      if (!this.state.nameFieldTouched || !this.state.nameFieldProper) {
        this.setState({
          nameFieldValid: false
        });
      }
      if (!this.state.durationFieldTouched || !this.state.durationFieldProper) {
        this.setState({
          durationFieldValid: false
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Add Event</Text>
        <Text style={{ fontSize: 15, paddingBottom: 10 }}>
          For: {this.props.selectedDate.selectedDate.format("LL")}
        </Text>
        <TextInputSingleLine
          placeholder={"Patient Name (3 or more chars)"}
          style={{ width: SCREEN_WIDTH / 6 * 4 }}
          onChangeText={this._validifyNameInput}
          valid={this.state.nameFieldValid}
        />
        <TextInputSingleLine
          placeholder={"Event Duration (between 1 and 14)"}
          style={{ width: SCREEN_WIDTH / 6 * 4 }}
          onChangeText={this._validifyDurationInput}
          valid={this.state.durationFieldValid}
        />
        <ButtonGeneric text={"Add Event"} onPress={this._onPressButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH / 6 * 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.red,
    borderRadius: 10,
    padding: 30
  }
});

export default FormAddOrUpdateEvent;
