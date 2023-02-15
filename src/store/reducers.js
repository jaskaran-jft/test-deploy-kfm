import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import DashboardEcommerce from "./dashboardEcommerce/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  ForgetPassword,
  Profile,
  DashboardEcommerce,
});

export default rootReducer;
