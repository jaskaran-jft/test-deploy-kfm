import { Row, Col, Input, FormFeedback, FormGroup, Label } from "reactstrap";
import { withTranslation } from "react-i18next";

import {
  fetchStateList,
  fetchCityList,
  fetchAreaList,
} from "../../../helpers/AddressMethod/address";
import { withRouter } from "react-router-dom";

const AddVendorAddress = (props) => {
  const {
    validation,
    setSubmit,
    tags,
    id,
    editPage,
    countryList,
    cityList,
    stateList,
    areaList,
    submit,
    tenantList,
    setSelectedTrades,
    selectedTrades,
    handleChangeNumber,
    handleContactValidation,
    addVendorForm,
    handleLocationChange,
    setStateList,
    setAreaList,
    setCityList,
    tradesList,
    handleZipCodeChange,
    handleAreaChange,
  } = props;
  return (
    <Row>
      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("Street Address")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.streetAddress1) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                name={`address.streetAddress1`}
                placeholder={`${props.t("Street Address")} *`}
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values.address?.streetAddress1) ||
                  ""
                }
                invalid={
                  validation.touched.address &&
                  validation.touched.address?.streetAddress1 &&
                  validation.errors.address &&
                  validation.errors.address?.streetAddress1
                    ? true
                    : false
                }
              />
            </>
          )}
        </FormGroup>
      </Col>

      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("Street Address 2")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.streetAddress2) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                name={`address.streetAddress2`}
                placeholder={`${props.t("Street Address 2")} *`}
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values.address?.streetAddress2) ||
                  ""
                }
                invalid={
                  validation.touched.address &&
                  validation.touched.address?.streetAddress2 &&
                  validation.errors.address &&
                  validation.errors.address?.streetAddress2
                    ? true
                    : false
                }
              />
            </>
          )}
        </FormGroup>
      </Col>

      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("Country")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.country) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                type="select"
                name={`address.country`}
                placeholder="Select Country *"
                className="form-control"
                onChange={(e) => {
                  handleLocationChange(
                    e,
                    "country",
                    fetchStateList,
                    ["country"],
                    setStateList,
                    [setStateList, setAreaList, setCityList],
                    ["state", "province", "place", "zipCode"],
                  );
                }}
                onBlur={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values?.address?.country) ||
                  ""
                }
                invalid={
                  validation.touched?.address &&
                  validation.touched?.address?.country &&
                  validation.errors?.address &&
                  validation.errors?.address?.country
                    ? true
                    : false
                }
              >
                <option value="">Select Country *</option>
                {countryList.map((option) => (
                  <option key={option.countryCode} value={option.countryCode}>
                    {option.countryCode}
                  </option>
                ))}
              </Input>
              {validation.touched?.address &&
              validation.touched?.address?.country &&
              validation.errors.address &&
              validation.errors?.address?.country ? (
                <FormFeedback type="invalid">
                  {validation.errors?.address &&
                    validation.errors?.address?.country}
                </FormFeedback>
              ) : null}
            </>
          )}
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("State")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.state) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                type="select"
                name="address.state"
                placeholder="Select State *"
                className="form-control"
                onKeyDown={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values?.address?.state) ||
                  ""
                }
                invalid={
                  validation.touched?.address &&
                  validation.touched?.address?.state &&
                  validation.errors?.address &&
                  validation.errors?.address?.state
                    ? true
                    : false
                }
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    "state",
                    fetchCityList,
                    ["state", "country"],
                    setCityList,
                    [setCityList, setAreaList],
                    ["province", "place", "zipCode"],
                  )
                }
              >
                <option value="">Select State *</option>
                {stateList?.map((option) => (
                  <option key={option.state} value={option.state}>
                    {option.state}
                  </option>
                ))}
              </Input>
              {validation.touched?.address &&
              validation.touched?.address?.country &&
              validation.errors.address &&
              validation.errors?.address?.country ? (
                <FormFeedback type="invalid">
                  {validation.errors?.address &&
                    validation.errors?.address?.country}
                </FormFeedback>
              ) : null}
            </>
          )}
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("City")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.province) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                type="select"
                name={`address.province`}
                placeholder="Select City *"
                className="form-control"
                onChange={(e) =>
                  handleLocationChange(
                    e,
                    "province",
                    fetchAreaList,
                    ["province", "state", "country"],
                    setAreaList,
                    [setAreaList],
                    ["place", "zipCode"],
                  )
                }
                onKeyDown={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values?.address?.province) ||
                  ""
                }
                invalid={
                  validation.touched?.address &&
                  validation.touched?.address?.province &&
                  validation.errors?.address &&
                  validation.errors?.address?.province
                    ? true
                    : false
                }
              >
                <option value="">Select City *</option>
                {cityList?.map((option) => (
                  <option key={option.province} value={option.province}>
                    {option.province}
                  </option>
                ))}
              </Input>
              {validation.touched?.address &&
              validation.touched?.address?.province &&
              validation.errors.address &&
              validation.errors?.address?.province ? (
                <FormFeedback type="invalid">
                  {validation.errors?.address &&
                    validation.errors?.address?.province}
                </FormFeedback>
              ) : null}
            </>
          )}
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("Area")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values?.address?.place) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                type="select"
                name={`address.place`}
                placeholder="Select Area *"
                className="form-control"
                onChange={(e) => handleAreaChange(e, "place")}
                onKeyDown={validation.handleBlur}
                value={
                  (validation.values?.address &&
                    validation.values?.address?.place) ||
                  ""
                }
                invalid={
                  validation.touched?.address &&
                  validation.touched?.address?.place &&
                  validation.errors?.address &&
                  validation.errors?.address?.place
                    ? true
                    : false
                }
              >
                <option value="">Select Area *</option>
                {areaList?.map((option) => (
                  <option key={option.place} value={option.place}>
                    {option.place}
                  </option>
                ))}
              </Input>
              {validation.touched?.address &&
              validation.touched?.address?.place &&
              validation.errors.address &&
              validation.errors?.address?.place ? (
                <FormFeedback type="invalid">
                  {validation.errors?.address &&
                    validation.errors?.address?.place}
                </FormFeedback>
              ) : null}
            </>
          )}
        </FormGroup>
      </Col>
      <Col md="3">
        <FormGroup className="mb-3">
          <Label>{props.t("Zip Code")} *</Label>
          {id && !editPage ? (
            <h6>
              {(validation.values?.address &&
                validation.values.address?.zipCode) ||
                "--"}
            </h6>
          ) : (
            <>
              <Input
                name={`address.zipCode`}
                placeholder="Enter Zip Code *"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={(e) => handleZipCodeChange(e)}
                value={
                  (validation.values?.address &&
                    validation.values.address?.zipCode) ||
                  ""
                }
                invalid={
                  validation.touched.address &&
                  validation.touched.address?.zipCode &&
                  validation.errors.address &&
                  validation.errors.address?.zipCode
                    ? true
                    : false
                }
              />
              {validation.touched.address &&
              validation.touched.address?.zipCode &&
              validation.errors.address &&
              validation.errors.address?.zipCode ? (
                <FormFeedback type="invalid">
                  {validation.errors.address?.zipCode}
                </FormFeedback>
              ) : null}
            </>
          )}
        </FormGroup>
      </Col>
    </Row>
  );
};

export default withRouter(withTranslation()(AddVendorAddress));
