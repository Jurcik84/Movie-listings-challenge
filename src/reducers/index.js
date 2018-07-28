import { combineReducers } from "redux";

// IMPORT PARTIAL REDUCERS
import appData from "./dataReducer";
const reducers = {
  appData
};
export default combineReducers(reducers);
