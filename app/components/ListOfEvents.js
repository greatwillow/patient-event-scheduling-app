import React, { Component } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ButtonAddUpdateDeleteEvent from "./ButtonAddUpdateDeleteEvent";
import ModalGeneric from "./ModalGeneric";
import ButtonGeneric from "./ButtonGeneric";
import CustomFontText from "./CustomFontText";
import ListEventItem from "./ListEventItem";

class ListOfEvents extends Component {
  _keyExtractor = (item, index) => item.id;

  _onPressDisplayAddModal = () => {
    this.props.setModalPurpose("Add");
    this.props.setModalVisibility(true);
  };

  _determineEventsToShow = () => {
    const selectedDate = this.props.selectedDate.selectedDate.format(
      "YYYY-MM-DD"
    );

    const eventsToShow = this.props.events.events.filter(event => {
      const eventStartDate = event.eventStartDate.substring(0, 10);
      const momentizedEventStartDate = moment(eventStartDate);
      const momentizedSelectedDate = moment(selectedDate);
      //const eventEndDate = event.eventEndDate.substr(0, 10);
      let showEvent = false;
      if (momentizedEventStartDate.date() == momentizedSelectedDate.date()) {
        showEvent = true;
      }
      return showEvent;
    });
    console.log("EVENTS TO SHOW ", eventsToShow);
    return eventsToShow;
  };

  render() {
    const eventsToShow = this._determineEventsToShow();

    return (
      <View style={styles.eventListContainer}>
        <CustomFontText style={styles.containerTitleText}>
          Events for: {this.props.selectedDate.selectedDate.format("LL")}
        </CustomFontText>
        <FlatList
          data={eventsToShow}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return <ListEventItem item={item} {...this.props} />;
          }}
        />

        <ModalGeneric {...this.props} />
        <ButtonAddUpdateDeleteEvent
          style={styles.addButton}
          purpose={"Add"}
          size={70}
          color={COLORS.lightGreen}
          onPress={this._onPressDisplayAddModal}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    alignItems: "center",
    backgroundColor: COLORS.red,
    paddingTop: 5
  },
  containerTitleText: {
    color: "white",
    fontSize: 22,
    padding: 10
  },
  addButton: {
    position: "absolute",
    bottom: 3,
    right: 5,
    opacity: 0.9
  }
});

export default ListOfEvents;
