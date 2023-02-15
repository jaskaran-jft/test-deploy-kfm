import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";
import { withTranslation } from "react-i18next";
import { fetchTenant } from "../../../helpers/TenantMethod/tenant";
import {
  fetchZipCode,
  fetchAddress,
} from "../../../helpers/AddressMethod/address";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { string, number, object } from "yup";
import { useFormik } from "formik";
import { useParams, withRouter } from "react-router-dom";
import Notify from "../../../common/Toaster/toast";
import { ToastContainer } from "react-toastify";
import { addVendorForm } from "./addVendorForm";
import { addVendor, getTradesList } from "src/helpers/Vendors";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { fetchTenantList } from "src/helpers/ClientMethod/client";
import Loading from "src/common/Loader";
import AddVendorInputs from "./AddVendorInputs";

const AddVendor = (props) => {
  const { id } = useParams();
  const [editPage, setEditPage] = useState(false);
  const [countryList] = useState([{ countryCode: "US" }]);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags, userData } = useSelector((state) => state.Login);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [tradesList, setTradesList] = useState([]);

  useEffect(() => {
    fetchVendorTrades();
    if (tags && tags.length > 0) {
      const _isTenantPresent = tags.findIndex(
        (item) => item === CONSTANT.GET_TENANT_DROPDOWN,
      );
      if (_isTenantPresent !== -1) {
        getTenantList();
      } else {
        validation.setFieldValue("business.tenantId", userData.tenantId);
      }
    }
  }, []);

  const getTenantList = async () => {
    try {
      const response = await fetchTenantList();
      setTenantList(response || []);
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchVendorTrades = async () => {
    try {
      const response = await getTradesList();
      if (response) {
        const list = response.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setTradesList(list || []);
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTenantDetails();
    }
  }, [id]);

  const fetchTenantDetails = async () => {
    try {
      const response = await fetchTenant({ id: id });

      validation.setFieldValue("contact", response.contact);
      validation.setFieldValue("tenant", response.tenant);

      response &&
        response &&
        response.address.map((item, index) => {
          handleZipCodeChange(
            {
              target: {
                value: item.zipCode,
              },
            },
            index,
            response,
          );

          return null;
        });
    } catch (err) {
      setTimeout(() => {
        props.history.push("/addCorporate");
      }, 2000);
    }
  };

  const optionalParams = tags.includes(CONSTANT.GET_TENANT_DROPDOWN)
    ? { tenantId: string().required("tenant id is required") }
    : {};

  const validationSchema = object().shape({
    address: object().shape({
      streetAddress1: string().notRequired(),
      streetAddress2: string().notRequired(),
      country: string().required("country is required field"),
      state: string().required("state is required field"),
      province: string().required("city is required field"),
      place: string().required("place is required field"),
      zipCode: string()
        .required("zip is required field")
        .max(7, "Zip Code should not be more than 7 character."),
    }),
    user: object().shape({
      firstName: string().required("first name is required field"),
      lastName: string().required("last name is required field"),
      username: string().required("email is required field"),
      password: string()
        .required("password is required field")
        .min(
          8,
          "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special",
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
        ),
      ...optionalParams,
    }),
    business: object().shape({
      businessName: string().required("Business name is required field"),
      businessPhone: string().required("Business phone is required field"),
      faxNumber: string().notRequired(),
      personalPhone: string().required("Personal Number is required field"),
      billAs: string().notRequired(),
      tradeId: string().required("Trade is required"),
    }),
    vendorContract: object().shape({
      regular: number().notRequired(),
      afterHours: number().notRequired(),
      weekend: number().notRequired(),
      holiday: number().notRequired(),
      emergency: number().notRequired(),
      weekendEmergency: number().notRequired(),
      regularTripCharge: number().notRequired(),
      emergencyTripCharge: number().notRequired(),
      workRange: number().notRequired(),
    }),
  });

  const validation = useFormik({
    initialValues: addVendorForm,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values };
      payload.address.type = "Billing";
      payload.business.tradeId = selectedTrades.map((item) => item.value);
      const response = await addVendor(payload);
      Notify(response.message || "Successfully added vendor", true);
      setLoading(false);

      props.history.push(`/vendorDetail/${response.id}`);
    } catch (err) {
      Notify(err, false);
      setLoading(false);
      validation.setFieldValue(
        "business.tradeId",
        JSON.stringify(tradesList[0]),
      );
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
      item((prev) => {
        prev = [];
        return [...prev];
      });
      return null;
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

      listSet((prev) => {
        prev = response || [];

        return [...prev];
      });
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

        setAreaList((prev) => {
          prev = response.placeList || [];

          return [...prev];
        });

        setCityList((prev) => {
          prev = response.provinceList || [];

          return [...prev];
        });

        setStateList((prev) => {
          prev = response.stateList || [];

          return [...prev];
        });

        address.country = response.selectedAddress.country;
        address.state = response.selectedAddress.state;
        address.province = response.selectedAddress.province;
        address.place = response.selectedAddress.place;

        validation.setFieldValue("address", address);
      } catch (err) {
        setAreaList((prev) => {
          prev = [];

          return [...prev];
        });

        setCityList((prev) => {
          prev = [];

          return [...prev];
        });

        setStateList((prev) => {
          prev = [];

          return [...prev];
        });

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

  const handleChangeNumber = (e, value, country, name) => {
    value = value.toString();
    value = value.replace(/-/g, "");
    value = value.replace("+1 ", "");
    if (value.length > 10) {
      return false;
    }
    validation.setFieldValue(name, `${value}`);
    return `${value}`;
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
      return null;
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
              title={id ? "View Vendor" : "Add Vendor"}
              pageTitle="Vendor"
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <AddVendorInputs
                        data={{
                          validation,
                          setSubmit,
                          tags,
                          id,
                          editPage,
                          setEditPage,
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
                        }}
                      />
                    </div>
                    <div className="d-none code-view"></div>
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

export default withRouter(withTranslation()(AddVendor));
