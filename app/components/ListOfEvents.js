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
      sliderText: "<",
      headerBackgroundColor: COLORS.red
    };
  }

  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        headerLeftText: "",
        headerRightText: "Events for All Dates",
        sliderText: ">"
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        headerLeftText:
          "Events for: " + this.props.selectedDate.selectedDate.format("LL"),
        headerRightText: "",
        sliderText: "<"
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          headerLeftWidth: 0,
          headerLeftText: "",
          headerRightText: "Events for All Dates",
          sliderText: "<",
          headerBackgroundColor: COLORS.red
        });
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          headerLeftWidth: SCREEN_WIDTH / 6 * 5,
          headerLeftText:
            "Events for: " + nextProps.selectedDate.selectedDate.format("LL"),
          headerRightText: "",
          sliderText: ">",
          headerBackgroundColor: COLORS.red
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
  // Slider Handling
  //--------------------------------------------------

  _onPressSlider = () => {
    if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.props.setListPurpose("ShowAllDates");
    } else if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.props.setListPurpose("ShowSelectedDate");
    }
  };

  render() {
    const eventsToShow = this._determineEventsToShow();

    return (
      <View style={styles.eventListContainer}>
        <View style={styles.animatedHeader}>
          <View
            style={[styles.headerLeft, { width: this.state.headerLeftWidth }]}
          >
            <CustomFontText style={styles.headerLeftText}>
              {this.state.headerLeftText}
            </CustomFontText>
          </View>
          <TouchableOpacity
            style={[
              styles.slider,
              { backgroundColor: this.state.headerBackgroundColor }
            ]}
            onPress={this._onPressSlider}
          >
            <CustomFontText style={styles.sliderText}>
              {this.state.sliderText}
            </CustomFontText>
          </TouchableOpacity>
          <View
            style={[
              styles.headerRight,
              {
                width:
                  SCREEN_WIDTH - this.state.headerLeftWidth - SCREEN_WIDTH / 6
              }
            ]}
          >
            <CustomFontText style={styles.headerRightText}>
              {this.state.headerRightText}
            </CustomFontText>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: SCREEN_WIDTH
  },
  headerLeft: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 6 * 4,
    backgroundColor: COLORS.red
  },
  headerRight: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 6 * 2,
    backgroundColor: COLORS.red
  },
  slider: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH / 6
  },
  headerLeftText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    padding: 10
  },
  headerRightText: {
    textAlign: "center",
    color: COLORS.darkGreen,
    fontSize: 20,
    padding: 10
  },
  sliderText: {
    textAlign: "center",
    color: COLORS.darkGreen,
    fontSize: 35,
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
