//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";
export const RESET_PASSWORD_VALIDATE = "/auth/validateToken";
export const RESET_PASSWORD_DATA = "/auth/resetPassword";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

//Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";

// Ecommerce
// Product
export const GET_PRODUCTS = "/apps/product";
export const DELETE_PRODUCT = "/apps/product";
export const ADD_NEW_PRODUCT = "/apps/product";
export const UPDATE_PRODUCT = "/apps/product";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/apps/ticket";
export const ADD_NEW_TICKET = "/apps/ticket";
export const UPDATE_TICKET = "/apps/ticket";
export const DELETE_TICKET = "/apps/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

// kfm APIS

// Login
export const POST_LOGIN = "/auth";
export const POST_FORGOT_PASSWORD = "/auth/forgotPassword";
export const POST_CHECK_DOMAIN = "/tenant/check";
export const POST_CHANGE_LAYOUT = "/user/changeTheme";
export const GET_CHECK_TAGS = "/role/tags";
export const CHANGE_PASSWORD = "/user/changePassword";

// Client
export const POST_ADD_CLIENT = "/client";
export const GET_FETCH_CLIENTLIST = "/client";
export const GET_FETCH_CLIENT = "/client/details";
export const GET_FETCH_TENANTLIST = "/tenant";
export const POST_ADD_CLIENT_USER = "/client/user";
export const GET_FETCH_CLIENT_LIST = "/client/list";
export const IMPORT_CLIENT_USERS = "/client/users/importCsv";
export const CLIENT_USER_LIST = "/client/user/list";
export const GET_CLIENT_USER_DETAILS = `/client/user`;
export const UPDATE_CLIENT_USER_DETAILS = (id) => `/client/user?id=${id}`;

// Address
export const POST_FETCH_STATE = "/address/state";
export const POST_FETCH_CITY = "/address/province";
export const POST_FETCH_AREA = "/address/place";
export const POST_FETCH_ZIP = "/address/zip";
export const POST_FETCH_ADDRESS = "/address/zipaddress";

// Tenant
export const POST_ADD_TENANT = "/tenant";
export const POST_CHECK_DOMAIN_NAME = "/tenant/checkDomain";
export const GET_FETCH_TENANT = "/tenant/details/";
export const POST_ADD_TENENT_USER = "/tenant/user";
export const GET_FETCH_TENANT_LIST = "/tenant/list";

// Store
export const POST_ADD_STORE = "/store";
export const POST_ADD_STORE_USER = "/store/user";
export const GET_FETCH_STORE = "/store/details/";
export const GET_FETCH_STORELIST = "/store";
export const GET_FETCH_CORPORATELIST = "/tenant";
export const POST_FETCH_STORE_LIST = "/store/list";
export const IMPORT_STORES = "/store/importCsv";
export const IMPORT_STORE_USERS = "/store/users/importCsv";
export const STORE_USER_LIST = "/store/user/list";
export const GET_STORE_USER_DETAILS = `/store/user`;
export const UPDATE_STORE_USER_DETAILS = (id) => `/store/user?id=${id}`;

//Permissions
export const FETCH_PERMISSIONS = "/permissions/list";
export const POST_PERMISSIONS = "/permissions/setPermission/";
export const DELETE_PERMISSIONS = "/permissions/";

//Vendors
export const VENDOR = "/vendor";
export const GET_VENDORS_LIST = "/vendor/list";
export const GET_TRADES = "/vendor/trades";
export const VENDOR_FILE = "/vendor/contract/file";
export const VENDOR_USER_UPDATE = (id) => `/vendor/user?id=${id}`;
export const UPDATE_VENDOR = (id) => `/vendor?id=${id}`;
export const UPDATE_VENDOR_ADDRESS = (id) => `/vendor/address?id=${id}`;
export const UPDATE_VENDOR_TRADES = (id) => `/vendor/trades?id=${id}`;
export const UPDATE_VENDOR_W9 = (id) => `/vendor/w9?id=${id}`;
export const UPDATE_VENDOR_INSURANCE = (id) => `/vendor/insurance?id=${id}`;
export const UPDATE_VENDOR_CONTRACT = (id) => `/vendor/contract?id=${id}`;
export const VENDOR_DROPDOWN = "/vendor/dropdown";
export const VENDOR_W9_FILE = (id) => `/vendor/w9/file?id=${id}`;
export const VENDOR_INSURANCE_FILE = (id) => `/vendor/insurance/file?id=${id}`;
export const VENDOR_CONTRACT_FILE = (id) => `/vendor/contract/file?id=${id}`;
export const DELETE_VENDOR_W9_FILE = (id) => `/vendor/w9/file?url=${id}`;
export const DELETE_VENDOR_INSURANCE_FILE = (id) =>
  `/vendor/insurance/file?url=${id}`;
export const DELETE_VENDOR_CONTRACT_FILE = (id) =>
  `/vendor/contract/file?url=${id}`;

//Technician
export const TECHNICIAN = "/technician";
export const GET_TECHNICIAN_LIST = "/technician/list";
export const UPDATE_TECHNICIAN_DETAILS = (id) => `/technician/user?id=${id}`;
export const UPDATE_TECHNICIAN_ADDRESS = (id) => `/technician/address?id=${id}`;
export const UPDATE_TECHNICIAN_INFO = (id) => `/technician/info?id=${id}`;
export const GET_TECHNICIAN_DROPDOWN = "/technician/dropdown";

//work request / order
export const ADD_WORK_REQUEST = "/ticket/request";
export const WORK_REQUEST_LIST = "/ticket/request/list";
export const WORK_ORDER_LIST = "/ticket/order/list";
export const GET_RECALL_ID = "/ticket/order";
export const GET_RECALL_DETAILS = (id) => `/ticket/details?trackingId=${id}`;
export const GET_WORK_REQUEST_DETAILS = (id) =>
  `/ticket/details?trackingId=${id}`;
export const GET_PRIORITY_LIST = "/ticket/priority";
export const FILE_ADD = "/ticket/resource/upload";
export const DECLINE_WORK_REQUEST = "/ticket/request/reject";
export const ACCEPT_WORK_REQUEST = "/ticket/request/accept";
export const GET_ISSUE_DROPDOWN = (id) => `/vendor/trades/issues?tradeId=${id}`;

//Get client by tenant id
export const GET_CLIENT_LIST = (id) => `/client?tenantId=${id}`;

//Get store by client id
export const GET_STORE_LIST = (id) => `/store?clientId=${id}`;

//assign vendor
export const ASSIGN_VENDOR = "/ticket/order/assignVendor";

//get store work orders
export const GET_STORE_WORK_ORDERS = `/ticket/order/storeorders`;

//add work order trip
export const ADD_TRIP = "/ticket/trip";
export const GET_TRIP_LIST = "/ticket/trip/list";
export const GET_TRIP_DETAILS = "/ticket/trip/details";

//get trip list on the basis of ticket/Work order
export const GET_TRIPS = `/ticket/trip/ticketTripList`;

//trade issue
export const TRADE_ISSUE = "/vendor/trades/issues";
export const TRADE_ISSUE_LIST = "/vendor/trades/list";
export const GET_TRADE_DETAILS = "/vendor/trades/details";
export const UPDATE_TRADE_ISSUE = (id) => `/vendor/trades/issue?id=${id}`;
export const GET_TENANT_USER_LIST = "/tenant/user/list";
export const GET_TENANT_USER_DETAILS = (id) => `/tenant/user?id=${id}`;

//estimate
export const TICKET_ESTIMATE = `/ticket/estimate`;
export const ESTIMATE_LIST = "/ticket/estimate/list";
export const GET_ESTIMATE_DETAILS = `/ticket/estimate/details`;
export const GET_ESTIMATE_EXPENSE = "/ticket/estimate/formdata";

//invoice
export const GET_INVOICE_LIST = "/ticket/invoice/list";
export const GET_INVOICE_DETAILS = `/ticket/invoice/details`;
export const GET_INVOICE_EXPENSE = "/ticket/estimate/formdata";

//estimate handle
export const ESTIMATE_ACCEPT = "/ticket/estimate/approve";
export const ESTIMATE_DECLINE = "/ticket/estimate/reject";
export const ESTIMATE_REVISE = "/ticket/estimate/revise";
export const ESTIMATE_CANCEL = "/ticket/estimate/cancel";

//invoice
export const GENERATE_INVOICE = "/ticket/estimate/generateInvoice";
export const ADD_INVOICE = "/ticket/invoice";

//invoice handle
export const INVOICE_ACCEPT = "/ticket/invoice/approve";
export const INVOICE_DECLINE = "/ticket/invoice/reject";
export const INVOICE_REVISE = "/ticket/invoice/revise";
export const INVOICE_PAID = "/ticket/invoice/paid";

//expenses
export const EXPENSE_TYPE = "/ticket/expense/types";
export const EXPENSE_ADD = "/ticket/expense";
export const EXPENSE_LIST = "/ticket/expense/list";

//trip
export const GET_TRIPS_DROPDOWN = "/ticket/trip/dropdown";
export const CREATE_RETURN_TRIP = "/ticket/trip/returnTrip";

//draft
export const UPDATE_ESTIMATE_DRAFT = "/ticket/estimate";
export const UPDATE_INVOICE_DRAFT = "/ticket/invoice";

//notification-token
export const SAVE_NOTIFICATION_TOKEN = "/user/notification/save";
export const GET_NOTIFICATIONS = "/user/notification/list";

//dashboard
export const GET_ESTIMATE_COUNT = "/ticket/estimate/count";
export const GET_INVOICE_COUNT = "/ticket/invoice/count";
export const GET_COUNT = "/ticket/count";

//emergency tickets
export const GET_EMERGENCY_COUNT = "/ticket/emergencyCount";
export const GET_OVERDUE_COUNT = "/ticket/overdueCount";

export const GET_TRIP_COUNT = "/ticket/trip/count";
export const GET_STATE_COUNT = "/ticket/stateCount";
export const GET_STATUS_COUNT = "/vendor/statusCounts";
export const GET_INSURANCE_SUMMARY = "/vendor/insuranceSummary";
export const GET_VENDOR_KPI = "/vendor/kpi";
