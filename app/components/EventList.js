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
          renderItem={({ item }) => {
            return <Text>{item.title}</Text>;
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
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});

export default EventList;
