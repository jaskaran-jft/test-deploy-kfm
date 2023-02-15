import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import ActivityLogs from "./ActivityLogs";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import { getTripDetails } from "src/helpers/WorkOrder";
import Info from "./BasicInfo";
import OtherDetails from "./OtherDetails";
import TripActions from "./TripActions";
import BreadCrumb from "src/Components/Common/BreadCrumb";

const TripDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useLayoutEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getTripDetails({ id });
      setData(response || {});
      setLoading(false);
    } catch (error) {
      Notify(error || "Something went wrong", false);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title={"Trip Details"} pageTitle="Trip" />
        {loading ? (
          <Loading />
        ) : error ? (
          <Error500 />
        ) : (
          <Container fluid={true}>
            <Card>
              <CardBody>
                {" "}
                <Row>
                  <Col className="col-md-12">
                    <Row>
                      <Col className="float-start col-md-6">
                        <Info
                          details={data}
                          update={fetchRequestDetails}
                        ></Info>
                      </Col>
                      <Col className="col-md-6">
                        <OtherDetails
                          details={data}
                          update={fetchRequestDetails}
                        ></OtherDetails>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-12">
                    <TripActions
                      data={data}
                      update={fetchRequestDetails}
                    ></TripActions>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Container>
        )}
      </div>
    </React.Fragment>
  );
};

export default TripDetails;
