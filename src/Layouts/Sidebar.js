import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo

//Import Components
import VerticalLayout from "./VerticalLayouts/index";
import TwoColumnLayout from "./TwoColumnLayout";
import { Container } from "reactstrap";
import HorizontalLayout from "./HorizontalLayout";
// import FMILogoBlack from "src/assets/images/FM-Integrated-Log-Dark.png";
// import FMILogoLight from "src/assets/images/FM-Integrated-Log-White.png";

import FMILogoBlack from "src/assets/images/logo/logo-green.png";
import FMILogoLight from "src/assets/images/logo/logo-white.png";

const Sidebar = ({ layoutType }) => {
  if (!layoutType) layoutType = "Vertical";
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay");
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable");
      });
    }
  });

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (
      document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
    ) {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active",
      );
    } else if (
      document.documentElement.getAttribute("data-sidebar-size") ===
      "sm-hover-active"
    ) {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };
  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box ">
          <Link to="/dashboard" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img
                src={
                  JSON.parse(localStorage.getItem("domain")).logoUrl ||
                  FMILogoBlack
                }
                alt=""
                height="30"
              /> */}
              {JSON.parse(localStorage.getItem("domain")).shortCode || "FMI"}
            </span>
            <span className="logo-lg">
              <img
                src={
                  // JSON.parse(localStorage.getItem("domain")).logoUrl ||
                  FMILogoBlack
                }
                alt=""
                height="48"
              />
            </span>
          </Link>

          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-sm">
              {/* <img
                src={
                  JSON.parse(localStorage.getItem("domain")).logoUrl ||
                  FMILogoLight
                }
                alt=""
                height="30"
              /> */}
              { "FMI"}
            </span>
            <span className="logo-lg">
              <img
                src={
                  // JSON.parse(localStorage.getItem("domain")).logoUrl ||
                  FMILogoLight
                }
                alt=""
                height="48"
              />
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        {!layoutType && (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === "twocolumn" ? (
          <React.Fragment>
            <TwoColumnLayout />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
