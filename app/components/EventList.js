import React, { Component } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ButtonAddEvent from "./ButtonAddEvent";
import ModalGeneric from "./ModalGeneric";
import ButtonGeneric from "./ButtonGeneric";

class EventList extends Component {
  _onPressRequestGetAllEvents = () => {
    this.props.requestGetAllEvents();
  };
  _keyExtractor = (item, index) => item.id;

  render() {
    _onPressDisplayAddForm = () => {
      this.props.setModalVisibility(true);
    };
    return (
      <View style={styles.eventListContainer}>
        <ButtonGeneric
          text="Get Events"
          onPress={this._onPressRequestGetAllEvents}
          {...this.props}
        />
        <FlatList
          data={this.props.events.events}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text>Event Title: {item.title}</Text>
                <Text>Patient Name: {item.patientName}</Text>
                <Text>Event Start Date: {item.title}</Text>
              </View>
            );
          }}
        />

        <ModalGeneric {...this.props} />
        <ButtonAddEvent style={styles.addButton} {...this.props} />
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
  },
  listItem: {
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 12,
    borderWidth: 1,
    borderColor: COLORS.darkGreen,
    borderRadius: 10,
    padding: 20,
    margin: 10
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});

export default EventList;
