import { Fragment } from "react";
import { Row, Col, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import {
  fetchStateList,
  fetchCityList,
  fetchAreaList,
} from "../../helpers/AddressMethod/address";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

const AddTenantSecondaryAddress = (props) => {
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
    deleteAddress,
    handleTypeChange,
  } = props.data;

  return (
    <Fragment>
      {validation.values.address.length !== 0 &&
        validation.values.address.map((item, index) => {
          if (index !== 0) {
            return (
              <div key={index}>
                <div className="d-flex w-100 justify-content-end">
                  {/* <h3 className="mb-1">Address {index}</h3> */}
                  {index > 1 ? (
                    <div
                      className="text-danger font-weight-bold d-flex align-items-center"
                      onClick={() =>
                        id && !editPage
                          ? null
                          : deleteAddress(
                              index,
                              validation.values?.address[index],
                            )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      - Remove{" "}
                    </div>
                  ) : null}
                </div>
                <Row>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Address Type {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values?.address[index]?.type) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            type="select"
                            name={`address[${index}].type`}
                            placeholder="Select Address Type *"
                            className="form-control"
                            onChange={(e) =>
                              handleTypeChange(
                                e,
                                index,
                                validation.values?.address[index]?.type,
                              )
                            }
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values?.address[index]?.type) ||
                              ""
                            }
                            invalid={
                              validation.touched?.address &&
                              validation.touched?.address[index]?.type &&
                              validation.errors?.address &&
                              validation.errors?.address[index]?.type
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Address Type</option>
                            {addressTypeList.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                disabled={option.isSelected}
                              >
                                {option.label}
                              </option>
                            ))}
                          </Input>
                          {validation.touched?.address &&
                          validation.touched?.address[index]?.type &&
                          validation.errors.address &&
                          validation.errors?.address[index]?.type ? (
                            <FormFeedback type="invalid">
                              {validation.errors?.address &&
                                validation.errors?.address[index]?.type}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Street Address (1) {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values.address[index]?.streetAddress1) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            name={`address[${index}].streetAddress1`}
                            placeholder="Enter Street Address (1) *"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values.address[index]
                                  ?.streetAddress1) ||
                              ""
                            }
                            invalid={
                              validation.touched.address &&
                              validation.touched.address[index]
                                ?.streetAddress1 &&
                              validation.errors.address &&
                              validation.errors.address[index]?.streetAddress1
                                ? true
                                : false
                            }
                          />
                          {validation.touched.address &&
                          validation.touched.address[index]?.streetAddress1 &&
                          validation.errors.address &&
                          validation.errors.address[index]?.streetAddress1 ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address[index]?.streetAddress1}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Street Address (2)</Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values.address[index]?.streetAddress2) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            name={`address[${index}].streetAddress2`}
                            placeholder="Enter Street Address (2)"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values.address[index]
                                  ?.streetAddress2) ||
                              ""
                            }
                            invalid={
                              validation.touched.addres &&
                              validation.touched.address[index]
                                ?.streetAddress2 &&
                              validation.errors.address &&
                              validation.errors.address[index]?.streetAddress2
                                ? true
                                : false
                            }
                          />
                          {validation.touched.address &&
                          validation.touched.address[index]?.streetAddress2 &&
                          validation.errors.address &&
                          validation.errors.address[index]?.streetAddress2 ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address[index]?.streetAddress2}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Country {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values?.address[index]?.country) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            type="select"
                            name={`address[${index}].country`}
                            placeholder="Select Country *"
                            className="form-control"
                            onChange={(e) => {
                              handleLocationChange(
                                e,
                                index,
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
                                validation.values?.address[index]?.country) ||
                              ""
                            }
                            invalid={
                              validation.touched?.address &&
                              validation.touched?.address[index]?.country &&
                              validation.errors?.address &&
                              validation.errors?.address[index]?.country
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Country *</option>
                            {countryList.map((option) => (
                              <option
                                key={option.countryCode}
                                value={option.countryCode}
                              >
                                {option.countryCode}
                              </option>
                            ))}
                          </Input>
                          {validation.touched?.address &&
                          validation.touched?.address[index]?.country &&
                          validation.errors.address &&
                          validation.errors?.address[index]?.country ? (
                            <FormFeedback type="invalid">
                              {validation.errors?.address &&
                                validation.errors?.address[index]?.country}
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
                      <Label>State {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values?.address[index]?.state) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            type="select"
                            name={`address[${index}].state`}
                            placeholder="Select State *"
                            className="form-control"
                            onChange={(e) =>
                              handleLocationChange(
                                e,
                                index,
                                "state",
                                fetchCityList,
                                ["state", "country"],
                                setCityList,
                                [setCityList, setAreaList],
                                ["province", "place", "zipCode"],
                              )
                            }
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values?.address[index]?.state) ||
                              ""
                            }
                            invalid={
                              validation.touched?.address &&
                              validation.touched?.address[index]?.state &&
                              validation.errors?.address &&
                              validation.errors?.address[index]?.state
                                ? true
                                : false
                            }
                          >
                            <option value="">Select State *</option>
                            {stateList[index]?.map((option) => (
                              <option key={option.state} value={option.state}>
                                {option.state}
                              </option>
                            ))}
                          </Input>
                          {validation.touched?.address &&
                          validation.touched?.address[index]?.country &&
                          validation.errors.address &&
                          validation.errors?.address[index]?.country ? (
                            <FormFeedback type="invalid">
                              {validation.errors?.address &&
                                validation.errors?.address[index]?.country}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>City {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values?.address[index]?.province) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            type="select"
                            name={`address[${index}].province`}
                            placeholder="Select City *"
                            className="form-control"
                            onChange={(e) =>
                              handleLocationChange(
                                e,
                                index,
                                "province",
                                fetchAreaList,
                                ["province", "state", "country"],
                                setAreaList,
                                [setAreaList],
                                ["place", "zipCode"],
                              )
                            }
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values?.address[index]?.province) ||
                              ""
                            }
                            invalid={
                              validation.touched?.address &&
                              validation.touched?.address[index]?.province &&
                              validation.errors?.address &&
                              validation.errors?.address[index]?.province
                                ? true
                                : false
                            }
                          >
                            <option value="">Select City *</option>
                            {cityList[index]?.map((option) => (
                              <option
                                key={option.province}
                                value={option.province}
                              >
                                {option.province}
                              </option>
                            ))}
                          </Input>
                          {validation.touched?.address &&
                          validation.touched?.address[index]?.province &&
                          validation.errors.address &&
                          validation.errors?.address[index]?.province ? (
                            <FormFeedback type="invalid">
                              {validation.errors?.address &&
                                validation.errors?.address[index]?.province}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Area {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values?.address[index]?.place) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            type="select"
                            name={`address[${index}].place`}
                            placeholder="Select Area *"
                            className="form-control"
                            onChange={(e) =>
                              handleAreaChange(e, index, "place")
                            }
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values?.address[index]?.place) ||
                              ""
                            }
                            invalid={
                              validation.touched?.address &&
                              validation.touched?.address[index]?.place &&
                              validation.errors?.address &&
                              validation.errors?.address[index]?.place
                                ? true
                                : false
                            }
                          >
                            <option value="">Select Area *</option>
                            {areaList[index]?.map((option) => (
                              <option key={option.place} value={option.place}>
                                {option.place}
                              </option>
                            ))}
                          </Input>
                          {validation.touched?.address &&
                          validation.touched?.address[index]?.place &&
                          validation.errors.address &&
                          validation.errors?.address[index]?.place ? (
                            <FormFeedback type="invalid">
                              {validation.errors?.address &&
                                validation.errors?.address[index]?.place}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup className="mb-3">
                      <Label>Zip Code {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values.address[index]?.zipCode) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            name={`address[${index}].zipCode`}
                            placeholder="Enter Zip Code *"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={(e) => handleZipCodeChange(e, index)}
                            value={
                              (validation.values?.address &&
                                validation.values.address[index]?.zipCode) ||
                              ""
                            }
                            invalid={
                              validation.touched.address &&
                              validation.touched.address[index]?.zipCode &&
                              validation.errors.address &&
                              validation.errors.address[index]?.zipCode
                                ? true
                                : false
                            }
                          />
                          {validation.touched.address &&
                          validation.touched.address[index]?.zipCode &&
                          validation.errors.address &&
                          validation.errors.address[index]?.zipCode ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address[index]?.zipCode}
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
                      <Label>Email {editPage ? "*" : ""} </Label>
                      {id && !editPage ? (
                        <h6>
                          {(validation.values?.address &&
                            validation.values.address[index]?.email) ||
                            "--"}
                        </h6>
                      ) : (
                        <>
                          <Input
                            name={`address[${index}].email`}
                            placeholder="Enter Email *"
                            type="text"
                            className="form-control"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={
                              (validation.values?.address &&
                                validation.values.address[index]?.email) ||
                              ""
                            }
                            invalid={
                              validation.touched.address &&
                              validation.touched.address[index]?.email &&
                              validation.errors.address &&
                              validation.errors.address[index]?.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.address &&
                          validation.touched.address[index]?.email &&
                          validation.errors.address &&
                          validation.errors.address[index]?.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.address[index]?.email}
                            </FormFeedback>
                          ) : null}
                        </>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            );
          } else {
            return null;
          }
        })}
    </Fragment>
  );
};

export default withRouter(withTranslation()(AddTenantSecondaryAddress));
