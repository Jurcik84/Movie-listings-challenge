import { combineReducers } from "redux";

// IMPORT PARTIAL REDUCERS
import appData from "./dataReducer";
import filterReducer from "./filterReducer";
const reducers = {
  appData,
  filterReducer
};
export default combineReducers(reducers);
