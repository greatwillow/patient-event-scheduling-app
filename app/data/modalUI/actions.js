import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function setModalPurpose(modalPurpose) {
  return {
    type: actionTypes.SET_MODAL_PURPOSE,
    modalPurpose
  };
}

export function setFormModalVisibility(formModalVisibility) {
  return {
    type: actionTypes.SET_FORM_MODAL_VISIBILITY,
    formModalVisibility
  };
}

export function setLoadingModalVisibility(loadingModalVisibility) {
  return {
    type: actionTypes.SET_LOADING_MODAL_VISIBILITY,
    loadingModalVisibility
  };
}
