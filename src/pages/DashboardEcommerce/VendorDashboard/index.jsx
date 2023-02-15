import { Col, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import Section from "../Section";
import { getStatusCount } from "src/helpers/Dashboard";
import { useSelector } from "react-redux";
import TripList from "src/pages/Trip/TripList";
import ClientWidget from "../ClientDashboard/ClientWidget";
import { vendorWidgetData } from "./utils";
import VendorTrips from "./VendorTrips";

const ClientDashboard = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);

  return (
    <Row>
      <Col>
        <div className="h-100">
          <Section userData={userData} />
          <Row>
            <ClientWidget
              clientWidgetData={vendorWidgetData}
              api={getStatusCount}
              userData={userData}
            />
          </Row>
          <Row>
            <Col md="6">
              <VendorTrips userData={userData} />
            </Col>
            <Col md="6">{/* <VendorTrips userData={userData} /> */}</Col>
          </Row>
          <Row>
            <div className="dashboard-data">
              <h5>{props.t("Trips")}</h5>
              <TripList dashboard={true} userData={userData} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default withTranslation()(ClientDashboard);
