import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  modalPurpose: "Add",
  formModalVisibility: false,
  loadingModalVisibility: false
};

const modalUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_PURPOSE:
      return {
        ...state,
        modalPurpose: action.modalPurpose
      };
    case actionTypes.SET_FORM_MODAL_VISIBILITY:
      return {
        ...state,
        formModalVisibility: action.formModalVisibility
      };
    case actionTypes.SET_LOADING_MODAL_VISIBILITY:
      return {
        ...state,
        loadingModalVisibility: action.loadingModalVisibility
      };
    default:
      return state;
  }
};

export default modalUI;
