import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TagsContext } from "../Routes";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";

const Navdata = () => {
  const history = useHistory();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isTechnician, setIsTechnician] = useState(false);

  //trip
  const [isTrip, setIsTrip] = useState(false);
  const [isAccounting, setIsAccounting] = useState(false);
  //trade
  const [isTrade, setIsTrade] = useState(false);

  //work Request
  const [isWorkRequest, setIsWorkRequest] = useState(false);
  const [isWorkOrder, setIsWorkOrder] = useState(false);

  //notifications
  const [isNotifications, setIsNotifications] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  const { tags } = useContext(TagsContext);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }
  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history.push("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
    if (iscurrentState !== "Vendor") {
      setIsVendor(false);
    }
    if (iscurrentState !== "Technician") {
      setIsTechnician(false);
    }

    if (iscurrentState !== "workRequest") {
      setIsWorkRequest(false);
    }

    if (iscurrentState !== "workOrder") {
      setIsWorkOrder(false);
    }

    if (iscurrentState !== "Trips") {
      setIsTrip(false);
    }

    if (iscurrentState !== "Trade") {
      setIsTrade(false);
    }

    if (iscurrentState !== "Accounting") {
      setIsAccounting(false);
    }

    if (iscurrentState !== "Accounting") {
      setIsNotifications(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
    isVendor,
    isTechnician,
    isWorkRequest,
    isWorkOrder,
    isTrip,
    isTrade,
    isAccounting,
    isNotifications,
  ]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "workOrder",
      label: "Work Orders",
      icon: "ri-store-3-fill",
      link: "/#",
      stateVariables: isWorkOrder,
      click: function (e) {
        e.preventDefault();
        setIsWorkOrder(!isWorkOrder);
        setIscurrentState("workOrder");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "addWorkRequest",
          label: "Add Service Request",
          link: "/addWorkRequest",
          parentId: "workRequest",
          tag: "Create_Service_Request",
        },
        {
          id: "workRequestList",
          label: "Pending Work Orders",
          link: "/workRequestList",
          parentId: "workRequest",
          tag: "Service_Request_List",
        },
        {
          id: "pendingWorkRequest",
          label: "Rejected Work Orders",
          link: "/pendingWorkRequest",
          parentId: "workRequest",
          tag: "Service_Request_List",
        },
        {
          id: "workOrderList",
          label: "Work Orders",
          link: "/workOrderList",
          parentId: "workOrder",
          tag: "Workorder_List",
        },
      ],
    },

    {
      id: "corporates",
      label: "Corporates",
      icon: "ri-building-2-fill",
      tag: "Get_Tenant_List",
      link: "/viewCorporate",
      stateVariables: isLanding,
      click: function (e) {
        e.preventDefault();
        setIsLanding(!isLanding);
        setIscurrentState("Landing");
        updateIconSidebar(e);
      },
    },
    {
      id: "Brands",
      label: "Brands",
      icon: "ri-user-2-fill",
      link: "/viewClient",
      tag: "Get_Client_List",

      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "stores",
      label: "Sites",
      icon: "ri-store-fill",
      tag: "Get_Store_List",
      link: "/viewStore",
      stateVariables: isForms,
      click: function (e) {
        e.preventDefault();
        setIsForms(!isForms);
        setIscurrentState("Forms");
        updateIconSidebar(e);
      },
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-user-6-line",
      link: "/#",
      stateVariables: isPages,
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "tenantUserList",
          label: "Corporate Users",
          link: "/corporateUserList",
          parentId: "user",
          tag: "Tenant_User_List",
        },
        {
          id: "clientUserList",
          label: "Brand Users",
          link: "/clientUserList",
          parentId: "user",
          tag: "Client_User_List",
        },
        {
          id: "storeUserList",
          label: "Site Users",
          link: "/storeUserList",
          parentId: "user",
          tag: "Store_User_List",
        },
      ],
    },
    {
      id: "Accounting",
      label: "Accounting",
      icon: "ri-money-dollar-box-line",
      link: "/#",
      stateVariables: isAccounting,
      click: function (e) {
        e.preventDefault();
        setIsAccounting(!isAccounting);
        setIscurrentState("Accounting");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "estimateList",
          label: "Estimates",
          link: "/estimateList",
          parentId: "Accounting",
          tag: "Estimate_List",
        },
        {
          id: "invoiceList",
          label: "Invoices",
          link: "/invoiceList",
          parentId: "Accounting",
          tag: "Estimate_List",
        },
      ],
    },
    {
      id: "Trips",
      label: "Trips",
      icon: "ri-map-pin-user-line",
      link: "/tripList",
      stateVariables: isTrip,
      tag: "Trip_List",
      click: function (e) {
        e.preventDefault();
        setIsTrip(!isTrip);
        setIscurrentState("Trips");
        updateIconSidebar(e);
      },
    },
    {
      id: "Trade",
      label: "Trades",
      icon: "ri-tools-line",
      link: "/tradeList",
      tag: "Trade_Issue_List",
      stateVariables: isTrade,
      click: function (e) {
        e.preventDefault();
        setIsTrade(!isTrade);
        setIscurrentState("Trade");
        updateIconSidebar(e);
      },
    },
    {
      id: "Vendor",
      label: tags.includes(CONSTANT.VENDOR_LIST) ? "Vendors" : "Technicians",
      icon: "ri-team-fill",
      link: tags.includes(CONSTANT.TECHNICIAN_LIST)
        ? "/technicianList"
        : "/vendorList",
      stateVariables: isVendor,
      tag: tags.includes(CONSTANT.VENDOR_LIST)
        ? "Vendor_List"
        : "Technician_List",
      click: function (e) {
        e.preventDefault();
        setIsVendor(!isVendor);
        setIscurrentState("Vendor");
        updateIconSidebar(e);
      },
      subItems:
        tags.includes(CONSTANT.TECHNICIAN_LIST) &&
        tags.includes(CONSTANT.VENDOR_LIST)
          ? [
              {
                id: "listVendor",
                label: "Vendors",
                link: "/vendorList",
                parentId: "Vendor",
                tag: "Vendor_List",
              },
              {
                id: "technicianList",
                label: "Technicians",
                link: "/technicianList",
                parentId: "Vendor",
                tag: "Technician_List",
              },
            ]
          : undefined,
    },
    {
      id: "permissions",
      label: "Permissions",
      icon: "ri-list-settings-line",
      link: "/permissions",
      tag: "Permissions_List",
    },
  ];
  menuItems.forEach((item) => {
    let show = false;
    if (item.isHeader) item.show = true;
    item.subItems &&
      item.subItems.length > 0 &&
      item.subItems.forEach((subitem) => {
        if (subitem.isChildItem) {
          subitem.childItems &&
            subitem.childItems.forEach((children) => {
              if (tags.indexOf(children.tag) !== -1) {
                children.show = true;
                show = true;
              }
            });
          if (show) subitem.show = true;
        }
        if (tags.indexOf(subitem.tag) !== -1) {
          show = true;
          subitem.show = true;
        }
      });
    if (show) item.show = true;
    if (tags.indexOf(item.tag) !== -1) {
      item.show = true;
    }
  });
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
