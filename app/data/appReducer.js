import { combineReducers } from "redux";

import modalUI from "./modalUI/reducer";
import selectedDate from "./selectedDate/reducer";
import selectedEvent from "./selectedEvent/reducer";
import events from "./events/reducer";

const appReducer = combineReducers({
  modalUI: modalUI,
  selectedDate: selectedDate,
  selectedEvent: selectedEvent,
  events: events
});

export default appReducer;
