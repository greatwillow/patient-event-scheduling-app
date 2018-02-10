import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import * as actions from "../data/appActions";

import { connect } from "react-redux";

import Calendar from "../components/Calendar";
import ListOfEvents from "../components/ListOfEvents";

class Root extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Calendar {...this.props} />
        <ListOfEvents {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.red
  }
});

const mapStateToProps = state => ({
  modalUI: state.modalUI,
  selectedDate: state.selectedDate,
  selectedEvent: state.selectedEvent,
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  requestAddEvent: event => dispatch(actions.requestAddEvent(event)),
  localAddEvent: event => dispatch(actions.localAddEvent(event)),
  requestGetEvent: event => dispatch(actions.requestGetEvent(event)),
  localGetEvent: event => dispatch(actions.localGetEvent(event)),
  requestGetAllEvents: () => dispatch(actions.requestGetAllEvents()),
  localGetAllEvents: () => dispatch(actions.localGetAllEvents()),
  requestUpdateEvent: event => dispatch(actions.requestUpdateEvent(event)),
  requestDeleteEvent: event => dispatch(actions.requestDeleteEvent(event)),
  localDeleteEvent: event => dispatch(actions.localDeleteEvent(event)),
  setModalPurpose: modalPurpose =>
    dispatch(actions.setModalPurpose(modalPurpose)),
  setModalVisibility: modalVisibility =>
    dispatch(actions.setModalVisibility(modalVisibility)),
  setSelectedDate: selectedDate =>
    dispatch(actions.setSelectedDate(selectedDate)),
  setSelectedEvent: selectedEvent =>
    dispatch(actions.setSelectedEvent(selectedEvent))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
