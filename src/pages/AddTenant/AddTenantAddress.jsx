import { Fragment } from "react";
import { Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import {
  fetchStateList,
  fetchCityList,
  fetchAreaList,
} from "../../helpers/AddressMethod/address";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
const AddTenantAddress = (props) => {
  const {
    validation,
    editPage,
    id,
    addressTypeList,
    setStateList,
    setAreaList,
    setCityList,
    handleLocationChange,
    countryList,
    stateList,
    areaList,
    cityList,
    handleAreaChange,
    handleZipCodeChange,
  } = props.data;

  return (
    <Fragment>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Address Type")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values?.address[0]?.type) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  type="select"
                  name="address[0].type"
                  placeholder="Select Address Type *"
                  className="form-control"
                  onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address[0]?.type) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address[0]?.type &&
                    validation.errors?.address &&
                    validation.errors?.address[0]?.type
                      ? true
                      : false
                  }
                  disabled
                >
                  <option value="">Select Address Type</option>
                  {addressTypeList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address[0]?.type &&
                validation.errors.address &&
                validation.errors?.address[0]?.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address[0]?.type}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Street Address (1)")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values.address[0]?.streetAddress1) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name="address[0].streetAddress1"
                  placeholder="Enter Street Address (1) *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values.address[0]?.streetAddress1) ||
                    ""
                  }
                  invalid={
                    validation.touched.address &&
                    validation.touched.address[0]?.streetAddress1 &&
                    validation.errors.address &&
                    validation.errors.address[0]?.streetAddress1
                      ? true
                      : false
                  }
                />
                {validation.touched.address &&
                validation.touched.address[0]?.streetAddress1 &&
                validation.errors.address &&
                validation.errors.address[0]?.streetAddress1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address[0]?.streetAddress1}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>{props.t("Street Address (2)")}</Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values.address[0]?.streetAddress2) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name="address[0].streetAddress2"
                  placeholder="Enter Street Address (2)"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values.address[0]?.streetAddress2) ||
                    ""
                  }
                  invalid={
                    validation.touched.addres &&
                    validation.touched.address[0]?.streetAddress2 &&
                    validation.errors.address &&
                    validation.errors.address[0]?.streetAddress2
                      ? true
                      : false
                  }
                />
                {validation.touched.address &&
                validation.touched.address[0]?.streetAddress2 &&
                validation.errors.address &&
                validation.errors.address[0]?.streetAddress2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address[0]?.streetAddress2}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Country")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address.length > 0 &&
                  validation.values?.address[0]?.country) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  type="select"
                  name="address[0].country"
                  placeholder="Select Country *"
                  className="form-control"
                  onChange={(e) => {
                    handleLocationChange(
                      e,
                      0,
                      "country",
                      fetchStateList,
                      ["country"],
                      setStateList,
                      [setStateList, setAreaList, setCityList],
                      ["state", "province", "place", "zipCode"],
                    );
                  }}
                  onKeyDown={validation.handleBlur}
                  value={
                    validation.values?.address.length > 0 &&
                    validation.values?.address[0]?.country
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address[0]?.country &&
                    validation.errors?.address &&
                    validation.errors?.address[0]?.country
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
                validation.touched?.address[0]?.country &&
                validation.errors.address &&
                validation.errors?.address[0]?.country ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address[0]?.country}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("State")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values?.address[0]?.state) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  type="select"
                  name="address[0].state"
                  placeholder="Select State *"
                  className="form-control"
                  // onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address[0]?.state) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address[0]?.state &&
                    validation.errors?.address &&
                    validation.errors?.address[0]?.state
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleLocationChange(
                      e,
                      0,
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
                  {stateList[0]?.map((option) => (
                    <option key={option.state} value={option.state}>
                      {option.state}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address[0]?.country &&
                validation.errors.address &&
                validation.errors?.address[0]?.country ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address[0]?.country}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("City")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values?.address[0]?.province) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  type="select"
                  name="address[0].province"
                  placeholder="Select City *"
                  className="form-control"
                  // onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address[0]?.province) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address[0]?.province &&
                    validation.errors?.address &&
                    validation.errors?.address[0]?.province
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleLocationChange(
                      e,
                      0,
                      "province",
                      fetchAreaList,
                      ["province", "state", "country"],
                      setAreaList,
                      [setAreaList],
                      ["place", "zipCode"],
                    )
                  }
                >
                  <option value="">Select City *</option>
                  {cityList[0]?.map((option) => (
                    <option key={option.province} value={option.province}>
                      {option.province}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address[0]?.province &&
                validation.errors.address &&
                validation.errors?.address[0]?.province ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address[0]?.province}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Area ")} {editPage ? "*" : ""}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values?.address[0]?.place) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  type="select"
                  name="address[0].place"
                  placeholder="Select Area *"
                  className="form-control"
                  // onChange={validation.handleChange}
                  onChange={(e) => handleAreaChange(e, 0, "place")}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address[0]?.place) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address[0]?.place &&
                    validation.errors?.address &&
                    validation.errors?.address[0]?.place
                      ? true
                      : false
                  }
                  // onChange={(e) => handleAreaChange(e, 0, "place")}
                >
                  <option value="">Select Area *</option>
                  {areaList[0]?.map((option) => (
                    <option key={option.place} value={option.place}>
                      {option.place}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address[0]?.place &&
                validation.errors.address &&
                validation.errors?.address[0]?.place ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address[0]?.place}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Zip Code")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values.address[0]?.zipCode) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name="address[0].zipCode"
                  placeholder="Enter Zip Code *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={(e) => handleZipCodeChange(e, 0)}
                  // onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values.address[0]?.zipCode) ||
                    ""
                  }
                  invalid={
                    validation.touched.address &&
                    validation.touched.address[0]?.zipCode &&
                    validation.errors.address &&
                    validation.errors.address[0]?.zipCode
                      ? true
                      : false
                  }
                />
                {validation.touched.address &&
                validation.touched.address[0]?.zipCode &&
                validation.errors.address &&
                validation.errors.address[0]?.zipCode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address[0]?.zipCode}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>
              {props.t("Email")} {editPage ? "*" : ""}{" "}
            </Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values.address[0]?.email) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name="address[0].email"
                  placeholder="Enter Email *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onKeyDown={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values.address[0]?.email) ||
                    ""
                  }
                  invalid={
                    validation.touched.address &&
                    validation.touched.address[0]?.email &&
                    validation.errors.address &&
                    validation.errors.address[0]?.email
                      ? true
                      : false
                  }
                />
                {validation.touched.address &&
                validation.touched.address[0]?.email &&
                validation.errors.address &&
                validation.errors.address[0]?.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address[0]?.email}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(withTranslation()(AddTenantAddress));
