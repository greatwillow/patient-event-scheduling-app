import React, { Component } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import FormAddOrUpdateEvent from "./FormAddOrUpdateEvent";

class ModalStructure extends Component {
  _onRequestClose = () => {
    this.props.setModalVisibility(false);
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.modalVisibility}
          onRequestClose={this._onRequestClose}
        >
          <TouchableHighlight
            onPressOut={this._onRequestClose}
            style={styles.outerContainer}
          >
            {/* <KeyboardAvoidingView behavior="padding"> */}
            <TouchableWithoutFeedback style={styles.innerContainer}>
              <FormAddOrUpdateEvent {...this.props} />
            </TouchableWithoutFeedback>
            {/* </KeyboardAvoidingView> */}
          </TouchableHighlight>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  innerContainer: {
    flex: 1,
    borderRadius: 10,
    margin: 150,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 6 * 5,
    height: SCREEN_HEIGHT / 3,
    padding: 15,
    backgroundColor: COLORS.red
  }
});

export default ModalStructure;
