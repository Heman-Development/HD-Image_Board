import { combineReducers } from "redux";
import postReducer from "./postReducer";
import auth from "./auth";

export default combineReducers({
  postReducer,
  auth,
});
