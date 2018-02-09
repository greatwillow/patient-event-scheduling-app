import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import ButtonAddEvent from "./ButtonAddEvent";
import ModalGeneric from "./ModalGeneric";

class EventList extends Component {
  render() {
    return (
      <View style={styles.eventListContainer}>
        <ButtonAddEvent {...this.props} />
        <ModalGeneric {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    backgroundColor: COLORS.white,
    padding: 30,
    marginTop: 30
  }
});

export default EventList;
