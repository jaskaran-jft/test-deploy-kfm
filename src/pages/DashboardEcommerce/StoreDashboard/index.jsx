import { Col, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import Section from "../Section";
import WorkOrderList from "src/pages/WorkOrder/WorkOrderList";
import WorkRequestList from "src/pages/WorkRequest/WorkRequestList";
import ActiveTickets from "./ActiveTickets";
import { useSelector } from "react-redux";

const StoreDashboard = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);

  return (
    <Row>
      <Col>
        <div className="h-100">
          <Section userData={userData} />
          <Row>
            <div className="dashboard-data">
              <h5>{props.t("Active Service Requests")}</h5>

              <WorkRequestList dashboard={true} userData={userData} />
            </div>
            <div className="dashboard-data">
              <h5>{props.t("Active Work Orders")}</h5>
              <ActiveTickets userData={userData} />
              <WorkOrderList dashboard={true} userData={userData} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default withTranslation()(StoreDashboard);
