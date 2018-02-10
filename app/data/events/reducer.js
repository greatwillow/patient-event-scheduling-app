import * as actionTypes from "../../constants/actionTypes";

const initialState = { events: [] };

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCAL_ADD_EVENT:
      return {
        ...state,
        events: state.events.concat(action.event)
      };
    default:
      return state;
  }
};

export default events;
