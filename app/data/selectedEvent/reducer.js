import * as actionTypes from "../../constants/actionTypes";
import moment from "moment";

const initialState = { id: null };

const selectedEvent = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_EVENT:
      const dateStart = moment(action.selectedEvent.eventStartDate);
      const dateEnd = moment(action.selectedEvent.eventEndDate);
      const calculatedDuration = dateEnd.diff(dateStart, "days") + 1;

      return {
        ...state,
        id: action.selectedEvent.id,
        title: action.selectedEvent.title,
        patientName: action.selectedEvent.patientName,
        eventStartDate: action.selectedEvent.eventStartDate,
        eventEndDate: action.selectedEvent.eventEndDate,
        duration: calculatedDuration
      };
    default:
      return state;
  }
};

export default selectedEvent;
