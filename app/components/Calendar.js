import React, { Component } from "react";
import { LayoutAnimation, Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import CalendarPicker from "react-native-calendar-picker";

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      calendarHeight: SCREEN_HEIGHT / 12 * 7,
      calendarContainerHeight: SCREEN_HEIGHT / 12 * 6,
      calendarContainerPadding: 15,
      calendarContainerOpacity: 1
    };
  }

  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        calendarHeight: 0,
        calendarWidth: 0,
        calendarContainerHeight: 0,
        calendarContainerPadding: 0,
        calendarContainerOpacity: 0
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        calendarHeight: SCREEN_HEIGHT / 12 * 7,
        calendarContainerHeight: SCREEN_HEIGHT / 12 * 6,
        calendarContainerPadding: 15
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ calendarHeight: 0 });
        this.setState({ calendarContainerHeight: 0 });
        this.setState({ calendarContainerPadding: 0 });
        this.setState({ calendarContainerOpacity: 0 });
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ calendarHeight: SCREEN_HEIGHT / 12 * 7 });
        this.setState({ calendarContainerHeight: SCREEN_HEIGHT / 12 * 6 });
        this.setState({ calendarContainerPadding: 15 });
        this.setState({ calendarContainerOpacity: SCREEN_WIDTH });
      }
    }
  };
  //CHANGING STATE SELECTED DATE BASED ON USER SELECTED DATE
  _onDateChange = date => {
    this.props.setSelectedDate(date);
  };

  render() {
    return (
      <View
        style={[
          styles.calendarContainer,
          {
            height: this.state.calendarContainerHeight,
            padding: this.state.calendarContainerPadding,
            opacity: this.state.calendarContainerOpacity
          }
        ]}
      >
        <CalendarPicker
          height={this.state.calendarHeight}
          width={this.state.calendarWidth}
          onDateChange={this._onDateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 0,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.white
  }
});

export default Calendar;
