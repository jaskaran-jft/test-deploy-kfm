import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import ProfilePhoto from "../../../assets/images/user-illustarator-1.png";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import PersonalInfo from "./PersonalDetails";

const Details = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const { details = {} } = props;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xxl={3}>
          <Card className="card-bg-fill" style={{ height: "29em" }}>
            <CardBody className="p-4">
              <div className="text-center">
                <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                  <img
                    src={details?.profileImage || ProfilePhoto}
                    className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                    alt="user-profile"
                  />
                </div>
                <h5 className="fs-16 mb-1">
                  {details.firstName || ""} {details.lastName || ""}
                </h5>
                <p className="text-muted mb-0">Site User</p>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xxl={9}>
          <Card>
            <CardHeader>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Basic Info
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <PersonalInfo details={props.details} update={props.update} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Details;
