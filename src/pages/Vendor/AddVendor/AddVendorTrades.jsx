import { Fragment } from "react";
import { Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { MultiSelect } from "react-multi-select-component";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const AddVendorTrades = (props) => {
  const {
    validation,
    id,
    editPage,
    submit,
    setSelectedTrades,
    selectedTrades,
    tradesList,
  } = props.data;

  return (
    <Fragment>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>{props.t("Bill As")}</Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.business &&
                  validation.values.business?.billAs) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name={`business.billAs`}
                  placeholder="Bill As"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.business &&
                      validation.values.business?.billAs) ||
                    ""
                  }
                  invalid={
                    validation.touched?.business &&
                    validation.touched.business?.billAs &&
                    validation.errors?.business &&
                    validation.errors.business?.billAs
                      ? true
                      : false
                  }
                />
                {validation.touched?.business &&
                validation.touched.business?.billAs &&
                validation.errors?.business &&
                validation.errors.business?.billAs ? (
                  <FormFeedback type="invalid">
                    {validation.errors.business?.billAs}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Trade * </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.business &&
                Array.isArray(validation.values?.business?.tradeId)
                  ? validation.values?.business?.tradeId.map((item, _i) => (
                      <Fragment key={_i}>
                        {_i === 0 ||
                        _i === validation.values?.business?.tradeId.length - 1
                          ? item
                          : `, ${item}`}{" "}
                      </Fragment>
                    ))
                  : "--") || "--"}
              </h6>
            ) : (
              <>
                <MultiSelect
                  options={tradesList}
                  value={selectedTrades}
                  onChange={(value) => {
                    setSelectedTrades(value);
                    validation.setFieldValue(
                      "business.tradeId",
                      JSON.stringify(value),
                    );
                  }}
                  name={`business.tradeId`}
                  labelledBy="Select Trades*"
                  onBlur={validation.handleBlur}
                  invalid={
                    validation.touched?.business &&
                    validation.touched?.business?.tradeId &&
                    validation.errors?.business &&
                    validation.errors?.business?.tradeId
                      ? true
                      : false
                  }
                />
                {submit && selectedTrades.length === 0 ? (
                  // <FormFeedback type="invalid">
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Trade is required field
                  </div>
                ) : // </FormFeedback>
                null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(withTranslation()(AddVendorTrades));
