import {
  requestAddEvent,
  localAddEvent,
  requestGetEvent,
  localGetEvent,
  requestGetAllEvents,
  localGetAllEvents,
  requestUpdateEvent,
  requestDeleteEvent,
  localDeleteEvent
} from "./events/actions";

import {
  setModalPurpose,
  setFormModalVisibility,
  setLoadingModalVisibility
} from "./modalUI/actions";

import { setSelectedDate } from "./selectedDate/actions";

import { setSelectedEvent } from "./selectedEvent/actions";

export {
  //Events
  requestAddEvent,
  localAddEvent,
  requestGetEvent,
  localGetEvent,
  requestGetAllEvents,
  localGetAllEvents,
  requestUpdateEvent,
  requestDeleteEvent,
  localDeleteEvent,
  //Modal
  setModalPurpose,
  setFormModalVisibility,
  setLoadingModalVisibility,
  //Selected Date
  setSelectedDate,
  //Selected Event
  setSelectedEvent
};
