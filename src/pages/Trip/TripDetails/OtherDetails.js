import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

const OtherDetails = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const { details = {} } = props;
  const { vendor = {} } = details;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Col>
        <Card style={{ height: "56em" }}>
          <CardHeader>
            <Row>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0 p-2"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    className={`p-2 ${
                      activeTab === "1"
                        ? "text-dark rounded-top p-3 bg-light"
                        : "text-dark p-3"
                    }`}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    Trip Details
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>
          </CardHeader>
          <CardBody className="p-4 bg-light" style={{ overflowY: "hidden" }}>
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                <Form>
                  <Row>
                    <p>
                      Service Requested :{" "}
                      {details.serviceRequested ? (
                        <h6 className="service_details_text">
                          {details.serviceRequested}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Additional Instructions :{" "}
                      {details.additionalInformation ? (
                        <h6 className="service_details_text">
                          {details.additionalInformation}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      No. Of Technicians :{" "}
                      {details.technicianCount ? (
                        <h6 className="service_details_text">
                          {details?.technicianCount}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Vendor :{" "}
                      {vendor.businessName ? (
                        <h6 className="service_details_text">
                          {vendor?.businessName}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Date & Time ETA :{" "}
                      {details.date ? (
                        <h6 className="service_details_text">
                          {new Date(details.date).toLocaleDateString()}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Status :{" "}
                      {details.status ? (
                        <h6 className="service_details_text">
                          {details.status}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>

                    <hr></hr>
                    <p>
                      Cancellation Reason :{" "}
                      {details.cancellationReason ? (
                        <h6 className="service_details_text">
                          {details?.cancellationReason}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Return Trip Reason :{" "}
                      {details.returnTripReason ? (
                        <h6 className="service_details_text">
                          {details?.returnTripReason}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Check In :{" "}
                      {details.checkInTime ? (
                        <h6 className="service_details_text">
                          {new Date(details?.checkInTime).toLocaleTimeString()}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Check Out :{" "}
                      {details.checkOutTime ? (
                        <h6 className="service_details_text">
                          {new Date(details?.checkOutTime).toLocaleTimeString()}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Night Work :{" "}
                      {details.nightWork ? (
                        <span
                          style={{ fontSize: 18 }}
                          className="mdi mdi-check"
                        ></span>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                  </Row>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default OtherDetails;
