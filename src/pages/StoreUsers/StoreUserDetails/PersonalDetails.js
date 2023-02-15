import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfilePhoto from "../../../assets/images/user-illustarator-1.png";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  Row,
} from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import Notify from "src/common/Toaster/toast";
import IntlTelInput from "react-intl-tel-input";
import FormModal from "src/Components/Common/FormModal";
import { useFormik } from "formik";
import { string, object } from "yup";
import { updateStoreUserDetails } from "src/helpers/StoreMethod/store";
import Loading from "src/common/Loader";
import { formatNumber } from "src/helpers/format_helper";

export default function PersonalInfo(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const obj = useState({
    username: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    ext: "",
  })[0];

  const { details = {} } = props;

  const validationSchema = object().shape({
    username: string().required("username is required field"),
    primaryContactEmail: string()
      .email()
      .required("Primary Contact Email is required field"),
    primaryContactPhone: string().required(
      "Primary Contact Phone is required field"
    ),
    ext: string().notRequired(),
  });

  const validation = useFormik({
    initialValues: obj,
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
      const response = await updateStoreUserDetails(values, details.id);
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
      validation.setFieldValue("username", details.username);
      validation.setFieldValue(
        "primaryContactEmail",
        details.contact?.primaryContactEmail
      );
      validation.setFieldValue(
        "primaryContactPhone",
        formatNumber(details.contact?.primaryContactPhone)
      );
      validation.setFieldValue("ext", details.contact?.ext);
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
      {!edit && !loading && tags.includes(CONSTANT.STORE_USER_UPDATE) && (
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
                  <Label>Username *</Label>
                  <Input
                    name="username"
                    placeholder="Username *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Primary contact Phone *</Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="primaryContactPhone"
                    inputClassName={`form-control ${
                      validation.touched?.primaryContactPhone &&
                      validation.values?.primaryContactPhone === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(
                        e,
                        value,
                        country,
                        "primaryContactPhone"
                      )
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "primaryContactPhone"
                      )
                    }
                    formatOnInit
                    value={validation.values?.primaryContactPhone || ""}
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                    invalid={
                      (validation.values?.primaryContactPhone &&
                        validation.values?.primaryContactPhone.length < 1) ||
                      (validation.touched?.primaryContactPhone &&
                      validation.errors?.primaryContactPhone
                        ? true
                        : false)
                    }
                  />
                  {validation.touched?.primaryContactPhone &&
                  validation.errors?.primaryContactPhone ? (
                    <FormFeedback type="invalid">
                      {validation.errors?.primaryContactPhone}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Primary Contact Email *</Label>
                  <Input
                    name="primaryContactEmail"
                    placeholder="Primary Contact Email *"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.primaryContactEmail || ""}
                    invalid={
                      validation.touched.primaryContactEmail &&
                      validation.errors.primaryContactEmail
                        ? true
                        : false
                    }
                  />
                  {validation.touched.primaryContactEmail &&
                  validation.errors.primaryContactEmail ? (
                    <FormFeedback type="invalid">
                      {validation.errors.primaryContactEmail}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className="mb-3">
                  <Label>Ext</Label>
                  <Input
                    name="ext"
                    placeholder="Ext"
                    type="text"
                    className="form-control"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.ext || ""}
                    invalid={
                      validation.touched.ext && validation.errors.ext
                        ? true
                        : false
                    }
                  />
                  {validation.touched.ext && validation.errors.ext ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ext}
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
      <Row>
        <p>
          First Name :{" "}
          {details.firstName || <i className="text-danger">Empty</i>}
        </p>
        <hr></hr>
        <p>
          Last Name : {details.lastName || <i className="text-danger">Empty</i>}
        </p>
        <hr></hr>
        <p>
          Username : {details?.username || <i className="text-danger">Empty</i>}
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
          Primary Contact Phone :{" "}
          {details.contact?.primaryContactPhone || (
            <i className="text-danger">Empty</i>
          )}
        </p>
        <hr></hr>
        <p>
          Ext : {details.contact?.ext || <i className="text-danger">Empty</i>}
        </p>
      </Row>
    </React.Fragment>
  );
}
