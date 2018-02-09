import * as actionTypes from "../../constants/actionTypes";
import moment from "moment";

const initialState = {
  selectedDate: moment()
};

const selectedDate = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate
      };
    default:
      return state;
  }
};

export default selectedDate;
