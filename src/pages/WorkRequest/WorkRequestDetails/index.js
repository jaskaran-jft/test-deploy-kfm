import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ActivityLogs from "./ActivityLogs";
import Notify from "src/common/Toaster/toast";
import TechnicalInfo from "./TechnicalInfo";
import Info from "./BasicInfo";
import {
  getWorkRequestDetails,
  updateWorkRequest,
} from "src/helpers/WorkRequest";
import WorkRequestSummary from "./WorkRequestSummary";
import WorkRequestHandle from "./WorkRequestHandle";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import BreadCrumb from "src/Components/Common/BreadCrumb";

const WorkRequestDetails = () => {
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
      const response = await getWorkRequestDetails(id);
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
      {loading ? (
        <Loading />
      ) : error ? (
        <Error500 />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb title={"Work Request Details"} pageTitle="Work Order" />
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
                        <TechnicalInfo
                          data={data}
                          update={fetchRequestDetails}
                        ></TechnicalInfo>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-12">
                    <WorkRequestSummary
                      data={data}
                      update={fetchRequestDetails}
                      api={updateWorkRequest}
                    />
                  </Col>
                </Row>
                <WorkRequestHandle data={data} update={fetchRequestDetails} />
              </CardBody>
            </Card>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default WorkRequestDetails;
