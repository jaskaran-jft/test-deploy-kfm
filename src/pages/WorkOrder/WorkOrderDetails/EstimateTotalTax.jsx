import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";

const EstimateTotalTax = ({ NetTotal = 0 }) => {
  return (
    <Fragment>
      <div className="mb-3 mt-3">
        <Row
          style={{
            padding: "10px 0px 10px 10px",
          }}
        >
          <Col className="col-md-12">
            <div>
              <h5>Summary</h5>
              <hr></hr>
            </div>
          </Col>
          <Col className="col-md-12">
            <Row>
              <Col>
                <div
                  style={{
                    backgroundColor: "rgb(243, 246, 249)",
                    padding: "10px 0px 10px 10px",
                  }}
                >
                  <p>Net Total</p>
                  <h5>${NetTotal.toFixed(2)}</h5>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundColor: "rgb(243, 246, 249)",
                    padding: "10px 0px 10px 10px",
                  }}
                >
                  <p>Total Tax </p>
                  <h5>$0.00</h5>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundColor: "rgb(243, 246, 249)",
                    padding: "10px 0px 10px 10px",
                  }}
                >
                  <p>Grand Total</p>
                  <h5>${NetTotal.toFixed(2)}</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default EstimateTotalTax;
