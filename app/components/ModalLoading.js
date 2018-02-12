import React, { Component } from "react";

import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import FormAddUpdateDeleteEvent from "./FormAddUpdateDeleteEvent";

class ModalLoading extends Component {
  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.loadingModalVisibility}
          onRequestClose={this._onRequestClose}
        >
          <TouchableOpacity style={styles.outerContainer}>
            <View>
              <Text>Loading</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingTop: SCREEN_HEIGHT / 12,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  }
});

export default ModalLoading;
