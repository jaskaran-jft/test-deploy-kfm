import { Fragment } from "react";
import { withTranslation } from "react-i18next";
import { Row, Col } from "reactstrap";

const VendorDropdown = (props) => {
  const { item = {} } = props;
  const { name, distance, rating } = item;
  return (
    <Fragment>
      <Row md={12}>
        <Col md={4}>
          <h4>
            <h6>{name || ""}</h6>, &nbsp;&nbsp;
          </h4>
        </Col>
        <Col md={4}>
          <h4>
            {props.t("Distance")}: <h6>{distance || 0} miles</h6> ,&nbsp;&nbsp;
          </h4>
        </Col>
        <Col md={4}>
          <h4>
            {props.t("Ratings")}: <h6>{rating || "0"}/5</h6>
          </h4>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withTranslation()(VendorDropdown);
