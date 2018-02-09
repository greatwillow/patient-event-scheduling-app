import * as actionTypes from "../../constants/actionTypes";

export function setSelectedDate(selectedDate) {
  return {
    type: actionTypes.SET_SELECTED_DATE,
    selectedDate
  };
}
