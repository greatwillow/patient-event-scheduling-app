import {
  requestAddEvent,
  localAddEvent,
  requestGetEvent,
  localGetEvent,
  requestGetAllEvents,
  localGetAllEvents,
  requestUpdateEvent,
  localUpdateEvent,
  requestDeleteEvent,
  localDeleteEvent
} from "./events/actions";

import { setModalPurpose, setModalVisibility } from "./modalUI/actions";

import { setSelectedDate } from "./selectedDate/actions";

export {
  //Events
  requestAddEvent,
  localAddEvent,
  requestGetEvent,
  localGetEvent,
  requestGetAllEvents,
  localGetAllEvents,
  requestUpdateEvent,
  localUpdateEvent,
  requestDeleteEvent,
  localDeleteEvent,
  //Modal
  setModalPurpose,
  setModalVisibility,
  //Selected Date
  setSelectedDate
};
