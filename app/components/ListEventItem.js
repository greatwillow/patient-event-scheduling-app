import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import ButtonAddUpdateDeleteEvent from "./ButtonAddUpdateDeleteEvent";
import CustomFontText from "./CustomFontText";

class ListEventItem extends Component {
  _onPressDisplayUpdateModal = () => {
    this.props.setSelectedEvent(this.props.item);
    this.props.setModalPurpose("Update");
    this.props.setModalVisibility(true);
  };

  _onPressDisplayDeleteModal = () => {
    this.props.setSelectedEvent(this.props.item);
    this.props.setModalPurpose("Delete");
    this.props.setModalVisibility(true);
  };
  render() {
    return (
      <View style={styles.listItem}>
        <CustomFontText style={styles.listText}>
          Event Title: {this.props.item.title}
        </CustomFontText>
        <CustomFontText style={styles.listText}>
          Patient Name: {this.props.item.patientName}
        </CustomFontText>
        <CustomFontText style={styles.listText}>
          Event Start Date: {this.props.item.title}
        </CustomFontText>
        <ButtonAddUpdateDeleteEvent
          {...this.props}
          style={styles.updateButton}
          size={25}
          color={COLORS.darkGreen}
          purpose={"Update"}
          onPress={this._onPressDisplayUpdateModal}
        />
        <ButtonAddUpdateDeleteEvent
          {...this.props}
          style={styles.deleteButton}
          size={25}
          color={COLORS.darkGreen}
          purpose={"Delete"}
          onPress={this._onPressDisplayDeleteModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: SCREEN_WIDTH,
    borderTopWidth: 2,
    borderColor: COLORS.lightGreen,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 5,
    paddingLeft: 80,
    marginTop: 5,
    marginBottom: 5
  },
  listText: {
    color: "black",
    fontSize: 18,
    padding: 4
  },
  updateButton: {
    position: "absolute",
    top: 20,
    left: 20
  },
  deleteButton: {
    position: "absolute",
    bottom: 20,
    left: 20
  }
});

export default ListEventItem;
