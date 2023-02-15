import { Fragment } from "react";
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
import { withTranslation } from "react-i18next";

import IntlTelInput from "react-intl-tel-input";
import { CONSTANT } from "src/utils/constant";
import AddVendorTrades from "./AddVendorTrades";
import { withRouter } from "react-router-dom";
import AddVendorRates from "./AddVendorRates";
import AddVendorAddress from "./addVendorAddress";

const AddVendorInputs = (props) => {
  const {
    validation,
    setSubmit,
    tags,
    id,
    editPage,
    submit,
    tenantList,
    setSelectedTrades,
    selectedTrades,
    handleChangeNumber,
    handleContactValidation,
    addVendorForm,
    tradesList,
  } = props.data;

  return (
    <Fragment>
      <Form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          setSubmit(true);
          return;
        }}
      >
        <h5 className="pb-3">General info</h5>

        <Row>
          {tags.findIndex((item) => item === CONSTANT.GET_TENANT_DROPDOWN) !==
            -1 && (
            <Col md="3">
              <FormGroup className="mb-3">
                <Label>Tenant *</Label>
                {id && !editPage ? (
                  <h6>
                    {(validation.values?.user &&
                      validation.values?.user?.tenantId) ||
                      "--"}
                  </h6>
                ) : (
                  <>
                    <Input
                      type="select"
                      name={`user.tenantId`}
                      placeholder="Select tenantId *"
                      className="form-control"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={
                        (validation.values?.user &&
                          validation.values?.user?.tenantId) ||
                        ""
                      }
                      invalid={
                        validation.touched?.user &&
                        validation.touched?.user?.tenantId &&
                        validation.errors?.user &&
                        validation.errors?.user?.tenantId
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Tenant *</option>
                      {tenantList.length > 0 &&
                        tenantList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                    </Input>
                    {validation.touched?.user &&
                    validation.touched?.user?.tenantId &&
                    validation.errors.user &&
                    validation.errors?.user?.tenantId ? (
                      <FormFeedback type="invalid">
                        {validation.errors?.user &&
                          validation.errors?.user?.tenantId}
                      </FormFeedback>
                    ) : null}
                  </>
                )}
              </FormGroup>
            </Col>
          )}

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
              <Label>Personal Mobile *</Label>
              {id && !editPage ? (
                <h6>{validation.values.business?.personalPhone || "--"}</h6>
              ) : (
                <>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="business.personalPhone"
                    inputClassName={`form-control ${
                      validation.touched.business?.personalPhone &&
                      validation.values.business?.personalPhone === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(
                        e,
                        value,
                        country,
                        "business.personalPhone",
                      )
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "business.personalPhone",
                      )
                    }
                    formatOnInit
                    value={
                      validation.values.business?.personalPhone ||
                      addVendorForm.business.personalPhone
                    }
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                    invalid={
                      validation.values.business?.personalPhone < 1 ||
                      (validation.touched.business?.personalPhone &&
                      validation.errors.business?.personalPhone
                        ? true
                        : false)
                    }
                  />
                  {validation.touched.business?.personalPhone &&
                  validation.errors.business?.personalPhone ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.business?.personalPhone}
                    </FormFeedback>
                  ) : null}
                </>
              )}
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Email Address *</Label>
              {id && !editPage ? (
                <h6>{validation.values?.user.username || "--"}</h6>
              ) : (
                <>
                  <Input
                    name="user.username"
                    placeholder="Enter Email Address *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={
                      (validation.values?.user &&
                        validation.values?.user.username) ||
                      ""
                    }
                    invalid={
                      validation.touched?.user &&
                      validation.touched?.user.username &&
                      validation.errors?.user &&
                      validation.errors?.user.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched?.user &&
                  validation.touched?.user.username &&
                  validation.errors?.user &&
                  validation.errors?.user.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors?.user.username}
                    </FormFeedback>
                  ) : null}
                </>
              )}
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Password *</Label>

              <>
                <Input
                  name="user.password"
                  placeholder="Password *"
                  type="password"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    (validation.values?.user?.password &&
                      validation.values.user.password) ||
                    ""
                  }
                  invalid={
                    validation.touched?.user?.password &&
                    validation.touched.user?.password &&
                    validation.errors?.user?.password &&
                    validation.errors.user?.password
                      ? true
                      : false
                  }
                />
                {validation.touched?.user?.password &&
                validation.touched.user?.password &&
                validation.errors?.user?.password &&
                validation.errors?.user?.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors?.user.password}
                  </FormFeedback>
                ) : null}
              </>
            </FormGroup>
          </Col>
        </Row>

        <hr></hr>
        <h5 className="pb-3">Business Details : </h5>

        <Row>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Business Name (As Per W9) *</Label>
              {id && !editPage ? (
                <h6>
                  {(validation.values?.business &&
                    validation.values.business?.name) ||
                    "--"}
                </h6>
              ) : (
                <>
                  <Input
                    name="business.businessName"
                    placeholder="Enter Business Name *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={
                      (validation.values?.business &&
                        validation.values.business?.businessName) ||
                      ""
                    }
                    invalid={
                      validation.touched?.business &&
                      validation.touched.business?.businessName &&
                      validation.errors?.business &&
                      validation.errors.business?.businessName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.business &&
                  validation.touched.business?.businessName &&
                  validation.errors.business &&
                  validation.errors.business?.businessName ? (
                    <FormFeedback type="invalid">
                      {validation.errors?.business &&
                        validation.values.business?.businessName}
                    </FormFeedback>
                  ) : null}
                </>
              )}
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Business Phone (Main) *</Label>
              {id && !editPage ? (
                <h6>{validation.values.business?.businessPhone || "--"}</h6>
              ) : (
                <>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="business.businessPhone"
                    inputClassName={`form-control ${
                      validation.touched.business?.businessPhone &&
                      validation.values.business?.businessPhone === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(
                        e,
                        value,
                        country,
                        "business.businessPhone",
                      )
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "business.businessPhone",
                      )
                    }
                    formatOnInit
                    value={
                      validation.values.business?.businessPhone ||
                      addVendorForm.business.businessPhone
                    }
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                    invalid={
                      validation.values.business?.businessPhone?.length < 1 ||
                      (validation.touched.business?.businessPhone &&
                      validation.errors.business?.businessPhone
                        ? true
                        : false)
                    }
                  />

                  {validation.touched.business?.businessPhone &&
                  validation.errors.business?.businessPhone ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.business?.businessPhone}
                    </FormFeedback>
                  ) : null}
                </>
              )}
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup className="mb-3">
              <Label>Fax Number</Label>
              {id && !editPage ? (
                <h6>{validation.values.business?.faxNumber || "--"}</h6>
              ) : (
                <>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="business.faxNumber"
                    inputClassName={`form-control `}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(
                        e,
                        value,
                        country,
                        "business.faxNumber",
                      )
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "business.faxNumber",
                      )
                    }
                    formatOnInit
                    value={
                      validation.values.business?.faxNumber ||
                      addVendorForm.business.faxNumber
                    }
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                  />
                </>
              )}
            </FormGroup>
          </Col>
        </Row>
        <hr></hr>
        <h5 className="pb-3">Billing address</h5>
        <AddVendorAddress {...props.data} />
        <hr></hr>
        <h5 className="pb-3">Trade Details</h5>
        <AddVendorTrades
          data={{
            validation,
            id,
            editPage,
            submit,
            setSelectedTrades,
            selectedTrades,
            tradesList,
          }}
        />
        <hr></hr>
        <h5 className="pb-3">Rates</h5>
        <AddVendorRates validation={validation} />
        <Row className="p-3 mt-3"></Row>
        <div className="d-flex flex-md-row justify-content-between">
          {!id ? (
            <Button color="primary" type="submit">
              Add Vendor
            </Button>
          ) : id && !editPage ? null : (
            <Button color="primary" type="submit">
              Update Vendor
            </Button>
          )}
        </div>
      </Form>
    </Fragment>
  );
};

export default withRouter(withTranslation()(AddVendorInputs));
