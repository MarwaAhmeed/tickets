import { combineReducers } from "redux";
import authReducer from "./auth";
import admin from "./admin";
import customer from "./customer"
import tickets from "./tickets"
export default combineReducers({
    auth:authReducer,
    admin:admin,
    customer:customer,
    tickets:tickets
});
