import React, { Component } from "react";

import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../data/appActions";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import FormAddUpdateDeleteEvent from "./FormAddUpdateDeleteEvent";

class ModalLoading extends Component {
  _onRequestClose = () => {
    this.props.setLoadingModalVisibility(true);
  };
  render() {
    return (
      <View>
        <Modal
          visible={this.props.modalUI.loadingModalVisibility}
          transparent={true}
          onRequestClose={this._onRequestClose}
        >
          <TouchableOpacity style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <ActivityIndicator
                animating={true}
                size="large"
                color={COLORS.red}
              />
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
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  innerContainer: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default ModalLoading;
