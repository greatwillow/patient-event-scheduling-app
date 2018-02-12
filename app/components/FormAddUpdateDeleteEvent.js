import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from "react-native";
import moment from "moment";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { checkIfInteger } from "../utils/checkIfInteger";
import ButtonGeneric from "./ButtonGeneric";
import CustomFontText from "./CustomFontText";

class FormAddUpdateDeleteEvent extends Component {
  constructor() {
    super();
    this.state = {
      inputs: {},
      title: null,
      titleFieldTouched: false,
      titleFieldProper: true,
      titleFieldValid: true,
      patientName: null,
      nameFieldTouched: false,
      nameFieldProper: true,
      nameFieldValid: true,
      durationString: "",
      duration: 0,
      durationFieldTouched: false,
      durationFieldProper: true,
      durationFieldValid: true
    };
  }

  //--------------------------------------------------
  // Mounting
  //--------------------------------------------------

  componentWillMount = () => {
    if (this.props.modalUI.modalPurpose == "Update") {
      this.setState({
        title: this.props.selectedEvent.title,
        patientName: this.props.selectedEvent.patientName,
        durationString: String(this.props.selectedEvent.duration),
        duration: this.props.selectedEvent.duration
      });
    }
  };

  //--------------------------------------------------
  // Directing UI to Focus on Next Text Field
  //--------------------------------------------------

  inputs = {};

  focusNextField = id => {
    this.inputs[id].focus();
  };

  //--------------------------------------------------
  // Send Async Request and Update Local State
  //--------------------------------------------------

  _triggerAddUpdateDelete = () => {
    const id =
      this.props.modalUI.modalPurpose === "ADD"
        ? null
        : this.props.selectedEvent.id;

    //CALIBRATING END DATE TO CORRESPOND WITH EXISTING EVENT WHEN UPDATED
    let calibratedStartDate;
    let calibratedEndDate;
    if (this.props.modalUI.modalPurpose == "Add") {
      calibratedStartDate = this.props.selectedDate.selectedDate;
      calibratedEndDate = moment(calibratedStartDate).add(
        this.state.duration - 1,
        "days"
      );
    } else if (this.props.modalUI.modalPurpose == "Update") {
      calibratedStartDate = this.props.selectedEvent.eventStartDate;
      calibratedEndDate = moment(calibratedStartDate).add(
        this.state.duration - 1,
        "days"
      );
    }

    //FINAL START AND END DATES
    let eventStartDate = moment
      .parseZone(calibratedStartDate)
      .format("YYYY-MM-DD");
    let eventEndDate = moment.parseZone(calibratedEndDate).format("YYYY-MM-DD");

    //FINAL EVENT OBJECT TO BE SENT
    const event = {
      id: id,
      title: this.state.title,
      patientName: this.state.patientName,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate
    };
    this.props.setModalVisibility(false);

    //ROUTING DIFFERENT REQUESTS
    if (this.props.modalUI.modalPurpose === "Add") {
      this.props.requestAddEvent(event);
    } else if (this.props.modalUI.modalPurpose === "Update") {
      this.props.requestUpdateEvent(event);
    } else if (this.props.modalUI.modalPurpose === "Delete") {
      this.props.requestDeleteEvent(event);
    }
  };

  //--------------------------------------------------
  // Final Determination of whether all fields are valid
  // before firing off async action and state change
  //--------------------------------------------------

  _onSubmit = () => {
    preTriggerValidation = new Promise((res, rej) => {
      if (this.props.modalUI.modalPurpose === "Delete") {
        this._triggerAddUpdateDelete();
      } else if (this.props.modalUI.modalPurpose === "Update") {
        if (this.state.titleFieldTouched === false) {
          this.setState({
            titleFieldTouched: true
          });
        }
        if (this.state.nameFieldTouched === false) {
          this.setState({
            nameFieldTouched: true
          });
        }
        if (this.state.durationFieldTouched === false) {
          this.setState({
            durationFieldTouched: true
          });
        }
      }
      return res();
    });
    preTriggerValidation
      .then(res => {
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
          if (
            !this.state.durationFieldTouched ||
            !this.state.durationFieldProper
          ) {
            this.setState({
              durationFieldValid: false
            });
          } else {
            this.setState({
              durationFieldValid: true
            });
          }
        }
      })
      .catch(err =>
        console.error("Error in preTrigger validation Promise ", err)
      );
  };

  //--------------------------------------------------
  // Validify Title Input
  //--------------------------------------------------

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

  //--------------------------------------------------
  // Validify Name Input
  //--------------------------------------------------

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

  //--------------------------------------------------
  // Validify Duration Input
  //--------------------------------------------------

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

  //--------------------------------------------------
  // Rendering
  //--------------------------------------------------

  render() {
    if (
      this.props.modalUI.modalPurpose === "Add" ||
      this.props.modalUI.modalPurpose === "Update"
    ) {
      //WHAT TO SHOW IN CASES OF 'ADD' or 'UPDATE'
      return (
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.formContainer}>
            <CustomFontText style={{ fontSize: 20, paddingBottom: 10 }}>
              {`${this.props.modalUI.modalPurpose} Event`}
            </CustomFontText>
            <CustomFontText style={{ fontSize: 15, paddingBottom: 10 }}>
              For: {this.props.selectedDate.selectedDate.format("LL")}
            </CustomFontText>
            {/* ----------------------------INPUT FOR TITLE--------------------- */}
            <TextInput
              ref={input => {
                this.inputs["one"] = input;
              }}
              style={[
                styles.textInput,
                this.state.titleFieldValid
                  ? { borderColor: "black", borderWidth: 1 }
                  : { borderColor: "red", borderWidth: 3 }
              ]}
              defaultValue={this.state.title}
              placeholder={"Event Title (3 or more chars)"}
              placeholderTextColor={this.state.titleFieldValid ? "grey" : "red"}
              onChangeText={this._validifyTitleInput}
              onSubmitEditing={() => {
                this.focusNextField("two");
              }}
              blurOnSubmit={false}
              returnKeyType={"next"}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="while-editing"
              maxLength={50}
            />
            {/* ----------------------------INPUT FOR NAME--------------------- */}
            <TextInput
              ref={input => {
                this.inputs["two"] = input;
              }}
              style={[
                styles.textInput,
                this.state.nameFieldValid
                  ? { borderColor: "black", borderWidth: 1 }
                  : { borderColor: "red", borderWidth: 3 }
              ]}
              defaultValue={this.state.patientName}
              placeholder={"Patient Name (3 or more chars)"}
              placeholderTextColor={this.state.nameFieldValid ? "grey" : "red"}
              onChangeText={this._validifyNameInput}
              onSubmitEditing={() => {
                this.focusNextField("three");
              }}
              valid={this.state.nameFieldValid}
              blurOnSubmit={false}
              returnKeyType={"next"}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode="while-editing"
              maxLength={50}
            />
            {/* ----------------------------INPUT FOR DURATION--------------------- */}
            <TextInput
              ref={input => {
                this.inputs["three"] = input;
              }}
              style={[
                styles.textInput,
                this.state.durationFieldValid
                  ? { borderColor: "black", borderWidth: 1 }
                  : { borderColor: "red", borderWidth: 3 }
              ]}
              defaultValue={this.state.durationString}
              placeholder={"Event Duration (between 1 and 14)"}
              placeholderTextColor={
                this.state.durationFieldValid ? "grey" : "red"
              }
              onChangeText={this._validifyDurationInput}
              onSubmitEditing={this._onSubmit}
              blurOnSubmit={true}
              returnKeyType={"done"}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode="while-editing"
              maxLength={50}
              keyboardType={"numeric"}
            />
            {/* ----------------------------SUBMIT BUTTON--------------------- */}
            <ButtonGeneric
              text={`${this.props.modalUI.modalPurpose} Event`}
              onPress={this._onSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (this.props.modalUI.modalPurpose === "Delete") {
      //WHAT TO SHOW IN CASE OF 'DELETE'
      return (
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.formContainerDelete}>
            <CustomFontText
              style={{
                textAlign: "center",
                fontSize: 20,
                paddingBottom: 20,
                padding: 5
              }}
            >
              Are you sure you would like to delete this event?
            </CustomFontText>
            <ButtonGeneric
              text={`${this.props.modalUI.modalPurpose} Event`}
              onPress={this._onSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
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
  },
  formContainerDelete: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH / 6 * 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGreen,
    borderRadius: 10,
    padding: 30
  },
  textInput: {
    width: SCREEN_WIDTH / 6 * 4,
    backgroundColor: "white",
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    alignSelf: "center"
  }
});

export default FormAddUpdateDeleteEvent;
