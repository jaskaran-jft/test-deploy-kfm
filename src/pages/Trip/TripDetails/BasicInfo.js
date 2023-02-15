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

const Info = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const { details = {} } = props;
  const { ticket = {} } = details;
  const { store = {} } = ticket;
  const { contact = {}, address = {}, user = [{}] } = store;

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
                    Ticket Details
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
                      Id :{" "}
                      {details.trackingId ? (
                        <h6 className="service_details_text">
                          {details.trackingId}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Location:{" "}
                      {address ? (
                        <h6 className="service_details_text">
                          {(address?.streetAddress1 || "") +
                            " " +
                            (address?.place || "") +
                            " " +
                            (address?.state || "") +
                            ", " +
                            (address?.zipCode || "")}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Site Manager :{" "}
                      {user.length > 0 ? (
                        <h6 className="service_details_text">
                          {user[0].firstName || ""} {user[0].lastName || ""}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Site Phone :{" "}
                      {contact.primaryContactPhone ? (
                        <h6 className="service_details_text">
                          {contact?.primaryContactPhone}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Site E-Mail :{" "}
                      {contact.primaryContactEmail ? (
                        <h6 className="service_details_text">
                          {contact?.primaryContactEmail}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Description :{" "}
                      {ticket.description ? (
                        <h6
                          className="service_details_text"
                          dangerouslySetInnerHTML={{
                            __html: ticket.description,
                          }}
                        />
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      HVAC/Lights :{" "}
                      {details.lights ? (
                        <span
                          style={{ fontSize: 18 }}
                          className="mdi mdi-check"
                        ></span>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      HVAC/Lights Note :{" "}
                      {details.lightsNote ? (
                        <h6 className="service_details_text">
                          {details.lightsNote}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Security Required :{" "}
                      {details.securityRequired ? (
                        <span
                          style={{ fontSize: 18 }}
                          className="mdi mdi-check"
                        ></span>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Security Note :{" "}
                      {details.securityNote ? (
                        <h6 className="service_details_text">
                          {details.securityNote}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      EMERGENCY Request :{" "}
                      {details.emergency ? (
                        <span
                          style={{ fontSize: 18 }}
                          className="mdi mdi-check"
                        ></span>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      EMERGENCY Note :{" "}
                      {details.emergencyNote ? (
                        <h6 className="service_details_text">
                          {details.emergencyNote}
                        </h6>
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

export default Info;
