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
import PersonalInfo from "./PersonalInfo";
import SubInfo from "./SubInfo";
import TradesComponent from "./Trades";
import Payment from "./Payment&w9";
import W9files from "./W9files";
import ContractInfo from "./ContractInfo";
import ContractFiles from "./ContractFiles";
import InsuranceInfo from "./InsuranceInfo";
import InsuranceFiles from "./InsuranceFiles";
import VendorAddressComponent from "./VendorAddress";

const Details = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const { details = {} } = props;

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [currentTab, setCurrentTab] = useState("1");

  const handleTapChange = (tab) => {
    setCurrentTab(tab);
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
                <p className="text-muted mb-0">Vendor</p>
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
                      <td className="text-muted text-ellipsis">
                        {details.user?.firstName || ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Last Name :
                      </th>
                      <td className="text-muted text-ellipsis">
                        {details.user?.lastName || ""}
                      </td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        E-mail :
                      </th>
                      <td className="text-muted text-ellipsis">
                        {details.user?.username || ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h5 className="card-title mb-3">Ratings</h5>
              <div className="table-responsive">
                <Table className="table-borderless mb-0">
                  <tbody>
                    <tr>
                      <th className="ps-0" scope="row">
                        Appearance :
                      </th>
                      <td className="text-muted">0.00</td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Workmanship :
                      </th>
                      <td className="text-muted">0.00</td>
                    </tr>
                    <tr>
                      <th className="ps-0" scope="row">
                        Personality :
                      </th>
                      <td className="text-muted">0.00</td>
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
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0 horizontal-slide"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                      handleTapChange("1");
                    }}
                    type="button"
                  >
                    <i className="fas fa-home"></i>
                    Vendor Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                      handleTapChange("3");
                    }}
                    type="button"
                  >
                    <i className="far fa-user"></i>
                    Address
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "11" })}
                    onClick={() => {
                      tabChange("11");
                      handleTapChange("11");
                    }}
                    type="button"
                  >
                    <i className="far fa-user"></i>
                    Shipping Address
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      tabChange("4");
                      handleTapChange("4");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Trades
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "5" })}
                    onClick={() => {
                      tabChange("5");
                      handleTapChange("5");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Payment W9
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "6" })}
                    onClick={() => {
                      tabChange("6");
                      handleTapChange("6");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    W9 Files
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "7" })}
                    onClick={() => {
                      tabChange("7");
                      handleTapChange("7");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Charges
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "8" })}
                    onClick={() => {
                      tabChange("8");
                      handleTapChange("8");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Contract Files
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "9" })}
                    onClick={() => {
                      tabChange("9");
                      handleTapChange("9");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Insurance Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "10" })}
                    onClick={() => {
                      tabChange("10");
                      handleTapChange("10");
                    }}
                    type="button"
                  >
                    <i className="far fa-envelope"></i>
                    Insurance Files
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <SubInfo
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="1"
                  />
                </TabPane>

                <TabPane tabId="3">
                  <Row>
                    <Col>
                      <VendorAddressComponent
                        data={props.details}
                        update={props.update}
                        type={"Billing"}
                        currentTab={currentTab}
                        id="3"
                      />
                    </Col>
                    <Col md={1}>
                      <div className="custom-border"></div>
                    </Col>
                    <Col>
                      <VendorAddressComponent
                        data={props.details}
                        update={props.update}
                        type={"Shipping"}
                        currentTab={currentTab}
                        id="11"
                      />
                    </Col>
                  </Row>
                </TabPane>

                {/* <TabPane tabId="11">
                  
                </TabPane> */}

                <TabPane tabId="4">
                  <TradesComponent
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="4"
                  />
                </TabPane>

                <TabPane tabId="5">
                  <Payment
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="5"
                  />
                </TabPane>

                <TabPane tabId="6">
                  <W9files
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="6"
                  />
                </TabPane>

                <TabPane tabId="7">
                  <ContractInfo
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="7"
                  />
                </TabPane>

                <TabPane tabId="8">
                  <ContractFiles
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="8"
                  />
                </TabPane>

                <TabPane tabId="9">
                  <InsuranceInfo
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="9"
                  />
                </TabPane>

                <TabPane tabId="10">
                  <InsuranceFiles
                    data={props.details}
                    update={props.update}
                    currentTab={currentTab}
                    id="10"
                  />
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
