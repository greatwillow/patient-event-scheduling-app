import * as actionTypes from "../../constants/actionTypes";

const initialState = {
  modalPurpose: "Add",
  modalVisibility: false
};

const modalUI = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_PURPOSE:
      return {
        ...state,
        modalPurpose: action.modalPurpose
      };
    case actionTypes.SET_MODAL_VISIBILITY:
      return {
        ...state,
        modalVisibility: action.modalVisibility
      };
    default:
      return state;
  }
};

export default modalUI;
