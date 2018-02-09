import * as actionTypes from "../../constants/actionTypes";

const initialState = {};

const selectedEvent = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_EVENT:
      return {
        ...state
        //selectedDate: action.selectedDate
      };
    default:
      return state;
  }
};

export default selectedEvent;
