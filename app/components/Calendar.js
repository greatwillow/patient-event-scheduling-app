import React, { Component } from "react";
import { LayoutAnimation, Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import CalendarPicker from "react-native-calendar-picker";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      calendarHeight: SCREEN_HEIGHT / 7 * 3
    };
  }

  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        calendarScale: 1
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        calendarHeight: SCREEN_HEIGHT / 7 * 3
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    console.log("====================================");
    console.log("RECEIVEING PROPS ");
    console.log("====================================");
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ calendarHeight: 1 }, () =>
          console.log("SCALE CHANGED")
        );
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ calendarHeight: SCREEN_HEIGHT / 7 * 3 });
      }
    }
  };
  //CHANGING STATE SELECTED DATE BASED ON USER SELECTED DATE
  _onDateChange = date => {
    this.props.setSelectedDate(date);
  };

  render() {
    return (
      <View style={styles.calendarContainer}>
        <CalendarPicker
          height={this.state.calendarHeight}
          onDateChange={this._onDateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.red,
    padding: 10,
    paddingBottom: 10,
    marginTop: 30
  }
});

export default Calendar;
