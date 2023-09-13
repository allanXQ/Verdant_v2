import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import configReducer from "./app/configSlice";
import appDataSlice from "./app/appDataSlice";

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  appData: appDataSlice,
});

export default rootReducer;
