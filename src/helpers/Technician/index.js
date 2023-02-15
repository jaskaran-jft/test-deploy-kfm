import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

export const addTechnician = (data) => api.create(url.TECHNICIAN, data);
export const getTechnicianList = (data) =>
  api.get(url.GET_TECHNICIAN_LIST, data);
export const getTechnicianDetails = (data) => api.get(url.TECHNICIAN, data);
export const updateTechnicianDetails = (data, id) =>
  api.patch(url.UPDATE_TECHNICIAN_DETAILS(id), data);
export const updateTechnicianInfo = (data, id) =>
  api.patch(url.UPDATE_TECHNICIAN_INFO(id), data);
export const updateTechnicianAddress = (data, id) =>
  api.patch(url.UPDATE_TECHNICIAN_ADDRESS(id), data);
export const getTechnicianDropdown = (data) =>
  api.get(url.GET_TECHNICIAN_DROPDOWN, data);
