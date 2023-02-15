import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import SimpleBar from "simplebar-react";

const NotificationDropdown = (props) => {
  //Dropdown Toggle
  const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdown(!isNotificationDropdown);
  };

  //Tab
  const [activeTab, setActiveTab] = useState("2");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isNotificationDropdown}
        toggle={toggleNotificationDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-bell fs-22"></i>
          <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
            1<span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="dropdown-head bg-primary bg-pattern rounded-top">
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0 fs-16 fw-semibold text-white">
                    {" "}
                    Notifications{" "}
                  </h6>
                </Col>
                <div className="col-auto dropdown-tabs">
                  <span className="badge badge-soft-light fs-13"> 4 New</span>
                </div>
              </Row>
            </div>

            <div className="px-2 pt-2">
              <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Messages
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="2" className="py-2 ps-2">
              <SimpleBar style={{ maxHeight: "300px" }} className="pe-2">
                <div className="text-reset notification-item d-block dropdown-item">
                  <div className="d-flex">
                    <img
                      src={avatar3}
                      className="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="flex-1">
                      <Link to="#" className="stretched-link">
                        <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                          James Levi
                        </h6>
                      </Link>
                      <div className="fs-13 text-muted">
                        <p className="mb-1">
                          We talked about a project on linkedin.
                        </p>
                      </div>
                      <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                        <span>
                          <i className="mdi mdi-clock-outline"></i> 30 min ago
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-3 text-center">
                  <button
                    type="button"
                    onClick={() => props.history.push("/notifications")}
                    className="btn btn-soft-success waves-effect waves-light"
                  >
                    View All Messages{" "}
                    <i className="ri-arrow-right-line align-middle"></i>
                  </button>
                </div>
              </SimpleBar>
            </TabPane>
          </TabContent>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(NotificationDropdown);
