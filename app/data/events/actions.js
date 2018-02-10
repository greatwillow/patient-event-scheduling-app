import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

import {
  requestAddEventThunk,
  requestGetEventThunk,
  requestGetAllEventsThunk,
  requestUpdateEventThunk,
  requestDeleteEventThunk
} from "./thunks";

//--------------------------------------------------
// ADD EVENT
//--------------------------------------------------
export const requestAddEvent = event => dispatch => {
  dispatch(requestAddEventThunk(event));
};

export function localAddEvent(event) {
  return {
    type: actionTypes.LOCAL_ADD_EVENT,
    event
  };
}

//--------------------------------------------------
// GET EVENT
//--------------------------------------------------
export const requestGetEvent = event => dispatch => {
  dispatch(requestGetEventThunk(event));
};

export function localGetEvent(event) {
  return {
    type: actionTypes.LOCAL_GET_EVENT,
    event
  };
}

//--------------------------------------------------
// GET ALL EVENTs
//--------------------------------------------------
export const requestGetAllEvents = () => dispatch => {
  dispatch(requestGetAllEventsThunk());
};

export function localGetAllEvents() {
  return {
    type: actionTypes.LOCAL_GET_ALL_EVENTS
  };
}

//--------------------------------------------------
// UPDATE EVENT
//--------------------------------------------------
export const requestUpdateEvent = event => dispatch => {
  dispatch(requestUpdateEventThunk(event));
};

export function localUpdateEvent(event) {
  return {
    type: actionTypes.LOCAL_UPDATE_EVENT,
    event
  };
}

//--------------------------------------------------
// DELETE EVENT
//--------------------------------------------------
export const requestDeleteEvent = event => dispatch => {
  dispatch(requestDeleteEventThunk(event));
};

export function localDeleteEvent(event) {
  return {
    type: actionTypes.LOCAL_DELETE_EVENT,
    event
  };
}
