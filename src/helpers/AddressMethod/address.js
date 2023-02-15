import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Client Methods
export const fetchStateList = (data) => api.create(url.POST_FETCH_STATE, data);
export const fetchCityList = (data) => api.create(url.POST_FETCH_CITY, data);
export const fetchAreaList = (data) => api.create(url.POST_FETCH_AREA, data);
export const fetchZipCode = (data) => api.create(url.POST_FETCH_ZIP, data);
export const fetchAddress = (data) => api.create(url.POST_FETCH_ADDRESS, data);
