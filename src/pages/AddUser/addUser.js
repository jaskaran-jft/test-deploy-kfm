import React, { useEffect, useState, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import IntlTelInput from "react-intl-tel-input";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import { useFormik } from "formik";
import {
  addStoreUser,
  fetchClientList,
  fetchStore,
  fetchStoreList,
  fetchCorporateList,
} from "../../helpers/StoreMethod/store";
import Notify from "../../common/Toaster/toast";
import { object, string } from "yup";
import { addClientUser } from "../../helpers/ClientMethod/client";
import { addTenantUser } from "../../helpers/TenantMethod/tenant";
import { TagsContext } from "../../Routes";
import { useSelector } from "react-redux";
import Loading from "src/common/Loader";
import { CONSTANT } from "src/utils/constant";

const AddUser = (props) => {
  const [list, setList] = useState([]);
  const { userData } = useSelector((state) => state.Login);

  const [storeList, setStoreList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(props?.location?.state?.id || "");
  const [logo, setLogo] = useState("");
  const { tags } = useContext(TagsContext);
  const initialValues = {
    user: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      clientId: "",
      storeId: "",
      tenantId: "",
    },

    contact: {
      primaryContactEmail: "",
      ext: "",
      primaryContactPhone: "",
    },
  };
  const getClientList = async () => {
    fetchClientList()
      .then(async (data) => {
        setClientList(data || []);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const getStoreList = async () => {
    fetchStoreList()
      .then(async (data) => {
        setStoreList(data || []);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getCorporateList = async () => {
    fetchCorporateList()
      .then(async (data) => {
        setList(data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    console.log({ props });
    if (props.data === "Client" && id === "") getClientList();
    if (props.data === "Store" && id === "") getStoreList();
    if (
      props.data === "Corporate" &&
      tags.indexOf("Get_Tenant_Dropdown") !== -1
    ) {
      getCorporateList();
    } else if (
      props.data === "Corporate" &&
      tags.indexOf("Get_Tenant_Dropdown") === -1 &&
      !id
    ) {
      setId(userData.tenantId || "");
    }
  }, []);

  const validationSchema = object({
    user: object().shape({
      firstName: string().required("First name is required field"),
      lastName: string().required("Last name is required field"),
      username: string()
        .required("Username is required field")
        .email("Invalid Email"),
      password: string()
        .required("Password Field is required")
        .matches(
          /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
          "Must contain at least 8 characters and up to 20 characters with one uppercase, lowercase, numeric and special characters.",
        )
        .max(20, "Should be less than 20 character"),
      tenantId:
        props.data === "Corporate" &&
        tags.indexOf("Get_Tenant_Dropdown") !== -1 &&
        !id
          ? string().required("Please select a Brand")
          : "",
      clientId:
        tags.includes("Get_Client_Dropdown") && props.data === "Client" && !id
          ? string().required("Please select a Brand")
          : "",
      storeId:
        tags.includes("Get_Store_Dropdown") && props.data === "Store" && !id
          ? string().required("Please select a Site")
          : "",
    }),
    contact: object().shape({
      primaryContactEmail: string()
        .required("Contact Email is required field")
        .email("Invalid Email Address"),
      primaryContactPhone: string().required(
        "Primary Contact Phone is required field",
      ),
    }),
  });

  const validation = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
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
  const handleCheckboxChange = () => {
    validation.setFieldValue(
      "user.isManager",
      !validation.values.user.isManager,
    );
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (
        props.data === "Corporate" &&
        tags.indexOf("Get_Tenant_Dropdown") !== -1 &&
        id
      ) {
        values.user.tenantId = id;
      }

      if (props.data === "Client" && id) {
        values.user.clientId = id;
      }
      if (props.data === "Store") {
        values.user["isManager"] = values.user.isManager || false;
        if (id) {
          values.user.storeId = id;
        }
      }

      const response =
        props.data === "Store"
          ? await addStoreUser({ ...values, logo })
          : props.data === "Client"
          ? await addClientUser({ ...values, logo })
          : await addTenantUser({ ...values, logo });

      Notify(response.message || "Success", true);
      setLoading(false);
      validation.resetForm();
      setLogo("");

      props.data === "Corporate"
        ? props.history.push(`/tenantUserDetails/${response.id}`)
        : props.data === "Client"
        ? props.history.push(`/clientUserDetails/${response.userId}`)
        : props.history.push(`/storeUserDetails/${response.userId}`);
    } catch (err) {
      Notify(err, false);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <UiContent />
      {loading ? (
        <Loading />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb title={`Add User`} pageTitle="User" />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <Form
                        className="needs-validation"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <h5 className="pb-3">General Info</h5>

                          {props.data === "Client" &&
                            tags.includes(CONSTANT.IMPORT_CLIENT_USERS) && (
                              <Button
                                onClick={(e) =>
                                  props.history.push("/importClientUser")
                                }
                                color="primary"
                              >
                                Import Brand User
                              </Button>
                            )}

                          {props.data === "Store" &&
                            tags.includes(CONSTANT.IMPORT_STORE_USERS) && (
                              <Button
                                onClick={(e) =>
                                  props.history.push("/importStoreUser")
                                }
                                 color="primary"
                              >
                                Import Site User
                              </Button>
                            )}

                          {/* {
                          <LogoModal
                            saveCroppedLogo={(updatedImage) =>
                              setLogo(updatedImage)
                            }
                            logo={logo}
                            title="Upload Profile Picture"
                          />
                        } */}
                        </div>
                        <Row>
                          {props.data === "Corporate" &&
                            tags.indexOf("Get_Tenant_Dropdown") !== -1 && (
                              <Col md="3">
                                <FormGroup className="mb-3">
                                  <Label>Corporate *</Label>
                                  <>
                                    <Input
                                      type="select"
                                      name="user.tenantId"
                                      placeholder="Select Corporate"
                                      className="form-control"
                                      onChange={validation.handleChange}
                                      onKeyDown={validation.handleBlur}
                                      value={
                                        validation.values.user.tenantId || ""
                                      }
                                      invalid={
                                        validation.touched.user?.tenantId &&
                                        validation.errors.user?.tenantId
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">Select Corporate</option>
                                      {list.length > 0 &&
                                        list.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                    </Input>

                                    {validation.touched.user?.tenantId &&
                                    validation.errors.user?.tenantId ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.user?.tenantId}
                                      </FormFeedback>
                                    ) : null}
                                  </>
                                </FormGroup>
                              </Col>
                            )}

                          {props.data === "Client" &&
                            id === "" &&
                            tags.includes("Get_Client_Dropdown") && (
                              <Col md="3">
                                <FormGroup className="mb-3">
                                  <Label>Brand *</Label>
                                  <>
                                    <Input
                                      type="select"
                                      name="user.clientId"
                                      placeholder="Select Brand"
                                      className="form-control"
                                      onChange={validation.handleChange}
                                      onKeyDown={validation.handleBlur}
                                      value={
                                        validation.values.user.clientId || ""
                                      }
                                      invalid={
                                        validation.touched.user?.clientId &&
                                        validation.errors.user?.clientId
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">Select Brand</option>
                                      {clientList.length > 0 &&
                                        clientList.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                    </Input>

                                    {validation.touched.user?.clientId &&
                                    validation.errors.user?.clientId ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.user?.clientId}
                                      </FormFeedback>
                                    ) : null}
                                  </>
                                </FormGroup>
                              </Col>
                            )}

                          {tags.includes("Get_Store_Dropdown") &&
                            props.data === "Store" &&
                            id === "" && (
                              <Col md="3">
                                <FormGroup className="mb-3">
                                  <Label>Site *</Label>
                                  <>
                                    <Input
                                      type="select"
                                      name="user.storeId"
                                      placeholder="Select Site"
                                      className="form-control"
                                      onChange={validation.handleChange}
                                      onKeyDown={validation.handleBlur}
                                      value={
                                        validation.values.user.storeId || ""
                                      }
                                      invalid={
                                        validation.touched.user?.storeId &&
                                        validation.errors.user?.storeId
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">Select Site</option>
                                      {storeList.length > 0 &&
                                        storeList.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.storeName}
                                          </option>
                                        ))}
                                    </Input>

                                    {validation.touched.user?.storeId &&
                                    validation.errors.user?.storeId ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.user?.storeId}
                                      </FormFeedback>
                                    ) : null}
                                  </>
                                </FormGroup>
                              </Col>
                            )}

                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>First Name *</Label>
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
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Last Name *</Label>
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
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>E-mail *</Label>
                              <Input
                                name="user.username"
                                placeholder="Enter Username *"
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
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Password *</Label>
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
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr></hr>
                        <h5 className="pb-3">Primary contact info</h5>

                        <Row>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Primary contact email *</Label>
                              <Input
                                name="contact.primaryContactEmail"
                                placeholder="Enter Primary contact email *"
                                type="text"
                                className="form-control"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={
                                  validation.values.contact
                                    ?.primaryContactEmail || ""
                                }
                                invalid={
                                  validation.touched.contact
                                    ?.primaryContactEmail &&
                                  validation.errors.contact?.primaryContactEmail
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.contact
                                ?.primaryContactEmail &&
                              validation.errors.contact?.primaryContactEmail ? (
                                <FormFeedback type="invalid">
                                  {
                                    validation.errors.contact
                                      ?.primaryContactEmail
                                  }
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Primary Contact Phone *</Label>
                              <IntlTelInput
                                containerClassName="intl-tel-input"
                                name="contact.primaryContactPhone"
                                inputClassName={`form-control ${
                                  validation.touched.contact
                                    ?.primaryContactPhone &&
                                  validation.values.contact
                                    ?.primaryContactPhone === ""
                                    ? "is-invalid"
                                    : ""
                                }`}
                                style={{ width: "100%" }}
                                onPhoneNumberChange={(e, value, country) =>
                                  handleChangeNumber(
                                    e,
                                    value,
                                    country,
                                    "contact.primaryContactPhone",
                                  )
                                }
                                onPhoneNumberBlur={(e, value, country) =>
                                  handleContactValidation(
                                    e,
                                    value,
                                    country,
                                    "contact.primaryContactPhone",
                                  )
                                }
                                formatOnInit
                                value={
                                  validation.values.contact
                                    ?.primaryContactPhone ||
                                  initialValues.contact.primaryContactPhone
                                }
                                onlyCountries={["us", "ca", "pr"]}
                                defaultCountry={"us"}
                                length={10}
                                preferredCountries={["us"]}
                                invalid={
                                  validation.values.contact?.primaryContactPhone
                                    .length < 1 ||
                                  (validation.touched.contact
                                    ?.primaryContactPhone &&
                                  validation.errors.contact?.primaryContactPhone
                                    ? true
                                    : false)
                                }
                              />
                              {validation.touched.contact
                                ?.primaryContactPhone &&
                              validation.errors.contact?.primaryContactPhone ? (
                                <FormFeedback type="invalid">
                                  {
                                    validation.errors.contact
                                      ?.primaryContactPhone
                                  }
                                </FormFeedback>
                              ) : null}
                            </FormGroup>
                          </Col>

                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Ext.</Label>
                              <Input
                                name="contact.ext"
                                placeholder="Enter Ext."
                                type="text"
                                className="form-control"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.contact?.ext || ""}
                              />
                            </FormGroup>
                          </Col>
                          {props.data === "Store" ? (
                            <Col md="3">
                              <FormGroup
                                check
                                className="h-100 d-flex align-items-center"
                              >
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    checked={validation.values.user.isManager}
                                    name="user.isManager"
                                    onChange={() => handleCheckboxChange()}
                                  />{" "}
                                  MANAGER
                                </Label>
                              </FormGroup>
                            </Col>
                          ) : null}
                        </Row>

                        <Button color="primary" type="submit">
                          Add User
                        </Button>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddUser;
