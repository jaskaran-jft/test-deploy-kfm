import { withTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import IntlTelInput from "react-intl-tel-input";
import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import {
  fetchStateList,
  fetchCityList,
  fetchAreaList,
} from "src/helpers/AddressMethod/address";
import { CONSTANT } from "src/utils/constant";

const AddTechnicianInputs = (props) => {
  const {
    validation,
    countryList,
    areaList,
    cityList,
    stateList,
    setStateList,
    setAreaList,
    setCityList,
    handleAreaChange,
    handleChangeNumber,
    handleContactValidation,
    handleSubmit,
    handleZipCodeChange,
    id,
    editPage,
    setEditPage,
    handleLocationChange,
    vendorList,
    userData,
    tags,
  } = props.data;

  return (
    <Form
      className="needs-validation"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
      }}
    >
      <div className="d-flex justify-content-between ">
        <h5 className="pb-3">General Info</h5>
        {id ? (
          editPage ? (
            <div
              className="d-flex flex-row-reverse"
              onClick={() => setEditPage(!editPage)}
              style={{ cursor: "pointer" }}
            >
              <i className="bx bxs-check-circle bx-sm text-success"></i>
            </div>
          ) : (
            <div
              onClick={() => setEditPage(!editPage)}
              title="Edit"
              style={{ cursor: "pointer" }}
            >
              <i className="bx bxs-edit-alt bx-sm text-primary"></i>
            </div>
          )
        ) : null}
      </div>
      <Row>
        {
          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Vendor *</Label>
              {id && !editPage ? (
                <h6>
                  {(validation.values?.info &&
                    validation.values?.info?.vendorId) ||
                    "--"}
                </h6>
              ) : (
                <>
                  {tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN) ? (
                    <>
                      <Input
                        type="select"
                        name="info.vendorId"
                        placeholder="Select Vendor *"
                        className="form-control"
                        onChange={(e) => {
                          validation.setFieldValue(
                            "info.vendorId",
                            e.target.value,
                          );
                        }}
                        onBlur={validation.handleBlur}
                        value={
                          (validation.values?.info &&
                            validation.values?.info.vendorId) ||
                          ""
                        }
                        invalid={
                          validation.touched?.info &&
                          validation.touched?.info.vendorId &&
                          validation.errors?.info &&
                          validation.errors?.info.vendorId
                            ? true
                            : false
                        }
                      >
                        <option value="">Select Vendor *</option>
                        {vendorList?.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Input>
                      {validation.touched?.user &&
                      validation.touched?.user.subContractor &&
                      validation.errors.user &&
                      validation.errors?.user.subContractor ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.user &&
                            validation.errors?.user.subContractor}
                        </FormFeedback>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <Input
                        name="info.vendorId"
                        placeholder="Vendor *"
                        type="text"
                        className="form-control"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          validation.values.info?.vendorId || userData.firstName
                        }
                        invalid={
                          validation.touched.info?.vendorId &&
                          validation.errors.info?.vendorId
                            ? true
                            : false
                        }
                        disabled={true}
                      />
                      {validation.touched.info?.vendorId &&
                      validation.errors.info?.vendorId ? (
                        <FormFeedback type="invalid">
                          {validation.errors.info?.vendorId}
                        </FormFeedback>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </FormGroup>
          </Col>
        }

        <Col md="3">
          <FormGroup className="mb-3">
            <Label>First Name *</Label>
            {id && !editPage ? (
              <h6>{validation.values.user?.firstName || "--"}</h6>
            ) : (
              <>
                <Input
                  name="user.firstName"
                  placeholder="Enter First Name *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.user?.firstName || ""}
                  invalid={
                    validation.touched.user?.firstName &&
                    validation.errors.user?.firstName
                      ? true
                      : false
                  }
                />
                {validation.touched.user?.firstName &&
                validation.errors.user?.firstName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.user?.firstName}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Last Name *</Label>
            {id && !editPage ? (
              <h6>{validation.values.user?.lastName || "--"}</h6>
            ) : (
              <>
                <Input
                  name="user.lastName"
                  placeholder="Enter Last Name *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.user?.lastName || ""}
                  invalid={
                    validation.touched.user?.lastName &&
                    validation.errors.user?.lastName
                      ? true
                      : false
                  }
                />
                {validation.touched.user?.lastName &&
                validation.errors.user?.lastName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.user?.lastName}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Password *</Label>
            {id && !editPage ? (
              <h6>{validation.values.user?.password || "--"}</h6>
            ) : (
              <>
                <Input
                  name="user.password"
                  placeholder="Enter Password *"
                  type="password"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.user?.password || ""}
                  invalid={
                    validation.touched.user?.password &&
                    validation.errors.user?.password
                      ? true
                      : false
                  }
                />
                {validation.touched.user?.password &&
                validation.errors.user?.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.user?.password}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Address *</Label>
            {id && !editPage ? (
              <h6>{validation.values.address?.streetAddress1 || "--"}</h6>
            ) : (
              <>
                <Input
                  name="address.streetAddress1"
                  placeholder="Enter Address *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address?.streetAddress1 || ""}
                  invalid={
                    validation.touched.address?.streetAddress1 &&
                    validation.errors.address?.streetAddress1
                      ? true
                      : false
                  }
                />
                {validation.touched.address?.streetAddress1 &&
                validation.errors.address?.streetAddress1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address?.streetAddress1}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Address2</Label>
            {id && !editPage ? (
              <h6>{validation.values.address?.streetAddress2 || "--"}</h6>
            ) : (
              <>
                <Input
                  name="address.streetAddress2"
                  placeholder="Enter streetAddress2"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address?.streetAddress2 || ""}
                  invalid={
                    validation.touched.address?.streetAddress2 &&
                    validation.errors.address?.streetAddress2
                      ? true
                      : false
                  }
                />
                {validation.touched.address?.streetAddress2 &&
                validation.errors.address?.streetAddress2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address?.streetAddress2}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>

      <hr></hr>
      <h5 className="pb-3">Contact</h5>

      <Row>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Email Address *</Label>
            {id && !editPage ? (
              <h6>{validation.values.user?.username || "--"}</h6>
            ) : (
              <>
                <Input
                  name="user.username"
                  placeholder="Enter Email Address *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.user?.username || ""}
                  invalid={
                    validation.touched.user?.username &&
                    validation.errors.user?.username
                      ? true
                      : false
                  }
                />
                {validation.touched.user?.username &&
                validation.errors.user?.username ? (
                  <FormFeedback type="invalid">
                    {validation.errors.user?.username}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Business Phone *</Label>
            {id && !editPage ? (
              <h6>{validation.values.info?.businessPhone || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="info.businessPhone"
                  inputClassName={`form-control ${
                    validation.touched.info?.businessPhone &&
                    validation.values.info?.businessPhone === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(e, value, country, "info.businessPhone")
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "info.businessPhone",
                    )
                  }
                  formatOnInit
                  value={validation.values.info?.businessPhone || ""}
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.info?.businessPhone?.length < 1 ||
                    (validation.touched.info?.businessPhone &&
                    validation.errors.info?.businessPhone
                      ? true
                      : false)
                  }
                />
                {validation.touched.info?.businessPhone &&
                validation.errors.info?.businessPhone ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.info?.businessPhone}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Personal Mobile</Label>
            {id && !editPage ? (
              <h6>{validation.values.info?.personalPhone || "--"}</h6>
            ) : (
              <>
                <IntlTelInput
                  containerClassName="intl-tel-input"
                  name="info.personalPhone"
                  inputClassName={`form-control ${
                    validation.touched.info?.personalPhone &&
                    validation.values.info?.personalPhone === ""
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ width: "100%" }}
                  onPhoneNumberChange={(e, value, country) =>
                    handleChangeNumber(e, value, country, "info.personalPhone")
                  }
                  onPhoneNumberBlur={(e, value, country) =>
                    handleContactValidation(
                      e,
                      value,
                      country,
                      "info.personalPhone",
                    )
                  }
                  formatOnInit
                  value={
                    validation.values.info?.personalPhone ||
                   ''
                  }
                  onlyCountries={["us", "ca", "pr"]}
                  defaultCountry={"us"}
                  length={10}
                  preferredCountries={["us"]}
                  invalid={
                    validation.values.info?.personalPhone?.length < 1 ||
                    (validation.touched.info?.personalPhone &&
                    validation.errors.info?.personalPhone
                      ? true
                      : false)
                  }
                />
                {validation.touched.info?.personalPhone &&
                validation.errors.info?.personalPhone ? (
                  <FormFeedback type="invalid" className="d-block">
                    {validation.errors.info?.personalPhone}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Country *</Label>
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
                  name="address.country"
                  placeholder="Select Country *"
                  className="form-control"
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address.country) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address.country &&
                    validation.errors?.address &&
                    validation.errors?.address.country
                      ? true
                      : false
                  }
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
                >
                  <option value="">Select Country *</option>
                  {countryList.map((option, index) => (
                    <option key={index} value={option.countryCode}>
                      {option.countryCode}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address.country &&
                validation.errors.address &&
                validation.errors?.address.country ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address.country}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>State *</Label>
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
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address.state) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address.state &&
                    validation.errors?.address &&
                    validation.errors?.address.state
                      ? true
                      : false
                  }
                >
                  <option value="">Select State *</option>
                  {stateList?.map((option, index) => (
                    <option key={index} value={option.state}>
                      {option.state}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address.state &&
                validation.errors.address &&
                validation.errors?.address.state ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address.state}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>City *</Label>
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
                  name="address.province"
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
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address.province) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address.province &&
                    validation.errors?.address &&
                    validation.errors?.address.province
                      ? true
                      : false
                  }
                >
                  <option value="">Select City *</option>
                  {cityList?.map((option, index) => (
                    <option key={index} value={option.province}>
                      {option.province}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address.province &&
                validation.errors.address &&
                validation.errors?.address.province ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address.province}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Area *</Label>
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
                  name="address.place"
                  placeholder="Select Area *"
                  className="form-control"
                  onChange={(e) => handleAreaChange(e, "place")}
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.address &&
                      validation.values?.address.place) ||
                    ""
                  }
                  invalid={
                    validation.touched?.address &&
                    validation.touched?.address.place &&
                    validation.errors?.address &&
                    validation.errors?.address.place
                      ? true
                      : false
                  }
                >
                  <option value="">Select Area *</option>
                  {areaList?.map((option, index) => (
                    <option key={index} value={option.place}>
                      {option.place}
                    </option>
                  ))}
                </Input>
                {validation.touched?.address &&
                validation.touched?.address.place &&
                validation.errors.address &&
                validation.errors?.address.place ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.address &&
                      validation.errors?.address.place}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup className="mb-3">
            <Label>Zip Code *</Label>
            {id && !editPage ? (
              <h6>
                {(validation.values?.address &&
                  validation.values.address?.zipCode) ||
                  "--"}
              </h6>
            ) : (
              <>
                <Input
                  name="address.zipCode"
                  placeholder="Enter Zip Code *"
                  type="text"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={(e) => handleZipCodeChange(e)}
                  value={
                    (validation.values?.address &&
                      validation.values.address.zipCode) ||
                    ""
                  }
                  invalid={
                    validation.touched.address &&
                    validation.touched.address.zipCode &&
                    validation.errors.address &&
                    validation.errors.address.zipCode
                      ? true
                      : false
                  }
                />
                {validation.touched.address &&
                validation.touched.address.zipCode &&
                validation.errors.address &&
                validation.errors.address.zipCode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address.zipCode}
                  </FormFeedback>
                ) : null}
              </>
            )}
          </FormGroup>
        </Col>
      </Row>

      <div className="d-flex flex-md-row justify-content-between">
        {!id ? (
          <Button color="primary" type="submit">
            Add Technician
          </Button>
        ) : id && !editPage ? null : (
          <Button color="primary" type="submit">
            Update Technician
          </Button>
        )}
        {id ? (
          <Link
            to={{
              pathname: "/addTechnician",
              search: "",
              hash: "",
              state: { type: "Technician", id: id },
            }}
          >
            <Button color="warning">Add Technician</Button>
          </Link>
        ) : null}
      </div>
    </Form>
  );
};

export default withRouter(withTranslation()(AddTechnicianInputs));
