import React, { useEffect, useState } from "react";
import BreadCrumb from "src/Components/Common/BreadCrumb";
import UiContent from "src/Components/Common/UiContent";
import { fetchZipCode, fetchAddress } from "src/helpers/AddressMethod/address";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import Notify from "src/common/Toaster/toast";
import { useParams } from "react-router-dom";
import { addTechnician } from "src/helpers/Technician";
import { addTechnicianForm } from "./addTechnicianForm";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { getVendorDropdown } from "src/helpers/Vendors";
import Loading from "src/common/Loader";
import AddTechnicianInputs from "./AddTechnicianInputs";

const AddTechnician = (props) => {
  const { id } = useParams();
  const [editPage, setEditPage] = useState(false);
  const [countryList] = useState([{ countryCode: "US" }]);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areaList, setAreaList] = useState([]);
  const { tags = [], userData = {} } = useSelector((state) => state.Login);
  const [vendorList, setVendorList] = useState([]);

  const isVendorRequired = tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)
    ? yup.string().required("vendor is required field")
    : yup.string().notRequired();
  const validationSchema = yup.object({
    user: yup.object().shape({
      firstName: yup.string().required("first name is required field"),
      lastName: yup.string().required("last name is required field"),
      username: yup.string().required("email is required field"),
      password: yup
        .string()
        .required("password is required field")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
        ),
    }),

    address: yup.object().shape({
      streetAddress1: yup.string().required("Address 1 is required field"),
      streetAddress2: yup.string().notRequired(),
      country: yup.string().required("country is required field"),
      state: yup.string().required("state is required field"),
      province: yup.string().required("city is required field"),
      place: yup.string().required("place is required field"),
      type: yup.string().notRequired(),
      zipCode: yup
        .string()
        .required("zip is required field")
        .max(7, "Zip Code should not be more than 7 character."),
    }),
    info: yup.object().shape({
      businessPhone: yup.string().required("business phone is required field"),
      personalPhone: yup.string().notRequired(),
      vendorId: isVendorRequired,
    }),
  });

  const validation = useFormik({
    initialValues: addTechnicianForm,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
      fetchVendors();
    } else {
      validation.setFieldValue("info.vendorId", userData.firstName);
    }
  }, [tags]);

  const fetchVendors = async () => {
    try {
      const response = await getVendorDropdown();
      setVendorList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {};
      values.address.type = "Billing";
      payload.address = [values.address];
      payload.user = values.user;
      payload.info = values.info;
      if (!tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN))
        payload.info.vendorId = "";
      const response = await addTechnician(payload);
      Notify(response.message || "Successfully added technician", true);
      setLoading(false);
      props.history.push(`/technicianDetail/${response.id}`);
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
            <BreadCrumb title="Add Technician" pageTitle="Technician" />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <AddTechnicianInputs
                        data={{
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
                        }}
                      />
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

export default AddTechnician;
