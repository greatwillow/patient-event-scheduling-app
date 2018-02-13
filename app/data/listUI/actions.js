import * as actionTypes from "../../constants/actionTypes";
import * as actions from "../appActions";

export function setListPurpose(listPurpose) {
  return {
    type: actionTypes.SET_LIST_PURPOSE,
    listPurpose
  };
}
