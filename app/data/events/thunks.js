import * as actions from "../appActions";

const BASE_URI = "https://warm-plateau-57879.herokuapp.com/";

//--------------------------------------------------
// ADD EVENT
//--------------------------------------------------

const requestAddEventThunk = event => dispatch => {
  const EVENT = {
    title: event.title,
    patientName: event.patientName,
    duration: event.duration
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
        console.log("SUCCESSFULL 200 RESPONSE ", res);
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("DATA IS ", data);
      dispatch(actions.localAddEvent(data));
    })
    .catch(err => {
      console.log("CATCH ERROR IS ", err);
    });
};

//--------------------------------------------------
// GET EVENT
//--------------------------------------------------

const requestGetEventThunk = event => dispatch => {
  const EVENT = {
    id: event.id
  };

  const ADD_EVENT_URI = `${BASE_URI}:${event.id}`;

  return fetch(ADD_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "GET",
    body: JSON.stringify(EVENT)
  })
    .then(res => {
      if (res.status == 200) {
        console.log("SUCCESSFULL 200 RESPONSE ", res);
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("Heres the get data ", data);
    })
    .catch(err => {
      console.log("CATCH ERROR IS ", err);
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
        console.log("SUCCESSFULL 200 RESPONSE ", res);
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("Heres the get data ", data);
    })
    .catch(err => {
      console.log("CATCH ERROR IS ", err);
    });
};

//--------------------------------------------------
// UPDATE EVENT
//--------------------------------------------------

const requestUpdateEventThunk = event => dispatch => {
  const EVENT = {
    id: event.id
  };

  const UPDATE_EVENT_URI = `${BASE_URI}:${event.id}`;

  return fetch(UPDATE_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST",
    body: JSON.stringify(EVENT)
  })
    .then(res => {
      if (res.status == 200) {
        console.log("SUCCESSFULL 200 RESPONSE ", res);
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("Heres the data ", data);
    })
    .catch(err => {
      console.log("CATCH ERROR IS ", err);
    });
};

//--------------------------------------------------
// DELETE EVENT
//--------------------------------------------------

const requestDeleteEventThunk = event => dispatch => {
  const EVENT = {
    id: event.id
  };

  const DELETE_EVENT_URI = `${BASE_URI}:${event.id}`;

  return fetch(DELETE_EVENT_URI, {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST",
    body: JSON.stringify(EVENT)
  })
    .then(res => {
      if (res.status == 200) {
        console.log("SUCCESSFULL 200 RESPONSE ", res);
        return res.json();
      } else {
        throw new Error("Something wrong with the server!");
      }
    })
    .then(data => {
      console.log("Heres the data ", data);
    })
    .catch(err => {
      console.log("CATCH ERROR IS ", err);
    });
};

export {
  requestAddEventThunk,
  requestGetEventThunk,
  requestGetAllEventsThunk,
  requestUpdateEventThunk,
  requestDeleteEventThunk
};
