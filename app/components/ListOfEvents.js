import React, { Component } from "react";
import {
  FlatList,
  LayoutAnimation,
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
import ModalLoading from "../components/ModalLoading";

class ListOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      headerLeftWidth: SCREEN_WIDTH / 6 * 5,
      headerLeftText: "",
      headerRightText: "",
      headerLeftFontSize: 20,
      headerRightFontSize: 20
    };
  }

  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        headerLeftText: ">",
        headerLeftFontSize: 30,
        headerRightText: "Events for All Dates",
        headerRightFontSize: 20
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        headerLeftText:
          "Events for: " + this.props.selectedDate.selectedDate.format("LL"),
        headerLeftFontSize: 20,
        headerRightText: "<",
        headerRightFontSize: 30
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    console.log("LIST PURPOSE IS ", this.props.listUI);
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
          headerLeftWidth: SCREEN_WIDTH / 6,
          headerLeftText: ">",
          headerRightText: "Events for All Dates"
        });
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
          headerLeftWidth: SCREEN_WIDTH / 6 * 5,
          headerLeftText:
            "Events for: " + nextProps.selectedDate.selectedDate.format("LL"),
          headerRightText: "<"
        });
      }
    }
  };

  //--------------------------------------------------
  // Setting ID as the key for FlatList
  //--------------------------------------------------

  _keyExtractor = (item, index) => item.id;

  //--------------------------------------------------
  // Modal Display Setup
  //--------------------------------------------------

  _onPressDisplayAddModal = () => {
    this.props.setModalPurpose("Add");
    this.props.setFormModalVisibility(true);
  };

  //--------------------------------------------------
  // Which events to show based on the selected date
  //--------------------------------------------------

  _determineEventsToShow = () => {
    const selectedDate = this.props.selectedDate.selectedDate.format(
      "YYYY-MM-DD"
    );

    //FILTER OUT EVENTS THAT ARE ONLY ON SELECTED DATE
    const eventsToShow = this.props.events.events.filter(event => {
      const eventStartDate = event.eventStartDate.substring(0, 10);
      const eventEndDate = event.eventEndDate.substring(0, 10);
      const momentizedEventStartDate = moment(eventStartDate);
      const momentizedEventEndDate = moment(eventEndDate);
      const momentizedSelectedDate = moment(selectedDate);

      //DEFAULT CONDITION
      let showEvent = false;
      //CHECKING IF SELECTED DATE IS BETWEEN START AND END DATES
      if (
        momentizedSelectedDate.date() >= momentizedEventStartDate.date() &&
        momentizedSelectedDate.date() <= momentizedEventEndDate.date()
      ) {
        showEvent = true;
      }
      return showEvent;
    });
    console.log("EVENTS TO SHOW ", eventsToShow);
    return eventsToShow;
  };

  //--------------------------------------------------
  // Header Animation Handling
  //--------------------------------------------------

  _onPressHeaderLeft = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.props.setListPurpose("ShowSelectedDate");
    }
  };

  _onPressHeaderRight = () => {
    if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.props.setListPurpose("ShowAllDates");
    }
  };

  render() {
    const eventsToShow = this._determineEventsToShow();

    return (
      <View style={styles.eventListContainer}>
        <View style={styles.animatedHeader}>
          <TouchableOpacity
            style={[styles.headerLeft, { width: this.state.headerLeftWidth }]}
            onPress={this._onPressHeaderLeft}
          >
            <CustomFontText
              style={[
                styles.headerLeftText,
                { fontSize: this.state.headerLeftFontSize }
              ]}
            >
              {this.state.headerLeftText}
            </CustomFontText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.headerRight,
              { width: SCREEN_WIDTH - this.state.headerLeftWidth }
            ]}
            onPress={this._onPressHeaderRight}
          >
            <CustomFontText
              style={[
                styles.headerRightText,
                { fontSize: this.state.headerLeftFontSize }
              ]}
            >
              {this.state.headerRightText}
            </CustomFontText>
          </TouchableOpacity>
        </View>
        <FlatList
          data={eventsToShow}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => {
            return <ListEventItem item={item} {...this.props} />;
          }}
        />

        <ModalGeneric {...this.props} />
        <ModalLoading {...this.props} />

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
  animatedHeader: {
    flexDirection: "row",
    height: 40,
    width: SCREEN_WIDTH
  },
  headerLeft: {
    width: SCREEN_WIDTH / 6 * 4,
    backgroundColor: COLORS.red
  },
  headerRight: {
    width: SCREEN_WIDTH / 6 * 2,
    backgroundColor: COLORS.white
  },
  headerLeftText: {
    color: "white",
    padding: 10
  },
  headerRightText: {
    color: "white",
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
