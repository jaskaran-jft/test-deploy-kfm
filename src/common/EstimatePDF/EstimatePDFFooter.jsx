import React, { Fragment } from "react";
import { Button, Col, Row } from "reactstrap";
import { CONSTANT } from "src/utils/constant";

const EstimatePDFFooter = (props) => {
  const {
    incurredCost,
    estimatedCost,
    address,
    total,
    user,
    estimatePdf,
    setShowAcceptButton,
    setShowDeclineButton,
    status,
  } = props;

  return (
    <Fragment>
      <div className="footer-block" style={{ textAlign: "center" }}>
        <div className="row mb-4">
          <div
            className="col-sm-3"
            style={{
              background: "#000000c4",
              color: "#fff",
              padding: " 20px",
            }}
          >
            <h6 className="mb-0" style={{ fontSize: "14px", color: "#fff" }}>
              <strong>Incurred Costs</strong>
            </h6>
            <div className="costs">${Number(incurredCost).toFixed(2)}</div>
          </div>
          <div
            className="col-sm-3"
            style={{
              background: "#000000c4",
              color: "#fff",
              padding: " 20px",
            }}
          >
            <h6 className="mb-0" style={{ fontSize: "14px", color: "#fff" }}>
              <strong>Estimated Costs</strong>
            </h6>
            <div className="costs">${Number(estimatedCost).toFixed(2)}</div>
          </div>
          <div
            className="col-sm-3"
            style={{
              background: "#000000c4",
              color: "#fff",
              padding: " 20px",
            }}
          >
            <h6 className="mb-0" style={{ fontSize: "14px", color: "#fff" }}>
              <strong>Tax</strong>
            </h6>
            <div className="costs">$0.00</div>
          </div>
          <div
            className="col-sm-3 blue"
            style={{
              background: "#3a84b5",
              color: " #fff",
              padding: "20px",
            }}
          >
            <h6 className="mb-0" style={{ fontSize: "14px", color: "#fff" }}>
              <strong>Grand Total</strong>
            </h6>
            <div className="costs">${total}</div>
          </div>
        </div>
      </div>
      <div className="footer-contact text-center">
        {(address[0]?.streetAddress1 || "") +
          " " +
          (address[0]?.place || "") +
          " " +
          (address[0]?.state || "") +
          ", " +
          (address[0]?.zipCode || "")}
        <br />
        <strong>Email:</strong> {user?.username || ""}
      </div>
      <br />
      <Row>
        <Col>
          {estimatePdf ? (
            <a href={estimatePdf} alt="pdf" download>
              <Button color="primary">Download</Button>
            </a>
          ) : null}
        </Col>

        <Col>
          {status === CONSTANT.PENDING ? (
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={setShowAcceptButton}
              >
                Approve
              </button>
              <button
                type="button"
                className="btn btn-soft-danger"
                onClick={setShowDeclineButton}
              >
                Decline
              </button>
            </div>
          ) : null}
        </Col>
      </Row>
    </Fragment>
  );
};

export default EstimatePDFFooter;
