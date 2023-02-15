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
import Info from "./BasicInfo";
import TechnicianDetails from "./TechnicianDetails";
import AddressComponent from "./Address";
import TripList from "src/pages/Trip/TripList";

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
          <Card className="card-bg-fill">
            <CardBody className="p-4">
              <div className="text-center">
                <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                  <img
                    src={details?.user?.profileImage || ProfilePhoto}
                    className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                    alt="user-profile"
                  />
                </div>
                <h5 className="fs-16 mb-1">
                  {details.user?.firstName || ""} {details.user?.lastName || ""}
                </h5>
                <p className="text-muted mb-0">Technician</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h5 className="card-title mb-3">Info</h5>
              <div className="table-responsive">
                <Table className="table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="ps-0" scope="row">
                        First Name :
                      </th>
                      <td className="text-muted">
                        {details.user?.firstName || ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Last Name :
                      </th>
                      <td className="text-muted">
                        {details.user?.lastName || ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        E-mail :
                      </th>
                      <td className="text-muted">
                        {details.user?.username || ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
                    Technician Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Personal Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Address
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <TechnicianDetails
                    data={props.details}
                    update={props.update}
                  />
                </TabPane>

                <TabPane tabId="2">
                  <Info details={props.details} update={props.update} />
                </TabPane>

                <TabPane tabId="3">
                  <AddressComponent
                    data={props.details}
                    update={props.update}
                  />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Card>
          <CardBody>
            <Row className="trip-list">
              <TripList id={props.details.id} />
            </Row>
          </CardBody>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default Details;
