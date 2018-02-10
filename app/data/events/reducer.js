import * as actionTypes from "../../constants/actionTypes";

const initialState = { events: [] };

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCAL_ADD_EVENT:
      return {
        ...state,
        events: state.events.concat(action.event)
      };
    case actionTypes.LOCAL_DELETE_EVENT:
      const wantedIndex = state.events
        .map(event => event.id)
        .indexOf(action.event.id);
      return {
        ...state,
        events: state.events.filter((item, index) => index != wantedIndex)
      };
    default:
      return state;
  }
};

export default events;
