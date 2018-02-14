import React, { Component } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import CustomFontText from "./CustomFontText";

class ListHeader extends Component {
  constructor() {
    super();
    this.state = {
      spinValue: new Animated.Value(0)
    };
  }

  //--------------------------------------------------
  // Animation on Props Change
  //--------------------------------------------------

  componentWillReceiveProps = nextProps => {
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        Animated.timing(this.state.spinValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear
        }).start();
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        Animated.timing(this.state.spinValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear
        }).start();
      }
    }
  };
  //--------------------------------------------------
  // Header State Handling
  //--------------------------------------------------

  _onPressHeader = () => {
    //SET LIST PURPOSE
    if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.props.setListPurpose("ShowAllDates");
    } else if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.props.setListPurpose("ShowSelectedDate");
    }
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    });

    return (
      <TouchableOpacity
        style={styles.animatedHeader}
        onPress={this._onPressHeader}
        activeOpacity={0.9}
      >
        <View style={styles.headerLeftSpacer} />
        <View style={styles.headerCenterSpacer}>
          <CustomFontText style={styles.headerText}>
            {this.props.listUI.listPurpose === "ShowAllDates"
              ? "All Events"
              : this.props.selectedDate.selectedDate.format("LL")}
          </CustomFontText>
        </View>
        <View style={styles.headerRightSpacer}>
          <Animated.View
            style={[
              styles.arrowIconContainer,
              { transform: [{ rotate: spin }] }
            ]}
          >
            <MaterialCommunityIcons
              style={styles.arrowIcon}
              name={"arrow-up"}
              size={35}
              color={COLORS.lightGreen}
              //onPress={this._onPressHeader}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  animatedHeader: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_HEIGHT / 12,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.red
  },
  headerCenterSpacer: {
    flex: 1
  },
  headerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 22
    //paddingTop: 10
  },
  headerLeftSpacer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 80
  },
  headerLeftSpacerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 25
  },
  headerRightSpacer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 80
    //paddingTop: 10
  },
  headerRightSpacerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 25
  },
  arrowIconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  arrowIcon: {}
});

export default ListHeader;
