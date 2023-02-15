import { Col, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import Section from "../Section";
import ClientWidget from "./ClientWidget";
import WorkOrderList from "src/pages/WorkOrder/WorkOrderList";
import WorkRequestList from "src/pages/WorkRequest/WorkRequestList";
import { clientInvoiceWidgetData, clientWidgetData } from "./utils";
import { getEstimateCount, getInvoiceCount } from "src/helpers/Dashboard";
import { useSelector } from "react-redux";

const ClientDashboard = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);

  return (
    <Row>
      <Col>
        <div className="h-100">
          <Section userData={userData} />
          <Row>
            <ClientWidget
              clientWidgetData={clientWidgetData}
              api={getEstimateCount}
              userData={userData}
            />
            <ClientWidget
              clientWidgetData={clientInvoiceWidgetData}
              invoice={true}
              api={getInvoiceCount}
              userData={userData}
            />
          </Row>
          <Row>
            <div className="dashboard-data">
              <h5>{props.t("Work Requests")}</h5>
              <WorkRequestList dashboard={true} userData={userData} />
            </div>
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

export default withTranslation()(ClientDashboard);
