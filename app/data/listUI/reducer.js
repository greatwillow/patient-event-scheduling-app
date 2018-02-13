import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  listPurpose: "ShowSelectedDate"
};

const listUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LIST_PURPOSE:
      return {
        ...state,
        listPurpose: action.listPurpose
      };
    default:
      return state;
  }
};

export default listUI;
