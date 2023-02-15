import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

export const addWorkRequest = (data) =>
  api.create(url.ADD_WORK_REQUEST, data, true);
export const workRequestList = (data) => api.get(url.WORK_REQUEST_LIST, data);
export const getRecallId = () => api.get(url.GET_RECALL_ID);
export const getRecallDetails = (id) => api.get(url.GET_RECALL_DETAILS(id));
export const getWorkRequestDetails = (id) =>
  api.get(url.GET_WORK_REQUEST_DETAILS(id));
export const getPriorityList = () => api.get(url.GET_PRIORITY_LIST);
export const updateWorkRequest = (data) =>
  api.patch(url.ADD_WORK_REQUEST, data, true);
export const addFiles = (data) => api.create(url.FILE_ADD, data, true);
export const declineWorkRequest = (data) =>
  api.create(url.DECLINE_WORK_REQUEST, data);
export const acceptWorkRequest = (data) =>
  api.create(url.ACCEPT_WORK_REQUEST, data, true);
export const getIssueList = (id) => api.get(url.GET_ISSUE_DROPDOWN(id));
