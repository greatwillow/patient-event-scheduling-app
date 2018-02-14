import React, { Component } from "react";
import {
  FlatList,
  LayoutAnimation,
  Text,
  StyleSheet,
  View
} from "react-native";
import moment from "moment";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants/dimensions";
import { COLORS } from "../constants/colors";

import ButtonAddUpdateDeleteEvent from "./ButtonAddUpdateDeleteEvent";
import ModalGeneric from "./ModalGeneric";
import ListEventItem from "./ListEventItem";
import ModalLoading from "../components/ModalLoading";

class ListOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      listHeight: SCREEN_HEIGHT / 12 * 5
    };
  }
  componentDidMount = () => {
    if (this.props.listUI.listPurpose === "ShowAllDates") {
      this.setState({
        listHeight: SCREEN_HEIGHT / 12 * 11
      });
    } else if (this.props.listUI.listPurpose === "ShowSelectedDate") {
      this.setState({
        listHeight: SCREEN_HEIGHT / 12 * 5
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.listUI.listPurpose !== nextProps.listUI.listPurpose) {
      if (nextProps.listUI.listPurpose === "ShowAllDates") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          listHeight: SCREEN_HEIGHT / 12 * 11
        });
      } else if (nextProps.listUI.listPurpose === "ShowSelectedDate") {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          listHeight: SCREEN_HEIGHT / 12 * 5
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

  render() {
    let eventsToShow;
    if (this.props.listUI.listPurpose === "ShowAllEvents") {
      eventsToShow = this.props.events.events;
    } else {
      eventsToShow = this._determineEventsToShow();
    }

    return (
      <View>
        <View
          style={[styles.eventListContainer, { height: this.state.listHeight }]}
        >
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventListContainer: {
    flex: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 12 * 5,
    alignItems: "center",
    backgroundColor: COLORS.red,
    paddingTop: 5
  },
  addButton: {
    position: "absolute",
    bottom: 3,
    right: 5,
    opacity: 0.9
  }
});

export default ListOfEvents;
