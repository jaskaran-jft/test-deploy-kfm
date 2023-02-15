import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

export const getEstimateCount = (data) => api.get(url.GET_ESTIMATE_COUNT, data);
export const getInvoiceCount = (data) => api.get(url.GET_INVOICE_COUNT, data);
export const getTripCount = (data) => api.get(url.GET_TRIP_COUNT, data);
export const getCount = (data) => api.get(url.GET_COUNT, data);
export const getStateCount = (data) => api.get(url.GET_STATE_COUNT, data);
export const getStatusCount = (data) => api.get(url.GET_STATUS_COUNT, data);
export const getInsuranceSummary = (data) =>
  api.get(url.GET_INSURANCE_SUMMARY, data);
export const getVendorKpi = (data) => api.get(url.GET_VENDOR_KPI, data);
export const getEmergencyCount = (data) =>
  api.get(url.GET_EMERGENCY_COUNT, data);
export const getOverdueCount = (data) => api.get(url.GET_OVERDUE_COUNT, data);
