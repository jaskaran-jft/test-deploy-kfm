import React from "react";
import { Redirect } from "react-router-dom";
// import DashboardEcommerce from "../pages/DashboardEcommerce";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Landing from "src/pages/Landing";
import EstimateList from "src/pages/Estimate/EstimateList";
import InvoiceList from "src/pages/Invoice/InvoiceList";
import EstimateDetails from "src/pages/Estimate/EstimateDetails";
import RejectedWorkOrders from "src/pages/WorkRequest/WorkRequestList/RejectedWorkRequest";

//// Client Routes
const AddClient = React.lazy(() => import("../pages/AddClient/addClient"));
const AddCorporate = React.lazy(() => import("../pages/AddTenant/addTenant"));
const AddStore = React.lazy(() => import("../pages/AddStore/addStore"));
const AddUser = React.lazy(() => import("../pages/AddUser/addUser"));

// View Routes
const ViewClient = React.lazy(() => import("../pages/ViewClient/viewClient"));
const ViewCorporate = React.lazy(() =>
  import("../pages/ViewCorporate/viewCorporate"),
);
const ViewStore = React.lazy(() => import("../pages/ViewStore/viewStore"));

const Permissions = React.lazy(() =>
  import("../pages/Permissions/Permissions"),
);
const bulkAdd = React.lazy(() => import("../pages/AddStore/bulkAdd"));
const AddVendor = React.lazy(() => import("../pages/Vendor/AddVendor"));
const VendorDetails = React.lazy(() => import("../pages/Vendor/VendorDetails"));
const VendorList = React.lazy(() => import("../pages/Vendor/vendorList"));
const AddTechnician = React.lazy(() =>
  import("src/pages/Technician/AddTechnician"),
);
const TechnicianDetails = React.lazy(() =>
  import("src/pages/Technician/TechnicianDetails"),
);
const TechnicianList = React.lazy(() =>
  import("src/pages/Technician/TechnicianList"),
);
const BulkClientUser = React.lazy(() =>
  import("src/pages/AddUser/bulkClientUser"),
);
const BulkStoreUser = React.lazy(() =>
  import("src/pages/AddUser/bulkStoreUser"),
);
const AddWorkRequest = React.lazy(() =>
  import("src/pages/WorkRequest/AddWorkRequest"),
);
const WorkRequestList = React.lazy(() =>
  import("src/pages/WorkRequest/WorkRequestList"),
);
const WorkRequestDetails = React.lazy(() =>
  import("src/pages/WorkRequest/WorkRequestDetails"),
);
const AddWorkOrder = React.lazy(() =>
  import("src/pages/WorkOrder/AddWorkOrder"),
);
const WorkOrderDetails = React.lazy(() =>
  import("src/pages/WorkOrder/WorkOrderDetails"),
);
const WorkOrderList = React.lazy(() =>
  import("src/pages/WorkOrder/WorkOrderList"),
);
const StoreUserList = React.lazy(() =>
  import("src/pages/StoreUsers/StoreUsersList"),
);
const ClientUserList = React.lazy(() =>
  import("src/pages/ClientUsers/ClientUserList"),
);
const StoreUserDetails = React.lazy(() =>
  import("src/pages/StoreUsers/StoreUserDetails"),
);
const ClientUserDetails = React.lazy(() =>
  import("src/pages/ClientUsers/ClientUserDetails"),
);
const TripList = React.lazy(() => import("src/pages/Trip/TripList"));
const AddTrade = React.lazy(() => import("src/pages/Trades/AddTrade"));
const TradeList = React.lazy(() => import("src/pages/Trades/TradesList"));
const TripDetails = React.lazy(() => import("src/pages/Trip/TripDetails"));
const AddIssue = React.lazy(() => import("src/pages/Trades/AddIssue"));
const TradeDetails = React.lazy(() => import("src/pages/Trades/TradeDetails"));
const CorporateUserList = React.lazy(() =>
  import("src/pages/CorporateUsers/CorporateUserList"),
);
const CorporateUserDetails = React.lazy(() =>
  import("src/pages/CorporateUsers/CorporateUserDetails"),
);
const ResetPassword = React.lazy(() =>
  import("src/pages/Authentication/ResetPassword"),
);
const Invalid = React.lazy(() => import("src/pages/PageNotFound/Invalid"));

const authProtectedRoutes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    tag: "Create_Client",
  },
  ////kfm routes
  {
    path: "/addClient",
    exact: true,
    component: AddClient,
    tag: "Create_Client",
  },
  {
    path: "/editClient/:id",
    exact: true,
    component: AddClient,
    tag: "Create_Client",
  },
  {
    path: "/addCorporate",
    exact: true,
    component: AddCorporate,
    tag: "Create_Tenant",
  },
  {
    path: "/editCorporate/:id",
    exact: true,
    component: AddCorporate,
    tag: "Create_Tenant",
  },
  { path: "/addStore", exact: true, component: AddStore, tag: "Create_Store" },

  {
    path: "/editStore/:id",
    exact: true,
    component: AddStore,
    tag: "Create_Store",
  },
  {
    path: "/addClientUser",
    exact: true,
    component: AddUser,
    data: "Client",
    tag: "Create_Client_User",
  },
  {
    path: "/addCorporateUser",
    exact: true,
    component: AddUser,
    data: "Corporate",
    tag: "Create_Tenant_User",
  },
  {
    path: "/addStoreUser",
    exact: true,
    component: AddUser,
    data: "Store",
    tag: "Create_Store_User",
  },
  //list of users
  {
    path: "/storeUserList",
    exact: true,
    component: StoreUserList,
    tag: "Store_User_List",
  },
  {
    path: "/storeUserDetails/:id",
    exact: true,
    component: StoreUserDetails,
    tag: "Store_User_Details",
  },

  {
    path: "/clientUserList",
    exact: true,
    component: ClientUserList,
    tag: "Client_User_List",
  },
  {
    path: "/clientUserDetails/:id",
    exact: true,
    component: ClientUserDetails,
    tag: "Client_User_Detail",
  },

  //corporate user
  {
    path: "/corporateUserList",
    exact: true,
    component: CorporateUserList,
    tag: "Tenant_User_List",
  },
  {
    path: "/tenantUserDetails/:id",
    exact: true,
    component: CorporateUserDetails,
    tag: "Tenant_User_Details",
  },

  //bulk upload
  {
    path: "/importClientUser",
    exact: true,
    component: BulkClientUser,
    data: "Store",
    tag: "Create_Client_User",
  },
  {
    path: "/importStoreUser",
    exact: true,
    component: BulkStoreUser,
    data: "Store",
    tag: "Create_Store_User",
  },
  //bulk upload end
  {
    path: "/viewClient",
    exact: true,
    component: ViewClient,
    tag: "Get_Client_List",
  },
  {
    path: "/viewCorporate",
    exact: true,
    component: ViewCorporate,
    tag: "Get_Tenant_List",
  },
  {
    path: "/viewStore",
    exact: true,
    component: ViewStore,
    tag: "Get_Store_List",
  },

  //Vendor
  {
    path: "/addVendor",
    exact: true,
    component: AddVendor,
    tag: "Create_Vendor",
  },
  {
    path: "/vendorDetail/:id",
    exact: true,
    component: VendorDetails,
    tag: "Vendor_Details",
  },
  {
    path: "/vendorList",
    exact: true,
    component: VendorList,
    tag: "Vendor_List",
  },
  //Technician
  {
    path: "/addTechnician",
    exact: true,
    component: AddTechnician,
    tag: "Create_Technician",
  },
  {
    path: "/technicianDetail/:id",
    exact: true,
    component: TechnicianDetails,
    tag: "Technician_Details",
  },
  {
    path: "/technicianList",
    exact: true,
    component: TechnicianList,
    tag: "Technician_List",
  },

  //Work Request
  {
    path: "/addWorkRequest",
    exact: true,
    component: AddWorkRequest,
    tag: "Create_Service_Request",
  },
  {
    path: "/workRequestDetails/:id",
    exact: true,
    component: WorkRequestDetails,
    tag: "Service_Request_List",
  },
  {
    path: "/workRequestList",
    exact: true,
    component: WorkRequestList,
    tag: "Service_Request_List",
  },
  {
    path: "/workRequestList/:status",
    exact: true,
    component: WorkRequestList,
    tag: "Service_Request_List",
  },
  {
    path: "/pendingWorkRequest",
    exact: true,
    component: RejectedWorkOrders,
    tag: "Service_Request_List",
  },

  //Work order
  {
    path: "/addWorkOrder",
    exact: true,
    component: AddWorkOrder,
    tag: "Create_Workorder",
  },
  {
    path: "/workOrderDetails/:id",
    exact: true,
    component: WorkOrderDetails,
    tag: "Workorder_List",
  },
  {
    path: "/workOrderList",
    exact: true,
    component: WorkOrderList,
    tag: "Workorder_List",
  },
  {
    path: "/workOrderList/:status",
    exact: true,
    component: WorkOrderList,
    tag: "Workorder_List",
  },

  //trip list
  {
    path: "/tripList",
    exact: true,
    component: TripList,
    tag: "Trip_List",
  },
  {
    path: "/tripDetails/:id",
    exact: true,
    component: TripDetails,
    tag: "Trip_List",
  },

  //trades
  {
    path: "/addTrade",
    exact: true,
    component: AddTrade,
    tag: "Create_Trades",
  },
  {
    path: "/addIssue",
    exact: true,
    component: AddIssue,
    tag: "Create_Trades_Issue",
  },
  {
    path: "/tradeList",
    exact: true,
    component: TradeList,
    tag: "Trade_Issue_List",
  },
  {
    path: "/tradeDetails/:id",
    exact: true,
    component: TradeDetails,
    tag: "Trades_Details",
  },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

  {
    path: "/permissions",
    exact: true,
    data: "Permissions",
    component: Permissions,
    tag: "Permissions_List",
  },
  {
    path: "/importStores",
    exact: true,
    data: "Stores",
    component: bulkAdd,
    tag: "Create_Store",
  },

  //accounting
  {
    path: "/estimateList",
    exact: true,
    component: EstimateList,
    tag: "Estimate_List",
  },
  {
    path: "/estimateDetails/:id",
    exact: true,
    component: EstimateDetails,
    tag: "Estimate_List",
  },
  {
    path: "/invoiceList",
    exact: true,
    component: InvoiceList,
    tag: "Estimate_List",
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/home", component: Landing },
  { path: "/login", component: CoverSignIn },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/resetPassword", component: ResetPassword },
  { path: "/invalidLink", component: Invalid, data: "Invalid" },
];

export { authProtectedRoutes, publicRoutes };
