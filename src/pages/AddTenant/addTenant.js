import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { withTranslation } from "react-i18next";

import {
  addTenant,
  checkDomainName,
  fetchTenant,
  updateTenant,
} from "../../helpers/TenantMethod/tenant";
import {
  fetchZipCode,
  fetchAddress,
} from "../../helpers/AddressMethod/address";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { object, string, array } from "yup";
import { useFormik } from "formik";
import { Link, useParams, withRouter } from "react-router-dom";
import Notify from "../../common/Toaster/toast";
import { ToastContainer } from "react-toastify";
import Loading from "src/common/Loader";
import { tenantInitialValues } from "./utils";
import AddTenantInputs from "./AddTenantInputs";
import { debounce } from "src/helpers/format_helper";

const AddCorporate = (props) => {
  const { id } = useParams();
  const [checkDomain, setCheckDomain] = useState(false);
  const [addressTypeList, setAddressTypeList] = useState([
    {
      value: "Corporate",
      label: "Corporate Address",
      isSelected: true,
    },
    {
      value: "Billing",
      label: "Billing Address",
      isSelected: true,
    },
    {
      value: "Invoice",
      label: "Invoice Address",
      isSelected: false,
    },
    {
      value: "Other",
      label: "Other Address",
      isSelected: false,
    },
  ]);
  // const [logo, setLogo] = useState("");
  // const [openCrop, setOpenCrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [imgUpload, setImgUpload] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const initialValue = tenantInitialValues;

  const [editPage, setEditPage] = useState(false);

  const [countryList] = useState([{ countryCode: "US" }]);
  const [cityList, setCityList] = useState([[], []]);
  const [stateList, setStateList] = useState([[], []]);
  const [areaList, setAreaList] = useState([[], []]);
  const addNewAddress = () => {
    if (validation.values.address.length < addressTypeList.length) {
      let address = [
        ...validation.values.address,
        {
          streetAddress1: "",
          streetAddress2: "",
          country: "",
          state: "",
          province: "",
          place: "",
          zipCode: "",
          type: "",
          email: "",
        },
      ];

      setCityList((prev) => {
        return [...prev, []];
      });
      setStateList((prev) => {
        return [...prev, []];
      });
      setAreaList((prev) => {
        return [...prev, []];
      });
      validation.setFieldValue("address", address);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTenantDetails();
    }
  }, [id]);

  const deleteAddress = (index, previous) => {
    let address = validation.values.address;

    if (address[index].type !== "" && address.length > 2) {
      setAddressTypeList((prev) => {
        const result = prev.map((item) => {
          if (item.value === previous.type) {
            return {
              value: item.value,
              label: item.label,
              isSelected: false,
            };
          } else {
            return item;
          }
        });
        return result;
      });
    }

    if (address.length > 2) {
      address.splice(index, 1);

      setCityList((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
      setStateList((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
      setAreaList((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
      validation.setFieldValue("address", address);
    }
  };
  const fetchTenantDetails = async () => {
    try {
      const response = await fetchTenant({ id: id });

      validation.setFieldValue("contact", response.contact);
      validation.setFieldValue("tenant", response.tenant);

      response &&
        response?.address.map((item, index) => {
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
  const handleTypeChange = (e, index, previous) => {
    let address = validation.values.address;

    setAddressTypeList((prev) => {
      const result = prev.map((item) => {
        if (item.value === e.target.value) {
          return {
            value: item.value,
            label: item.label,
            isSelected: true,
          };
        } else if (previous === item.value) {
          return {
            value: item.value,
            label: item.label,
            isSelected: false,
          };
        } else {
          return item;
        }
      });
      return result;
    });

    address[index].type = e.target.value;

    validation.setFieldValue("address", address);
  };

  const validationSchema = object({
    tenant: object().shape({
      domainName: string()
        .required("Domain Name is required field")
        .matches(
          /^[a-z0-9.]+$/,
          "Should not contain special character and capital letters",
        ),
      name: string().required("Name is required field"),
      shortCode: string()
        .required("Short Code is required field")
        .max(10, "Short Code should not be more than 10 character.")
        .matches(/^[A-Z0-9]+$/, "Should Contains only uppercase character"),
    }),
    contact: object().shape({
      primaryContactName: string().required("Contact Name is required field"),
      primaryContactEmail: string()
        .required("Contact Email is required field")
        .email("Invalid Email Address"),

      email: string().email().required("Email is required field"),
      primaryContactPhone: string().required(
        "Primary Contact Phone is required field",
      ),
      // .min(13, "Phone number is too short (should be 10 digits)"),
      telephone: string().required("Telephone is required field"),
      // .min(13, "Phone number is too short (should be 10 digits)"),
      dialInNumber: string().required("Dial In IVR Number is required field"),
      // .min(13, "Phone number is too short (should be 10 digits)"),
      cellphone: string()
        // .min(13, "Cellphone is too short (should be 10 digits)")
        .nullable(),
    }),
    address: array().of(
      object().shape({
        streetAddress1: string().required("Address 1 is required field"),
        country: string().required("country is required field"),
        state: string().required("state is required field"),
        province: string().required("city is required field"),
        place: string().required("place is required field"),
        zipCode: string()
          .required("zip is required field")
          .max(7, "Zip Code should not be more than 7 character."),
        type: string().required("type is required field"),
        email: string()
          .required("email is required")
          .email("Invalid Email")
          .nullable(),
      }),
    ),
  });
  const validation = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      values.contact.telephone = formatNumber(values.contact.telephone);
      values.contact.primaryContactPhone = formatNumber(
        values.contact.primaryContactPhone,
      );
      values.contact.dialInNumber = formatNumber(values.contact.dialInNumber);
      values.contact.cellphone = formatNumber(values.contact.cellphone);
      const response = editPage
        ? await updateTenant({ ...values, logo: imgUpload })
        : await addTenant({ ...values, logo: imgUpload });
      Notify(response.message || "Success", true);
      // props.history.push(`/viewCorporate`);
      setLoading(false);

      if (!editPage) {
        props.history.push(`/editCorporate/${response.id}`);
      }

      if (id) setEditPage(!editPage);
    } catch (err) {
      Notify(err, false);
      setLoading(false);
    }
  };

  const handleCheck = (e) => {
    setIsChecked((prev) => !prev);
    if (!isChecked && !id) {
      Object.keys(validation.values?.address[0]).map((_) => {
        if (_ !== "type") {
          validation.setFieldValue(
            `address[1]${[_]}`,
            validation.values?.address[0][_],
          );
        }
      });

      setCityList((prev) => {
        prev[1] = prev[0] || [];
        return prev;
      });
      setStateList((prev) => {
        prev[1] = prev[0] || [];
        return prev;
      });
      setAreaList((prev) => {
        prev[1] = prev[0] || [];
        return prev;
      });
    }
  };

  ////////////////////// address functions /////////////////
  const handleLocationChange = async (
    e,
    index,
    key,
    api,
    objCode,
    listSet,
    resetList,
    resetValue,
  ) => {
    let address = validation.values.address;

    address[index][key] = e.target.value;

    address[index][key] = e.target.value;

    resetList.map((item) => {
      item((prev) => {
        prev[index] = [];
        return [...prev];
      });
      return null;
    });

    resetValue.map((item) => {
      address[index][item] = "";
    });

    try {
      let dataToSend = {};
      objCode.map((code) => {
        dataToSend[code] = address[index][code];
        return null;
      });

      const response = await api(dataToSend);

      listSet((prev) => {
        prev[index] = response || [];

        return [...prev];
      });
      validation.setFieldValue("address", address);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAreaChange = async (e, index, key) => {
    let address = validation.values.address;
    address[index][key] = e.target.value;

    try {
      const response = await fetchZipCode({
        place: e.target.value,
        province: address[index].province,
        state: address[index].state,
      });
      address[index].zipCode = response.zipCode;
      validation.setFieldValue("address", address);
    } catch (err) {
      console.log(err);
      validation.setFieldValue("address", address);
    }
  };

  const handleZipCodeChange = async (e, index, response) => {
    let address = response ? response.address : validation.values.address;
    address[index].zipCode = e.target.value;

    if (e.target.value.length > 3 && e.target.value.length < 7) {
      try {
        const response = await fetchAddress({
          zipCode: e.target.value,
        });

        setAreaList((prev) => {
          prev[index] = response.placeList || [];

          return [...prev];
        });

        setCityList((prev) => {
          prev[index] = response.provinceList || [];

          return [...prev];
        });

        setStateList((prev) => {
          prev[index] = response.stateList || [];

          return [...prev];
        });

        address[index].country = response.selectedAddress.country;
        address[index].state = response.selectedAddress.state;
        address[index].province = response.selectedAddress.province;
        address[index].place = response.selectedAddress.place;

        validation.setFieldValue("address", address);
      } catch (err) {
        setAreaList((prev) => {
          prev[index] = [];

          return [...prev];
        });

        setCityList((prev) => {
          prev[index] = [];

          return [...prev];
        });

        setStateList((prev) => {
          prev[index] = [];

          return [...prev];
        });

        address[index].country = "";
        address[index].state = "";
        address[index].province = "";
        address[index].place = "";

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
  const formatNumber = (value) => {
    if (value) {
      value = value.toString();
      value = value.replace("+1 ", "");
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      return `+1 ${value}`;
    }
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

  const handleDomainNameChange = async (e) => {
    let newData = {
      ...validation.values.tenant,
      domainName: e.target.value,
    };
    validation.setFieldValue("tenant", newData);
    searchRequest.current(e.target.value);
  };

  const searchRequest = useRef(
    debounce((value) => {
      checkDomainExist(value);
    }, 1000),
  );

  const checkDomainExist = async (value) => {
    try {
      await checkDomainName({ domainName: value });
      setCheckDomain(true);
    } catch (err) {
      setCheckDomain(false);
    }
  };

  const handleEditChange = () => {
    let tenant = validation.values.tenant;
    tenant.domainName = tenant?.domainName.split(".")[0];
    validation.setFieldValue("tenant", tenant);
    setEditPage(!editPage);
  };

  const imageUpload = (files) => {
    if (files.length !== 0) {
      setImgUpload(URL.createObjectURL(files[0]));

      setOpenModal(true);
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
              title={id ? "Corporate Details" : "Add Corporate"}
              pageTitle="Corporate"
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <AddTenantInputs
                        data={{
                          validation,
                          imgUpload,
                          editPage,
                          id,
                          openModal,
                          setOpenModal,
                          setImgUpload,
                          imageUpload,
                          handleEditChange,
                          handleDomainNameChange,
                          checkDomain,
                          handleChangeNumber,
                          handleContactValidation,
                          initialValue,
                          addressTypeList,
                          setStateList,
                          setAreaList,
                          setCityList,
                          handleLocationChange,
                          handleZipCodeChange,
                          handleCheck,
                          deleteAddress,
                          handleTypeChange,
                          countryList,
                          stateList,
                          areaList,
                          cityList,
                          handleAreaChange,
                          addNewAddress,
                          isChecked,
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

export default withRouter(withTranslation()(AddCorporate));
