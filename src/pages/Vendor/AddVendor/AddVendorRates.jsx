import { Fragment } from "react";
import { Row, Col, Input, FormFeedback, UncontrolledTooltip } from "reactstrap";

const AddVendorRates = (props) => {
  const { validation } = props;

  return (
    <Fragment>
      <Row>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Regular Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Regular Rate"
                name="vendorContract.regular"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.regular || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.regular &&
                  validation.touched?.vendorContract?.regular
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.regular &&
              validation.touched?.vendorContract?.regular ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.regular}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              After Hours Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter After Hours Rate"
                name="vendorContract.afterHours"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.afterHours || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.afterHours &&
                  validation.touched?.vendorContract?.afterHours
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.afterHours &&
              validation.touched?.vendorContract?.afterHours ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.afterHours}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Weekend Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Weekend Rate"
                name="vendorContract.weekend"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.weekend || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.weekend &&
                  validation.touched?.vendorContract?.weekend
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.weekend &&
              validation.touched?.vendorContract?.weekend ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.weekend}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Holiday Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Holiday Rate"
                name="vendorContract.holiday"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.holiday || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.holiday &&
                  validation.touched?.vendorContract?.holiday
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.holiday &&
              validation.touched?.vendorContract?.holiday ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.holiday}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Emergency Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Emergency Rate"
                name="vendorContract.emergency"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.emergency || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.emergency &&
                  validation.touched?.vendorContract?.emergency
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.emergency &&
              validation.touched?.vendorContract?.emergency ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.emergency}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Weekend Emergency Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Weekend Emergency Rate"
                name="vendorContract.weekendEmergency"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.weekendEmergency || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.weekendEmergency &&
                  validation.touched?.vendorContract?.weekendEmergency
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.weekendEmergency &&
              validation.touched?.vendorContract?.weekendEmergency ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.weekendEmergency}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Regular Trip Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Regular Trip Rate"
                name="vendorContract.regularTripCharge"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.regularTripCharge || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.regularTripCharge &&
                  validation.touched?.vendorContract?.regularTripCharge
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.regularTripCharge &&
              validation.touched?.vendorContract?.regularTripCharge ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.regularTripCharge}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Emergency Trip Rate
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="labor-rate">
                $
              </span>
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Emergency Trip Rate"
                name="vendorContract.emergencyTripCharge"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={
                  validation.values.vendorContract.emergencyTripCharge || ""
                }
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.emergencyTripCharge &&
                  validation.touched?.vendorContract?.emergencyTripCharge
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.emergencyTripCharge &&
              validation.touched?.vendorContract?.emergencyTripCharge ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.emergencyTripCharge}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
        <Col sm={3}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product-price-input">
              Work Range
            </label>

            <span
              style={{ float: "right" }}
              className="mdi mdi-information-outline fs-20"
              id="workRangeTip"
            ></span>
            <UncontrolledTooltip placement="right" target="workRangeTip">
              Work range of vendor
            </UncontrolledTooltip>
            <div className="input-group mb-3">
              <Input
                type="number"
                className="form-control"
                id="labor-rate"
                placeholder="Enter Work Range"
                name="vendorContract.workRange"
                aria-label="Price"
                aria-describedby="product-price-addon"
                value={validation.values.vendorContract.workRange || ""}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                invalid={
                  validation.errors?.vendorContract?.workRange &&
                  validation.touched?.vendorContract?.workRange
                    ? true
                    : false
                }
              />
              {validation.errors?.vendorContract?.workRange &&
              validation.touched?.vendorContract?.workRange ? (
                <FormFeedback type="invalid">
                  {validation.errors?.vendorContract?.workRange}
                </FormFeedback>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddVendorRates;
