import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const login = (data) => api.create(url.POST_LOGIN, data);

export const forgotPassword = (data) =>
  api.create(url.POST_FORGOT_PASSWORD, data);

export const domainCheck = (data) => api.create(url.POST_CHECK_DOMAIN, data);
export const changeUserLayout = (data) =>
  api.create(url.POST_CHANGE_LAYOUT, data);
export const fetchTags = () => api.get(url.GET_CHECK_TAGS);
export const changePassword = (data) => api.create(url.CHANGE_PASSWORD, data);
export const validatePasswordToken = (data) =>
  api.create(url.RESET_PASSWORD_VALIDATE, data);
export const resetPasswordData = (data) =>
  api.create(url.RESET_PASSWORD_DATA, data);
export const saveNotificationToken = (data) =>
  api.patch(url.SAVE_NOTIFICATION_TOKEN, data);
export const getNotifications = (data) => api.get(url.GET_NOTIFICATIONS, data);
