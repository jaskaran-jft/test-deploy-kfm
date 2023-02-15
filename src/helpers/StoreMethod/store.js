import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Store Methods
export const addStore = (data) => api.create(url.POST_ADD_STORE, data);
export const fetchStore = (data) => api.get(url.GET_FETCH_STORE, data);
export const fetchClientList = (data) =>
  api.get(url.GET_FETCH_CLIENTLIST, data);
export const addStoreUser = (data) => api.create(url.POST_ADD_STORE_USER, data);
export const fetchStoreList = (data) => api.get(url.GET_FETCH_STORELIST, data);
export const fetchCorporateList = (data) =>
  api.get(url.GET_FETCH_CORPORATELIST, data);
export const fetchAllStore = (data) =>
  api.create(url.POST_FETCH_STORE_LIST, data);
export const importStores = (data) => api.create(url.IMPORT_STORES, data);
export const importStoreUsers = (data) =>
  api.create(url.IMPORT_STORE_USERS, data);
export const importClientUsers = (data) =>
  api.create(url.IMPORT_CLIENT_USERS, data);
export const fetchStoreDropdown = () => api.get(url.POST_ADD_STORE);
export const getStoreUserList = (data) => api.get(url.STORE_USER_LIST, data);
export const getStoreUserDetails = (data) =>
  api.get(url.GET_STORE_USER_DETAILS, data);
export const updateStoreUserDetails = (data, id) =>
  api.patch(url.UPDATE_STORE_USER_DETAILS(id), data);
