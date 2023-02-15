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
import OrdersList from "./OrdersList";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import AddEstimate from "./AddEstimate";
import AddTrips from "./AddTrips";
import AddVendor from "./AddVendor";
import AddInvoice from "./AddInvoice";
import AddExpense from "./AddExpense";

const WOTableData = (props) => {
  const { tags = [] } = useSelector((state) => state.Login);
  const [activeTab, setActiveTab] = useState(
    tags.includes(CONSTANT.WORK_ORDER_ASSIGN_VENDOR)
      ? "1"
      : tags.includes(CONSTANT.TRIPS_LIST)
      ? "2"
      : tags.includes(CONSTANT.SHOW_WORK_ORDERS)
      ? "3"
      : tags.includes(CONSTANT.CREATE_ESTIMATE)
      ? "5"
      : "4",
  );

  const { details = {} } = props;
  const { store = {} } = details;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Col>
        <Card style={{ height: "auto" }}>
          <CardHeader>
            <Row>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0 p-2"
                role="tablist"
              >
                <NavItem>
                  {tags.includes(CONSTANT.WORK_ORDER_ASSIGN_VENDOR) && (
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
                      Manage Vendor
                    </NavLink>
                  )}
                  {tags.includes(CONSTANT.TRIPS_LIST) && (
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
                      Trips
                    </NavLink>
                  )}
                  {tags.includes(CONSTANT.SHOW_WORK_ORDERS) && (
                    <NavLink
                      to="#"
                      className={`p-2 ${
                        activeTab === "3"
                          ? "text-dark rounded-top p-3 bg-light"
                          : "text-dark p-3"
                      }`}
                      onClick={() => {
                        tabChange("3");
                      }}
                      type="button"
                    >
                      Orders
                    </NavLink>
                  )}
                  {tags.includes(CONSTANT.ESTIMATE_LIST) && (
                    <NavLink
                      to="#"
                      className={`p-2 ${
                        activeTab === "5"
                          ? "text-dark rounded-top p-3 bg-light"
                          : "text-dark p-3"
                      }`}
                      onClick={() => {
                        tabChange("5");
                      }}
                      type="button"
                    >
                      Estimates
                    </NavLink>
                  )}

                  {tags.includes(CONSTANT.INVOICE_LIST) && (
                    <NavLink
                      to="#"
                      className={`p-2 ${
                        activeTab === "6"
                          ? "text-dark rounded-top p-3 bg-light"
                          : "text-dark p-3"
                      }`}
                      onClick={() => {
                        tabChange("6");
                      }}
                      type="button"
                    >
                      Invoices
                    </NavLink>
                  )}

                  {tags.includes(CONSTANT.EXPENSE_LIST) && (
                    <NavLink
                      to="#"
                      className={`p-2 ${
                        activeTab === "7"
                          ? "text-dark rounded-top p-3 bg-light"
                          : "text-dark p-3"
                      }`}
                      onClick={() => {
                        tabChange("7");
                      }}
                      type="button"
                    >
                      Expenses
                    </NavLink>
                  )}
                </NavItem>
              </Nav>
            </Row>
          </CardHeader>
          <CardBody className="p-4 bg-light" style={{ overflowY: "scroll" }}>
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                {tags.includes(CONSTANT.WORK_ORDER_ASSIGN_VENDOR) && (
                  <AddVendor details={props.details} update={props.update} />
                )}
              </TabPane>

              <TabPane tabId="2">
                {tags.includes(CONSTANT.TRIPS_LIST) && (
                  <AddTrips details={props.details} update={props.update} />
                )}
              </TabPane>

              <TabPane tabId="3">
                <Form>
                  <Row md="12">
                    <Col>
                      <h4>Orders: </h4>
                    </Col>
                  </Row>
                  <hr></hr>
                  {store.id && (
                    <Row className="trip-list">
                      <OrdersList id={store?.id} />
                    </Row>
                  )}
                </Form>
              </TabPane>

              <TabPane tabId="5">
                {tags.includes(CONSTANT.ESTIMATE_LIST) && (
                  <AddEstimate details={props.details} update={props.update} />
                )}
              </TabPane>

              <TabPane tabId="6">
                {tags.includes(CONSTANT.INVOICE_LIST) && (
                  <AddInvoice details={props.details} update={props.update} />
                )}
              </TabPane>

              <TabPane tabId="7">
                {tags.includes(CONSTANT.EXPENSE_LIST) && (
                  <AddExpense details={props.details} update={props.update} />
                )}
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default WOTableData;
