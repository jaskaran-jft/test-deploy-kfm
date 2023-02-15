import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

export const getTradesList = () => api.get(url.GET_TRADES);
export const addVendor = (data) => api.create(url.VENDOR, data);
export const getVendorList = (data) => api.get(url.GET_VENDORS_LIST, data);
export const getVendorDetails = (data) => api.get(url.VENDOR, data);
export const uploadVendorFile = (data) => api.create(url.VENDOR_FILE, data);
export const deleteVendorFile = (data) => api.delete(url.VENDOR_FILE, data);
export const updateVendorUser = (data, id) =>
  api.patch(url.VENDOR_USER_UPDATE(id), data);
export const updateVendorInfo = (data, id) =>
  api.patch(url.UPDATE_VENDOR(id), data);
export const updateVendorAddress = (data, id) =>
  api.patch(url.UPDATE_VENDOR_ADDRESS(id), data);
export const updateVendorTrades = (data, id) =>
  api.patch(url.UPDATE_VENDOR_TRADES(id), data);
export const updateVendorW9 = (data, id) =>
  api.patch(url.UPDATE_VENDOR_W9(id), data);
export const updateVendorInsurance = (data, id) =>
  api.patch(url.UPDATE_VENDOR_INSURANCE(id), data);
export const updateVendorContract = (data, id) =>
  api.patch(url.UPDATE_VENDOR_CONTRACT(id), data);
export const getVendorDropdown = (data) => api.get(url.VENDOR_DROPDOWN, data);
export const updateVendorW9Files = (data, id) =>
  api.create(url.VENDOR_W9_FILE(id), data, true);
export const updateVendorInsuranceFiles = (data, id) =>
  api.create(url.VENDOR_INSURANCE_FILE(id), data, true);
export const updateVendorContractFiles = (data, id) =>
  api.create(url.VENDOR_CONTRACT_FILE(id), data, true);
export const deleteVendorW9Files = (id) =>
  api.delete(url.DELETE_VENDOR_W9_FILE(id));
export const deleteVendorInsuranceFiles = (id) =>
  api.delete(url.DELETE_VENDOR_INSURANCE_FILE(id));
export const deleteVendorContractFiles = (id) =>
  api.delete(url.DELETE_VENDOR_CONTRACT_FILE(id));
export const addTrade = (data) => api.create(url.GET_TRADES, data);
export const addTradeIssue = (data) => api.create(url.TRADE_ISSUE, data);
export const getTrades = (data) => api.get(url.TRADE_ISSUE_LIST, data);
export const updateTradeIssue = (data, id) =>
  api.patch(url.UPDATE_TRADE_ISSUE(id), data);
export const getTradeDetails = (data) => api.get(url.GET_TRADE_DETAILS, data);
