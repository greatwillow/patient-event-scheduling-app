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
import CustomFontText from "./CustomFontText";

class EventList extends Component {
  componentDidMount = () => {
    this.props.requestGetAllEvents();
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    _onPressDisplayAddForm = () => {
      this.props.setModalVisibility(true);
    };
    return (
      <View style={styles.eventListContainer}>
        <CustomFontText style={styles.containerTitleText}>
          Events for: {this.props.selectedDate.selectedDate.format("LL")}
        </CustomFontText>
        <FlatList
          data={this.props.events.events}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <CustomFontText style={styles.listText}>
                  Event Title: {item.title}
                </CustomFontText>
                <CustomFontText style={styles.listText}>
                  Patient Name: {item.patientName}
                </CustomFontText>
                <CustomFontText style={styles.listText}>
                  Event Start Date: {item.title}
                </CustomFontText>
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
    alignItems: "center",
    backgroundColor: COLORS.red,
    paddingTop: 5
  },
  containerTitleText: {
    color: "white",
    fontSize: 22,
    padding: 10
  },
  listItem: {
    width: SCREEN_WIDTH,
    borderTopWidth: 2,
    borderColor: COLORS.lightGreen,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 5,
    paddingLeft: 20,
    marginTop: 5,
    marginBottom: 5
  },
  listText: {
    color: "black",
    fontSize: 18,
    padding: 4
  },
  addButton: {
    position: "absolute",
    bottom: 3,
    right: 5,
    opacity: 0.8
  }
});

export default EventList;
