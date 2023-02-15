import { Fragment, useState } from "react";
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
import TripFiles from "./TripFiles";

const TripActions = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const { data = {} } = props;
  const { ticket = {}, action = [] } = data;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Fragment>
      <Col>
        <Card style={{ height: "auto" }}>
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
                    Trip Actions
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
                    Files
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>
          </CardHeader>
          <CardBody className="p-4 bg-light" style={{ overflowY: "hidden" }}>
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                <Form>
                  {action.length ? (
                    action.map((item, index) => (
                      <ul className="mb-2" key={item.id}>
                        <h5>
                          {index + 1}. &nbsp; {item.user}
                        </h5>
                        {item?.actions.map((_) => (
                          <li style={{ marginLeft: 50 }} key={_}>
                            {_?.action}
                          </li>
                        ))}
                      </ul>
                    ))
                  ) : (
                    <p>No Action found</p>
                  )}
                </Form>
              </TabPane>

              <TabPane tabId="2">
                <TripFiles {...props} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default TripActions;
