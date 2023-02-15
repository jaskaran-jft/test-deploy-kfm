import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <Link to="#">{pageTitle}</Link>
              </li>
              {title && <li className="breadcrumb-item active">{title}</li>}
            </ol>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
