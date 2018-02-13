import React, { Component } from "react";

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import FormAddUpdateDeleteEvent from "./FormAddUpdateDeleteEvent";

class ModalGeneric extends Component {
  //BACK BUTTON CLOSES MODAL
  _onRequestClose = () => {
    this.props.setFormModalVisibility(false);
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.formModalVisibility}
          transparent={true}
          onRequestClose={this._onRequestClose}
        >
          <TouchableOpacity
            onPressOut={this._onRequestClose}
            style={styles.outerContainer}
          >
            <FormAddUpdateDeleteEvent {...this.props} />
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
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  }
});

export default ModalGeneric;
