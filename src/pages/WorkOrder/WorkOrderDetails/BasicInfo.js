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
  const { store = {}, client = {} } = details;
  const { address = {}, contact = {} } = store;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Col>
        <Card style={{ height: "35em" }}>
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
                    Site Details
                  </NavLink>
                  <NavLink
                    to="#"
                    className={`p-2 ${
                      activeTab === "2"
                        ? "text-dark rounded-top p-3 bg-light"
                        : "text-dark p-3"
                    }`}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    Client Details
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
                      Name :{" "}
                      {store.storeName ? (
                        <h6 className="service_details_text">
                          {store.storeName}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Address:{" "}
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
                      Phone :{" "}
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
                      Ext :{" "}
                      {contact.ext ? (
                        <h6 className="service_details_text">{contact?.ext}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      E-mail :{" "}
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
                      Mall :{" "}
                      {store.mall ? (
                        <h6 className="service_details_text">{store?.mall}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                  </Row>
                </Form>
              </TabPane>

              <TabPane tabId="2">
                <Form>
                  <Row>
                    <p>
                      Name :{" "}
                      {client.name ? (
                        <h6 className="service_details_text">{client.name}</h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Phone :{" "}
                      {client?.contact?.primaryContactPhone ? (
                        <h6 className="service_details_text">
                          {client?.contact?.primaryContactPhone}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Website :{" "}
                      {client?.contact?.website ? (
                        <h6 className="service_details_text">
                          {client?.contact?.website}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      E-mail :{" "}
                      {client?.contact?.email ? (
                        <h6 className="service_details_text">
                          {client?.contact?.email}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Dial-In Number To Check-In/Out :{" "}
                      {client?.contact?.dialInNumber ? (
                        <h6 className="service_details_text">
                          {client?.contact?.dialInNumber}
                        </h6>
                      ) : (
                        <i className="text-danger">Empty</i>
                      )}
                    </p>
                    <hr></hr>
                    <p>
                      Instruction :{" "}
                      {client?.contact?.dialInInstruction ? (
                        <h6 className="service_details_text">
                          {client?.contact?.dialInInstruction}
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
