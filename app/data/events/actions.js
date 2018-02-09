import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

// export function requestEventAdd(event) {
//   return {
//     type: actionTypes.REQUEST_EVENT_ADD,
//     event
//   };
// }

export function requestEventAdd(event) {
  function thunk(dispatch) {
    // const eventTitle = event.eventTitle;
    // const eventPatientName = event.eventPatientName;
    // const eventDuration = event.eventDuration;

    const EVENT = {
      title: event.title,
      patientName: event.patientName,
      duration: event.duration
    };

    const EVENT_POST_URI = "http://localhost:3000/";

    fetch(EVENT_POST_URI, {
      //   headers: new Headers({
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   }),
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
  }
}

// export const requestEventAdd = event => dispatch => {
//   dispatch(requestEventAdd2(event));
// };
