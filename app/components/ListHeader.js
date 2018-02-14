import React, { Component } from "react";
import {
  LayoutAnimation,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomFontText from "./CustomFontText";

class ListHeader extends Component {
  constructor() {
    super();
    this.state = {
      headerText: ""
    };
  }

  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        headerText: "All Events"
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        headerText: "" + this.props.selectedDate.selectedDate.format("LL")
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          headerText: "All Events"
        });
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          headerText: "" + nextProps.selectedDate.selectedDate.format("LL")
        });
      }
    }
  };

  //--------------------------------------------------
  // Header State Handling
  //--------------------------------------------------

  _onPressHeader = () => {
    if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.props.setListPurpose("ShowAllDates");
    } else if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.props.setListPurpose("ShowSelectedDate");
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.animatedHeader}
        onPress={this._onPressHeader}
      >
        <View style={styles.headerLeftSpacer} />
        <CustomFontText style={styles.headerText}>
          {this.state.headerText}
        </CustomFontText>
        <View style={styles.headerRightSpacer}>
          <CustomFontText style={styles.headerRightSpacerText}>
            {this.state.headerRightSpacerText}
          </CustomFontText>
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
  headerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 22,
    paddingTop: 10
  },
  headerLeftSpacer: {
    alignItems: "center",
    justifyContent: "center",
    width: 20
  },
  headerLeftSpacerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 25
  },
  headerRightSpacer: {
    alignItems: "center",
    justifyContent: "center",
    width: 20
  },
  headerRightSpacerText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 25
  }
});

export default ListHeader;
