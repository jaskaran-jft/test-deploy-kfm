import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Notify from "src/common/Toaster/toast";
import TechnicalInfo from "./TechnicalInfo";
import Info from "./BasicInfo";
import { getWorkRequestDetails } from "src/helpers/WorkRequest";
import WorkOrderPayDetail from "./WorkOrderPayDetail";
import WOTableData from "./WOTableData";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import WorkRequestSummary from "src/pages/WorkRequest/WorkRequestDetails/WorkRequestSummary";
import { updateWorkOrder } from "src/helpers/WorkOrder";
import BreadCrumb from "src/Components/Common/BreadCrumb";

const WorkOrderDetails = () => {
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
      <div className="page-content">
        <BreadCrumb title={"Details"} pageTitle="Work Order" />
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
                    <WorkOrderPayDetail
                      data={data}
                      update={fetchRequestDetails}
                    ></WorkOrderPayDetail>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-12">
                    <WOTableData details={data} update={fetchRequestDetails} />
                  </Col>
                </Row>
                <Row>
                  <Col className="col-md-12">
                    <WorkRequestSummary
                      data={data}
                      update={fetchRequestDetails}
                      api={updateWorkOrder}
                      work={true}
                    />
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

export default WorkOrderDetails;
