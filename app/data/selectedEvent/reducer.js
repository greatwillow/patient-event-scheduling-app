import * as actionTypes from "../../constants/actionTypes";

const initialState = { id: null };

const selectedEvent = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_EVENT:
      return {
        ...state,
        id: action.selectedEvent.id
      };
    default:
      return state;
  }
};

export default selectedEvent;
