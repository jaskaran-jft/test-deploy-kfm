import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  SET_TAGS,
  SET_AUTH,
} from "./actionTypes";

const isJsonString = (str) => {
  try {
    if (str) {
      JSON.parse(str);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

const initialState = {
  error: "",
  loading: false,
  domain: isJsonString(localStorage.getItem("domain"))
    ? JSON.parse(localStorage.getItem("domain"))
    : {},
  userData: isJsonString(localStorage.getItem("authUser"))
    ? JSON.parse(localStorage.getItem("authUser"))
    : {},
  tags: isJsonString(localStorage.getItem("tags"))
    ? JSON.parse(localStorage.getItem("tags"))
    : [],
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        userData: action.payload,
        domain: action.payload.domain,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case API_ERROR:
      state = {
        ...state,
        error: action.payload.data,
        loading: false,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        error: null,
      };
      break;
    case SET_TAGS:
      state = {
        ...state,
        tags: action.payload.tags || [],
        // userData: action.payload.auth || {},
      };
      break;
    case SET_AUTH:
      state = {
        ...state,
        ...action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
