import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import configReducer from "./app/configSlice";
const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
});

export default rootReducer;
