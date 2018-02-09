import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function setModalPurpose(modalPurpose) {
  return {
    type: actionTypes.SET_MODAL_PURPOSE,
    modalPurpose
  };
}

export function setModalVisibility(modalVisibility) {
  return {
    type: actionTypes.SET_MODAL_VISIBILITY,
    modalVisibility
  };
}
