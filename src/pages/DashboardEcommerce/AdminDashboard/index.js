import { Col, Row } from "reactstrap";
import Widget from "./Widgets";
import TicketStatus from "./TicketStatus";
import TicketStats from "./TicketStats";
import States from "./States";
import { withTranslation } from "react-i18next";
import WorkOrderList from "src/pages/WorkOrder/WorkOrderList";
import Section from "../Section";
import { widgetsData } from "src/common/data";
import { useSelector } from "react-redux";

const AdminDashboard = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);

  return (
    <Row>
      <Col>
        <div className="h-100">
          <Section />
          <Row>
            <Widget userData={userData} widgetsData={widgetsData} />
          </Row>
          <Row>
            <Col md="6">
              <TicketStatus userData={userData} />
            </Col>
            <States userData={userData} />
          </Row>
          <Row>
            <Col md="12">
              <TicketStats userData={userData} />
            </Col>
          </Row>
          <Row>
            <div className="dashboard-data">
              <h5>{props.t("Work Order List")}</h5>
              <WorkOrderList dashboard={true} userData={userData} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default withTranslation()(AdminDashboard);
