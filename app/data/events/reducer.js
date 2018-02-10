import * as actionTypes from "../../constants/actionTypes";

const initialState = { events: [] };

const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCAL_ADD_EVENT:
      const localEvent = {
        id: action.event.id,
        key: action.event.id,
        title: action.event.title,
        patientName: action.event.patientName,
        duration: action.event.duration
      };

      return {
        ...state,
        events: state.events.concat(action.event)
      };
    default:
      return state;
  }
};

export default events;
