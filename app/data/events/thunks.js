import * as actions from "../appActions";

const BASE_URI = "https://warm-plateau-57879.herokuapp.com/"; //"http://localhost:3000"

//--------------------------------------------------
// ADD EVENT
//--------------------------------------------------

const requestAddEventThunk = event => dispatch => {
  const EVENT = {
    title: event.title,
    patientName: event.patientName,
    duration: event.duration,
    eventStartDate: event.eventStartDate,
    eventEndDate: event.eventEndDate
  };

  const POST_EVENT_URI = BASE_URI;

  return fetch(POST_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST",
    body: JSON.stringify(EVENT)
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.localAddEvent(data));
      dispatch(actions.setLoadingModalVisibility(false));
    })
    .catch(err => {
      console.err("Error Posting Event: ", err);
    });
};

//--------------------------------------------------
// GET EVENT
//--------------------------------------------------

const requestGetEventThunk = event => dispatch => {
  const EVENT = {
    id: event.id
  };

  const GET_EVENT_URI = `${BASE_URI}${event.id}`;

  return fetch(GET_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "GET"
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.setLoadingModalVisibility(false));
    })
    .catch(err => {
      console.err("Error while getting event: ", err);
    });
};

//--------------------------------------------------
// GET ALL EVENTs
//--------------------------------------------------

const requestGetAllEventsThunk = event => dispatch => {
  const GET_ALL_EVENTS_URI = BASE_URI;

  return fetch(GET_ALL_EVENTS_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "GET"
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      data.map(e => dispatch(actions.localAddEvent(e)));
      dispatch(actions.setLoadingModalVisibility(false));
    })
    .catch(err => {
      console.err("Error while getting all events: ", err);
    });
};

//--------------------------------------------------
// UPDATE EVENT
//--------------------------------------------------

const requestUpdateEventThunk = event => dispatch => {
  const EVENT = {
    id: event.id,
    title: event.title,
    patientName: event.patientName,
    duration: event.duration,
    eventStartDate: event.eventStartDate,
    eventEndDate: event.eventEndDate
  };

  const UPDATE_EVENT_URI = `${BASE_URI}${event.id}`;

  return fetch(UPDATE_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "PUT",
    body: JSON.stringify(EVENT)
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.localDeleteEvent(data));
      dispatch(actions.localAddEvent(data));
      dispatch(actions.setLoadingModalVisibility(false));
    })
    .catch(err => {
      console.err("Error while updating event:  ", err);
    });
};

//--------------------------------------------------
// DELETE EVENT
//--------------------------------------------------

const requestDeleteEventThunk = event => dispatch => {
  const DELETE_EVENT_URI = `${BASE_URI}${event.id}`;

  return fetch(DELETE_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "DELETE"
  })
    .then(res => {
      if (res.status == 200) {
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      dispatch(actions.localDeleteEvent(event));
      dispatch(actions.setLoadingModalVisibility(false));
    })
    .catch(err => {
      console.err("Error while deleting event: ", err);
    });
};

export {
  requestAddEventThunk,
  requestGetEventThunk,
  requestGetAllEventsThunk,
  requestUpdateEventThunk,
  requestDeleteEventThunk
};
