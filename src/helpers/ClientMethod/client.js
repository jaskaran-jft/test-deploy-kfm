import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Client Methods
export const addClient = (data) => api.create(url.POST_ADD_CLIENT, data);
export const addClientUser = (data) =>
  api.create(url.POST_ADD_CLIENT_USER, data);
export const fetchClient = (data) => api.get(url.GET_FETCH_CLIENT, data);
export const fetchTenantList = () => api.get(url.GET_FETCH_TENANTLIST);
export const fetchClientList = (data) =>
  api.create(url.GET_FETCH_CLIENT_LIST, data);
export const getClientUserList = (data) => api.get(url.CLIENT_USER_LIST, data);
export const getClientUserDetails = (data) =>
  api.get(url.GET_CLIENT_USER_DETAILS, data);
export const updateClientUserDetails = (data, id) =>
  api.patch(url.UPDATE_CLIENT_USER_DETAILS(id), data);
