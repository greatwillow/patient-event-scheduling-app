import * as actionTypes from "../../constants/actionTypes";

export function setSelectedEvent(selectedEvent) {
  return {
    type: actionTypes.SET_SELECTED_EVENT,
    selectedEvent
  };
}
