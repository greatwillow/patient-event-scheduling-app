import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import CalendarPicker from "react-native-calendar-picker";

class Calendar extends Component {
  _onDateChange = date => {
    console.log("PROPS ", this.props);
    console.log("DATE IS ", date.get("date"));
    console.log("Year IS ", date.get("year"));
    console.log("Month IS ", date.get("month"));
    this.props.setSelectedDate(date);
  };

  render() {
    return (
      <View style={styles.calendarContainer}>
        <CalendarPicker onDateChange={this._onDateChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.white,
    padding: 10,
    paddingBottom: 10,
    marginTop: 30
  }
});

export default Calendar;
