import { combineReducers } from "redux";
import headerReducer from "./headerReducer";
import mainContainerReducer from "./mainContainerReducer";
import eachJobReducer from "./eachJobReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  headerReducer,
  mainContainerReducer,
  eachJobReducer,
  searchReducer,
});
