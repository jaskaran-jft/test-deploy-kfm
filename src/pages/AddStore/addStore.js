import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import IntlTelInput from "react-intl-tel-input";

import {
  addStore,
  fetchStore,
  fetchClientList,
} from "../../helpers/StoreMethod/store";
import {
  fetchStateList,
  fetchCityList,
  fetchAreaList,
  fetchZipCode,
  fetchAddress,
} from "../../helpers/AddressMethod/address";

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
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import Notify from "../../common/Toaster/toast";
import { Link, useParams } from "react-router-dom";
import Loading from "src/common/Loader";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";

const AddStore = (props) => {
  const { id } = useParams();
  const [clientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const initialValue = {
    address: {
      streetAddress1: "",
      streetAddress2: "",
      country: "",
      state: "",
      province: "",
      place: "",
      zipCode: "",
      type: "Store",
    },
    store: {
      storeName: "",
      mall: "",
    },
    contact: {
      // phoneNumber: '',
      primaryContactPhone: "",
      // email: '',
      primaryContactEmail: "",
      ext: "",
    },
    clientId: userData.clientId || "",
  };
  useEffect(() => {
    if (id) {
      fetchStoreDetails();
    }
  }, [id]);
  const [editPage, setEditPage] = useState(false);
  const [countryList] = useState([{ countryCode: "US" }]);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const fetchStoreDetails = async () => {
    try {
      const response = await fetchStore({ id: id });

      validation.setFieldValue("contact", response.contact);
      validation.setFieldValue("store", response.store);

      validation.setFieldValue("clientId", response.clientId);

      handleZipCodeChange(
        {
          target: {
            value: response?.address?.zipCode || "",
          },
        },

        response,
      );
    } catch (err) {
      console.log("err is", err);
      setTimeout(() => {
        props.history.push("/addStore");
      }, 2000);
    }
  };

  useEffect(() => {
    fetchClientList()
      .then((res) => {
        setClientList(res || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = yup.object({
    clientId: tags.includes(CONSTANT.GET_CLIENT_DROPDOWN)
      ? yup.string().required("Brand is required field")
      : yup.string().notRequired(),
    store: yup.object().shape({
      storeName: yup.string().required("Site Name is required field"),
      mall: yup.string().notRequired(),
    }),
    contact: yup.object().shape({
      primaryContactPhone: yup
        .string()
        .required("Phone Number is required field"),
      // .min(15, "Phone number is too short (should be 10 digits)"),
      primaryContactEmail: yup
        .string()
        .email()
        .required("Email is required field"),
    }),
    address: yup.object().shape({
      streetAddress1: yup.string().required("Address 1 is required field"),
      country: yup.string().required("country is required field"),
      state: yup.string().required("state is required field"),
      province: yup.string().required("city is required field"),
      place: yup.string().required("place is required field"),
      zipCode: yup
        .string()
        .required("zip is required field")
        .max(7, "Zip Code should not be more than 7 character."),
      // type: yup.string().required('type is required field')
    }),
  });

  const validation = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("values", values);
      handleSubmit(values);
    },
  });
  const formatNumber = (value) => {
    if (value) {
      value = value.toString();
      value = value.replace("+1 ", "");
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      return `+1 ${value}`;
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (userData.clientId) values.clientID = userData.clientId;
      values.contact.primaryContactPhone = formatNumber(
        values.contact.primaryContactPhone,
      );
      const response = await addStore({ ...values });

      Notify(response.message || "Success", true);
      if (!id) {
        setTimeout(() => {
          props.history.push(`/editStore/${response.id}`);
        }, 1500);
      }

      setEditPage(false);
      setLoading(false);
    } catch (err) {
      Notify(err || "Something went wrong!!", false);
      setLoading(false);
    }
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
  ////////////////////// address functions /////////////////
  const handleLocationChange = async (
    e,

    key,
    api,
    objCode,
    listSet,
    resetList,
    resetValue,
  ) => {
    let address = validation.values.address;

    address[key] = e.target.value;

    address[key] = e.target.value;

    resetList.map((item) => {
      item([]);
    });

    resetValue.map((item) => {
      address[item] = "";
    });

    try {
      let dataToSend = {};
      objCode.map((code) => {
        dataToSend[code] = address[code];
        return null;
      });

      const response = await api(dataToSend);

      listSet(response || []);
      validation.setFieldValue("address", address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAreaChange = async (e, key) => {
    let address = validation.values.address;
    address[key] = e.target.value;

    try {
      const response = await fetchZipCode({
        place: e.target.value,
        province: address.province,
        state: address.state,
      });
      address.zipCode = response.zipCode;
      validation.setFieldValue("address", address);
    } catch (err) {
      console.log(err);
      validation.setFieldValue("address", address);
    }
  };

  const handleZipCodeChange = async (e, response) => {
    let address = response ? response.address : validation.values.address;
    address.zipCode = e.target.value;

    if (e.target.value.length > 3 && e.target.value.length < 7) {
      try {
        const response = await fetchAddress({
          zipCode: e.target.value,
        });

        setAreaList(response.placeList || []);

        setCityList(response.provinceList || []);

        setStateList(response.stateList || []);

        address.country = response.selectedAddress.country;
        address.state = response.selectedAddress.state;
        address.province = response.selectedAddress.province;
        address.place = response.selectedAddress.place;

        validation.setFieldValue("address", address);
      } catch (err) {
        setAreaList([]);

        setCityList([]);

        setStateList([]);

        address.country = "";
        address.state = "";
        address.province = "";
        address.place = "";

        validation.setFieldValue("address", address);
      }
    } else {
      validation.setFieldValue("address", address);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <UiContent />
      {loading ? (
        <Loading />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb
              title={id ? "Site Details" : "Add Site"}
              pageTitle="Site"
            />

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
                        <div
                          className={`d-flex justify-content-between ${
                            id ? "flex-row-reverse" : ""
                          }`}
                        >
                          {!id &&
                            !editPage &&
                            tags.includes(CONSTANT.IMPORT_STORES) && (
                              <Row className="w-100">
                                <Col>
                                  <h5 className="pb-3">General Info</h5>
                                </Col>
                                <Col className="d-flex flex-row-reverse">
                                  <Button
                                    onClick={(e) =>
                                      props.history.push("/importStores")
                                    }
                                    color="primary"
                                  >
                                    Import Sites
                                  </Button>
                                </Col>
                              </Row>
                            )}
                          {id ? (
                            editPage ? (
                              <div
                                className="d-flex flex-row-reverse"
                                onClick={() => setEditPage(!editPage)}
                                style={{ cursor: "pointer" }}
                              >
                                {/* <div color="success">Done icon</div> */}
                                {/* <i className="bx bxs-check-circle bx-sm text-success"></i> */}
                              </div>
                            ) : (
                              <div
                                onClick={() => setEditPage(!editPage)}
                                title="Edit"
                                style={{ cursor: "pointer" }}
                              >
                                {/* <div color="primary">Edit icon</div> */}
                                <i className="bx bxs-edit-alt bx-sm text-primary"></i>
                              </div>
                            )
                          ) : null}
                        </div>
                        <Row>
                          {tags.includes(CONSTANT.GET_CLIENT_DROPDOWN) && (
                            <Col md="3">
                              <FormGroup className="mb-3">
                                <Label>Brand {editPage ? "*" : ""} </Label>
                                {id && !editPage ? (
                                  <h6>
                                    {clientList.filter(
                                      (item) =>
                                        item.id === validation.values.clientId,
                                    )[0]?.name || "--"}
                                  </h6>
                                ) : (
                                  <>
                                    <Input
                                      type="select"
                                      name="clientId"
                                      placeholder="Select Brand *"
                                      className="form-control"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values?.clientId || ""}
                                      invalid={
                                        validation.touched?.clientId &&
                                        validation.errors?.clientId
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="">Select Brand *</option>
                                      {clientList.map((option) => (
                                        <option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                    </Input>
                                    {validation.touched?.clientId &&
                                    validation.errors?.clientId ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors?.clientId}
                                      </FormFeedback>
                                    ) : null}
                                  </>
                                )}
                              </FormGroup>
                            </Col>
                          )}
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Site Name {editPage ? "*" : ""} </Label>
                              {id && !editPage ? (
                                <h6>
                                  {validation.values.store?.storeName || "--"}
                                </h6>
                              ) : (
                                <>
                                  <Input
                                    name="store.storeName"
                                    placeholder="Enter Site Name *"
                                    type="text"
                                    className="form-control"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                      validation.values.store?.storeName || ""
                                    }
                                    invalid={
                                      validation.touched.store?.storeName &&
                                      validation.errors.store?.storeName
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.store?.storeName &&
                                  validation.errors.store?.storeName ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.store?.storeName}
                                    </FormFeedback>
                                  ) : null}
                                </>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Mall</Label>
                              {id && !editPage ? (
                                <h6>{validation.values.store?.mall || "--"}</h6>
                              ) : (
                                <>
                                  <Input
                                    name="store.mall"
                                    placeholder="Enter Mall"
                                    type="text"
                                    className="form-control"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.store?.mall || ""}
                                    invalid={
                                      validation.touched.store?.mall &&
                                      validation.errors.store?.mall
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.store?.mall &&
                                  validation.errors.store?.mall ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.store?.mall}
                                    </FormFeedback>
                                  ) : null}
                                </>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr></hr>
                        <h5 className="pb-3">Primary contact info</h5>

                        <Row>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>
                                Primary Contact Email {editPage ? "*" : ""}{" "}
                              </Label>
                              {id && !editPage ? (
                                <h6>
                                  {validation.values.contact
                                    ?.primaryContactEmail || "--"}
                                </h6>
                              ) : (
                                <>
                                  <Input
                                    name="contact.primaryContactEmail"
                                    placeholder="Enter Primary Contact Email *"
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
                                      validation.errors.contact
                                        ?.primaryContactEmail
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.contact
                                    ?.primaryContactEmail &&
                                  validation.errors.contact
                                    ?.primaryContactEmail ? (
                                    <FormFeedback type="invalid">
                                      {
                                        validation.errors.contact
                                          ?.primaryContactEmail
                                      }
                                    </FormFeedback>
                                  ) : null}
                                </>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>
                                Primary Contact Phone {editPage ? "*" : ""}{" "}
                              </Label>
                              {id && !editPage ? (
                                <h6>
                                  {validation.values.contact
                                    ?.primaryContactPhone || "--"}
                                </h6>
                              ) : (
                                <>
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
                                      initialValue.contact.primaryContactPhone
                                    }
                                    onlyCountries={["us", "ca", "pr"]}
                                    defaultCountry={"us"}
                                    length={10}
                                    preferredCountries={["us"]}
                                    invalid={
                                      validation.values.contact
                                        ?.primaryContactPhone?.length < 1 ||
                                      (validation.touched.contact
                                        ?.primaryContactPhone &&
                                      validation.errors.contact
                                        ?.primaryContactPhone
                                        ? true
                                        : false)
                                    }
                                  />
                                  {validation.touched.contact
                                    ?.primaryContactPhone &&
                                  validation.errors.contact
                                    ?.primaryContactPhone ? (
                                    <FormFeedback
                                      type="invalid"
                                      className="d-block"
                                    >
                                      {
                                        validation.errors.contact
                                          ?.primaryContactPhone
                                      }
                                    </FormFeedback>
                                  ) : null}
                                </>
                              )}
                            </FormGroup>
                          </Col>

                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>Ext.</Label>
                              {id && !editPage ? (
                                <h6>
                                  {validation.values.contact?.ext || "--"}
                                </h6>
                              ) : (
                                <>
                                  <Input
                                    name="contact.ext"
                                    placeholder="Enter Ext."
                                    type="text"
                                    className="form-control"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.contact?.ext || ""}
                                  />
                                </>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr></hr>
                        <h5 className="pb-3">Site address</h5>

                        <Row>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>
                                Street Address (1) {editPage ? "*" : ""}{" "}
                              </Label>
                              {id && !editPage ? (
                                <h6>
                                  {(validation.values?.address &&
                                    validation.values?.address
                                      ?.streetAddress1) ||
                                    "--"}
                                </h6>
                              ) : (
                                <>
                                  <Input
                                    name="address.streetAddress1"
                                    placeholder="Enter Street Address (1) *"
                                    type="text"
                                    className="form-control"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                      (validation.values?.address &&
                                        validation.values.address
                                          .streetAddress1) ||
                                      ""
                                    }
                                    invalid={
                                      validation.touched.address &&
                                      validation.touched.address
                                        .streetAddress1 &&
                                      validation.errors.address &&
                                      validation.errors.address.streetAddress1
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.address &&
                                  validation.touched.address.streetAddress1 &&
                                  validation.errors.address &&
                                  validation.errors.address.streetAddress1 ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.address.streetAddress1}
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
                                    validation.values.address
                                      ?.streetAddress2) ||
                                    "--"}
                                </h6>
                              ) : (
                                <>
                                  <Input
                                    name="address.streetAddress2"
                                    placeholder="Enter Street Address (2)"
                                    type="text"
                                    className="form-control"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={
                                      (validation.values?.address &&
                                        validation.values.address
                                          .streetAddress2) ||
                                      ""
                                    }
                                    invalid={
                                      validation.touched.addres &&
                                      validation.touched.address
                                        .streetAddress2 &&
                                      validation.errors.address &&
                                      validation.errors.address.streetAddress2
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.address &&
                                  validation.touched.address.streetAddress2 &&
                                  validation.errors.address &&
                                  validation.errors.address.streetAddress2 ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.address.streetAddress2}
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
                                        [
                                          setStateList,
                                          setAreaList,
                                          setCityList,
                                        ],
                                        [
                                          "state",
                                          "province",
                                          "place",
                                          "zipCode",
                                        ],
                                      );
                                    }}
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
                              <Label>State {editPage ? "*" : ""} </Label>
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
                                    {stateList?.map((option) => (
                                      <option
                                        key={option.state}
                                        value={option.state}
                                      >
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
                        </Row>
                        <Row>
                          <Col md="3">
                            <FormGroup className="mb-3">
                              <Label>City {editPage ? "*" : ""} </Label>
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
                                    {cityList?.map((option) => (
                                      <option
                                        key={option.province}
                                        value={option.province}
                                      >
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
                              <Label>Area {editPage ? "*" : ""} </Label>
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
                                    onChange={(e) =>
                                      handleAreaChange(e, "place")
                                    }
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
                                    {areaList?.map((option) => (
                                      <option
                                        key={option.place}
                                        value={option.place}
                                      >
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
                              <Label>Zip Code {editPage ? "*" : ""} </Label>
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
                              Add Site
                            </Button>
                          ) : id && !editPage ? null : (
                            <Button color="primary" type="submit">
                              Update Site
                            </Button>
                          )}
                        </div>

                        {id && !editPage && (
                          <Row>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() =>
                                    props.history.push({
                                      pathname: "/addStoreUser",
                                      search: "",
                                      hash: "",
                                      state: { type: "Store", id: id },
                                    })
                                  }
                                >
                                  Add Site User
                                </button>
                              </div>
                            </Col>
                          </Row>
                        )}
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

export default AddStore;
