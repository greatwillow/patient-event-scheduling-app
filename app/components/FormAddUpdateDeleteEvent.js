import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { checkIfInteger } from "../utils/checkIfInteger";
import TextInputSingleLine from "./TextInputSingleLine";
import ButtonGeneric from "./ButtonGeneric";
import CustomFontText from "./CustomFontText";

class FormAddUpdateDeleteEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      titleFieldTouched: false,
      titleFieldProper: true,
      titleFieldValid: true,
      patientName: null,
      nameFieldTouched: false,
      nameFieldProper: true,
      nameFieldValid: true,
      duration: 0,
      durationFieldTouched: false,
      durationFieldProper: true,
      durationFieldValid: true
    };
  }
  _validifyTitleInput = value => {
    if (value.length >= 3) {
      this.setState({
        title: value,
        titleFieldTouched: true,
        titleFieldProper: true
      });
    } else {
      this.setState({
        title: value,
        titleFieldProper: false
      });
    }
  };

  _validifyNameInput = value => {
    if (value.length >= 3) {
      this.setState({
        patientName: value,
        nameFieldTouched: true,
        nameFieldProper: true
      });
    } else {
      this.setState({
        patientName: value,
        nameFieldProper: false
      });
    }
  };

  _validifyDurationInput = value => {
    if (checkIfInteger(value) && value >= 1 && value <= 14) {
      this.setState({
        duration: value,
        durationFieldTouched: true,
        durationFieldProper: true
      });
    } else {
      this.setState({
        duration: value,
        durationFieldProper: false
      });
    }
  };

  _triggerAddUpdateDelete = () => {
    const event = {
      id:
        this.props.modalUI.modalPurpose === "ADD"
          ? null
          : this.props.selectedEvent.id,
      title: this.state.title,
      patientName: this.state.patientName,
      duration: this.state.duration
    };
    this.props.setModalVisibility(false);
    if (this.props.modalUI.modalPurpose === "Add") {
      this.props.requestAddEvent(event);
    } else if (this.props.modalUI.modalPurpose === "Update") {
      this.props.requestUpdateEvent(event);
    } else if (this.props.modalUI.modalPurpose === "Delete") {
      this.props.requestDeleteEvent(event);
    }
  };

  _onPressButton = () => {
    if (this.props.modalUI.modalPurpose === "Delete") {
      this._triggerAddUpdateDelete();
    }
    if (
      this.state.titleFieldTouched &&
      this.state.titleFieldProper &&
      this.state.nameFieldTouched &&
      this.state.nameFieldProper &&
      this.state.durationFieldTouched &&
      this.state.durationFieldProper
    ) {
      this._triggerAddUpdateDelete();
    } else {
      if (!this.state.titleFieldTouched || !this.state.titleFieldProper) {
        this.setState({
          titleFieldValid: false
        });
      } else {
        this.setState({
          titleFieldValid: true
        });
      }
      if (!this.state.nameFieldTouched || !this.state.nameFieldProper) {
        this.setState({
          nameFieldValid: false
        });
      } else {
        this.setState({
          nameFieldValid: true
        });
      }
      if (!this.state.durationFieldTouched || !this.state.durationFieldProper) {
        this.setState({
          durationFieldValid: false
        });
      } else {
        this.setState({
          durationFieldValid: true
        });
      }
    }
  };

  render() {
    if (
      this.props.modalUI.modalPurpose === "Add" ||
      this.props.modalUI.modalPurpose === "Update"
    ) {
      return (
        <View style={styles.formContainer}>
          <CustomFontText style={{ fontSize: 20, paddingBottom: 10 }}>
            {`${this.props.modalUI.modalPurpose} Event`}
          </CustomFontText>
          <CustomFontText style={{ fontSize: 20, paddingBottom: 10 }}>
            {`${this.props.selectedEvent.id} ID`}
          </CustomFontText>
          <CustomFontText style={{ fontSize: 15, paddingBottom: 10 }}>
            For: {this.props.selectedDate.selectedDate.format("LL")}
          </CustomFontText>
          <TextInputSingleLine
            placeholder={"Event Title (3 or more chars)"}
            style={{ width: SCREEN_WIDTH / 6 * 4 }}
            onChangeText={this._validifyTitleInput}
            valid={this.state.titleFieldValid}
          />
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
          <ButtonGeneric
            text={`${this.props.modalUI.modalPurpose} Event`}
            onPress={this._onPressButton}
          />
        </View>
      );
    } else if (this.props.modalUI.modalPurpose === "Delete") {
      return (
        <View style={styles.formContainer}>
          <CustomFontText style={{ fontSize: 20, paddingBottom: 10 }}>
            {`${this.props.selectedEvent.id} ID`}
          </CustomFontText>
          <ButtonGeneric
            text={`${this.props.modalUI.modalPurpose} Event`}
            onPress={this._onPressButton}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: SCREEN_HEIGHT / 2,
    width: SCREEN_WIDTH / 6 * 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGreen,
    borderRadius: 10,
    padding: 30
  }
});

export default FormAddUpdateDeleteEvent;