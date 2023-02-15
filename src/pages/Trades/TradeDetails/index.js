import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ActivityLogs from "./ActivityLogs";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import Error500 from "src/pages/PageNotFound/Error500";
import Info from "./BasicInfo";
import { getTradeDetails } from "src/helpers/Vendors";

const TradeDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getTradeDetails({ id });
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
            <Card>
              <CardBody>
                {" "}
                <Row>
                  <Col className="col-md-9">
                    <Row>
                      <Col className="float-start col-md-12">
                        <Info
                          details={data}
                          update={fetchRequestDetails}
                        ></Info>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="col-md-3">
                    <ActivityLogs></ActivityLogs>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default TradeDetails;
