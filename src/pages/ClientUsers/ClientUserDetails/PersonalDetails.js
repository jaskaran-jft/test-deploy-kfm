import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import Notify from "src/common/Toaster/toast";
import IntlTelInput from "react-intl-tel-input";
// import "react-intl-tel-input/dist/main.css";
import FormModal from "src/Components/Common/FormModal";
import { useFormik } from "formik";
import { string, object } from "yup";
import { formatNumber } from "src/helpers/format_helper";
import Loading from "src/common/Loader";
import { updateClientUserDetails } from "src/helpers/ClientMethod/client";

export default function PersonalInfo(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);

  const { details = {} } = props;

  const validationSchema = object().shape({
    user: object().shape({
      firstName: string().required("First name is required field"),
      lastName: string().notRequired(),
      username: string().email().required("Username is required"),
    }),
    contact: object().shape({
      primaryContactEmail: string()
        .email()
        .required("Primary Contact Email is required field"),
      primaryContactPhone: string().required(
        "Primary Contact Phone is required field"
      ),
      ext: string().notRequired(),
    }),
  });

  const validation = useFormik({
    initialValues: {
      user: {
        firstName: "",
        lastName: "",
        username: "",
      },
      contact: {
        primaryContactEmail: "",
        primaryContactPhone: "",
        ext: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await updateClientUserDetails(values, details.id);
      Notify(response.message || "Success", true);
      props.update();
      setLoading(false);
    } catch (error) {
      Notify(error, false);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (activeTab === "1") {
      validation.setFieldValue("user.firstName", details.firstName || "");
      validation.setFieldValue("user.lastName", details.lastName || "");
      validation.setFieldValue("user.username", details.username || "");

      validation.setFieldValue(
        "contact.primaryContactEmail",
        details.contact?.primaryContactEmail || ""
      );
      validation.setFieldValue(
        "contact.primaryContactPhone",
        formatNumber(details.contact?.primaryContactPhone || "")
      );
      validation.setFieldValue("contact.ext", details.contact?.ext || "");
    }

    setEdit(true);
  };

  const toggle = () => {
    setEdit((prev) => !prev);
  };

  const handleChangeNumber = (e, value, country, name) => {
    value = value.toString();
    value = value.replace(/-/g, "");
    value = value.replace("+1 ", "");
    if (value.length > 10) {
      return false;
    }
    validation.setFieldValue(name, `${value}`);
  };

  const handleContactValidation = (e, value, country, name) => {
    value = value.toString();
    if (value.length > 0) {
      value = value.replace("+1 ", "");
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      validation.setFieldValue(name, `+1 ${value}`);
    } else {
      validation.setFieldTouched(name, true);
      validation.setErrors({ [name]: true });
    }
  };

  return (
    <React.Fragment>
      {!edit && !loading && tags.includes(CONSTANT.CLIENT_USER_UPDATE) && (
        <div className="d-flex align-items-center mb-2">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0"></h5>
          </div>
          <div className="flex-shrink-0">
            <Link
              onClick={handleEdit}
              className="badge bg-light text-primary fs-12"
            >
              <i className="ri-edit-box-line align-bottom me-1"></i> Edit
            </Link>
          </div>
        </div>
      )}
      <FormModal open={edit} toggle={toggle} title={"Edit Details"}>
        {loading ? (
          <Loading />
        ) : (
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <Row>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>First Name *</Label>
                  <Input
                    name="user.firstName"
                    placeholder="First Name *"
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
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Last Name *</Label>
                  <Input
                    name="user.lastName"
                    placeholder="Last Name *"
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
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Email *</Label>
                  <Input
                    name="user.username"
                    placeholder="Email *"
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
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Primary contact Phone *</Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="contact.primaryContactPhone"
                    inputClassName={`form-control ${
                      validation.touched?.contact?.primaryContactPhone &&
                      validation.values?.contact?.primaryContactPhone === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(
                        e,
                        value,
                        country,
                        "contact.primaryContactPhone"
                      )
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "contact.primaryContactPhone"
                      )
                    }
                    formatOnInit
                    value={
                      validation.values?.contact?.primaryContactPhone || ""
                    }
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                    invalid={
                      (validation.values?.contact?.primaryContactPhone &&
                        validation.values?.contact?.primaryContactPhone.length <
                          1) ||
                      (validation.touched?.contact?.primaryContactPhone &&
                      validation.errors?.contact?.primaryContactPhone
                        ? true
                        : false)
                    }
                  />
                  {validation.touched?.contact?.primaryContactPhone &&
                  validation.errors?.contact?.primaryContactPhone ? (
                    <FormFeedback type="invalid">
                      {validation.errors?.contact?.primaryContactPhone}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Primary Contact Email *</Label>
                  <Input
                    name="contact.primaryContactEmail"
                    placeholder="Primary Contact Email *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.contact?.primaryContactEmail || ""}
                    invalid={
                      validation.touched.contact?.primaryContactEmail &&
                      validation.errors.contact?.primaryContactEmail
                        ? true
                        : false
                    }
                  />
                  {validation.touched.contact?.primaryContactEmail &&
                  validation.errors.contact?.primaryContactEmail ? (
                    <FormFeedback type="invalid">
                      {validation.errors.contact?.primaryContactEmail}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Ext</Label>
                  <Input
                    name="contact.ext"
                    placeholder="Ext"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.contact?.ext || ""}
                    invalid={
                      validation.touched.contact?.ext &&
                      validation.errors.contact?.ext
                        ? true
                        : false
                    }
                  />
                  {validation.touched.contact?.ext &&
                  validation.errors.contact?.ext ? (
                    <FormFeedback type="invalid">
                      {validation.errors.contact?.ext}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex flex-md-row justify-content-end">
              <Button color="primary" type="submit" style={{ marginRight: 20 }}>
                Save
              </Button>
              <Button
                color="danger"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                  validation.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </FormModal>
      <Form>
        <Row>
          <p>
            First Name :{" "}
            {details?.firstName || <i className="text-danger">Empty</i>}
          </p>

          <hr></hr>
          <p>
            Last Name :{" "}
            {details?.lastName || <i className="text-danger">Empty</i>}
          </p>
          <hr></hr>

          <p>
            Username :{" "}
            {details?.username || <i className="text-danger">Empty</i>}
          </p>
          <hr></hr>

          <p>
            Primary Contact Phone :{" "}
            {details?.contact?.primaryContactPhone || (
              <i className="text-danger">Empty</i>
            )}
          </p>

          <hr></hr>
          <p>
            Primary Contact Email :{" "}
            {details.contact?.primaryContactEmail || (
              <i className="text-danger">Empty</i>
            )}
          </p>

          <hr></hr>
          <p>
            Ext : {details.contact?.ext || <i className="text-danger">Empty</i>}
          </p>
        </Row>
      </Form>
    </React.Fragment>
  );
}
