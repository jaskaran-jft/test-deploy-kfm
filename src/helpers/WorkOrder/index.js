import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

export const workOrderList = (data) => api.get(url.WORK_ORDER_LIST, data);
export const addWorkOrder = (data) => api.create(url.GET_RECALL_ID, data, true);
export const getTenantList = () => api.get(url.GET_FETCH_CORPORATELIST);
export const getClientList = (id) => api.get(url.GET_CLIENT_LIST(id));
export const getStoreList = (id) => api.get(url.GET_STORE_LIST(id));
export const assignVendor = (data) => api.create(url.ASSIGN_VENDOR, data);
export const getStoreWorkOrders = (data) =>
  api.get(url.GET_STORE_WORK_ORDERS, data);
export const addTrip = (data) => api.create(url.ADD_TRIP, data);
export const getTripList = (data) => api.get(url.GET_TRIP_LIST, data);
export const getTripDetails = (data) => api.get(url.GET_TRIP_DETAILS, data);
export const getStoreTrips = (data) => api.get(url.GET_TRIPS, data);
export const updateWorkOrder = (data) =>
  api.patch(url.GET_RECALL_ID, data, true);
export const saveEstimateDetails = (data) =>
  api.create(url.TICKET_ESTIMATE, data);
export const getEstimateList = (data) => api.get(url.ESTIMATE_LIST, data);
export const getEstimateDetails = (data) =>
  api.get(url.GET_ESTIMATE_DETAILS, data);
export const getInvoiceList = (data) => api.get(url.GET_INVOICE_LIST, data);
export const getInvoiceDetails = (data) =>
  api.get(url.GET_INVOICE_DETAILS, data);
export const acceptEstimate = (data) => api.create(url.ESTIMATE_ACCEPT, data);
export const declineEstimate = (data) => api.create(url.ESTIMATE_DECLINE, data);
export const updateEstimateDetails = (data) =>
  api.create(url.ESTIMATE_REVISE, data);
export const generateInvoice = (data) => api.create(url.GENERATE_INVOICE, data);
export const saveInvoiceDetails = (data) => api.create(url.ADD_INVOICE, data);
export const acceptInvoice = (data) => api.create(url.INVOICE_ACCEPT, data);
export const declineInvoice = (data) => api.create(url.INVOICE_DECLINE, data);
export const updateInvoiceDetails = (data) =>
  api.create(url.INVOICE_REVISE, data);
export const invoicePaid = (data) => api.create(url.INVOICE_PAID, data);
export const getExpenseType = (data) => api.get(url.EXPENSE_TYPE, data);
export const addExpense = (data) => api.create(url.EXPENSE_ADD, data, true);
export const getTripDropdown = (data) => api.get(url.GET_TRIPS_DROPDOWN, data);
export const getEstimateExpense = (data) =>
  api.get(url.GET_ESTIMATE_EXPENSE, data);
export const getInvoiceExpense = (data) =>
  api.get(url.GET_INVOICE_EXPENSE, data);
export const updateEstimateDraft = (data) =>
  api.patch(url.UPDATE_ESTIMATE_DRAFT, data);
export const updateInvoiceDraft = (data) =>
  api.patch(url.UPDATE_INVOICE_DRAFT, data);
export const getExpenseList = (data) => api.get(url.EXPENSE_LIST, data);
export const createReturnTrip = (data) =>
  api.create(url.CREATE_RETURN_TRIP, data);
export const cancelEstimate = (data) => api.create(url.ESTIMATE_CANCEL, data);
