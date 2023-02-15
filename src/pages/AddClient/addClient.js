import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import {
  addClient,
  fetchClient,
  fetchTenantList,
} from "../../helpers/ClientMethod/client";
import {
  fetchZipCode,
  fetchAddress,
} from "../../helpers/AddressMethod/address";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { object, string, array } from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import Notify from "../../common/Toaster/toast";
import { ToastContainer } from "react-toastify";
import { withTranslation } from "react-i18next";
import Loading from "src/common/Loader";
import AddClientInputs from "./AddClientInputs";

const AddClient = (props) => {
  const { id } = useParams();
  const { domain } = useSelector((state) => state.Login);
  const [tenantList, setTenantList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addressTypeList, setAddressTypeList] = useState([
    {
      value: "Client",
      label: "Brand Address",
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

  const [logo, setLogo] = useState("");
  const [editPage, setEditPage] = useState(false);

  const [countryList] = useState([{ countryCode: "US" }]);
  const [cityList, setCityList] = useState([[], []]);
  const [stateList, setStateList] = useState([[], []]);
  const [areaList, setAreaList] = useState([[], []]);

  const [tenantName, setTenantName] = useState("");

  const domainName = domain?.name || "";
  const initialValue = {
    client: {
      tenantId: domain.id || "",
      name: "",
      shortCode: "",
    },
    contact: {
      email: "",
      website: "",
      dialInInstruction: "",
      dialInNotes: "",
      primaryContactName: "",
      primaryContactEmail: "",
      ext: "",
      primaryContactPhone: "",
      telephone: "",
      cellphone: "",
      dialInNumber: "",
    },
    address: [
      {
        streetAddress1: "",
        streetAddress2: "",
        country: "",
        state: "",
        province: "",
        place: "",
        zipCode: "",
        type: "Client",
        email: "",
      },
      {
        streetAddress1: "",
        streetAddress2: "",
        country: "",
        state: "",
        province: "",
        place: "",
        zipCode: "",
        type: "Billing",
        email: "",
      },
    ],
  };

  useEffect(() => {
    if (id) {
      fetchClientDetails();
    }
  }, [id]);

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
    if (domain?.id) {
      validation.setFieldValue("client.tenantId", domain?.id);
    }

    if (domain?.name) {
      setTenantName(domain?.name);
    }
  }, [domain]);

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

  const imageUpload = (files) => {
    if (files.length !== 0) {
      setLogo(URL.createObjectURL(files[0]));

      setOpenModal(true);
    }
  };

  useEffect(() => {
    fetchTenantList()
      .then((res) => {
        setTenantList(res || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchClientDetails = async () => {
    try {
      const response = await fetchClient({ id: id });

      validation.setFieldValue("contact", response.contact);
      validation.setFieldValue("client", response.client);

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

      setTenantName(response?.requiredTenat?.name || "");
    } catch (err) {
      setTimeout(() => {
        props.history.push("/addClient");
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
    client: object().shape({
      tenantId: string().required("Corporate is required field"),
      name: string().required("Name is required field"),
      shortCode: string()
        .required("Short Code is required field")
        .max(10, "Short Code should not be more than 10 character.")
        .matches(/^[A-Z0-9]+$/, "Should Contains only uppercase character"),
    }),
    contact: object().shape({
      primaryContactName: string().required(
        "Primary Contact Name is required field",
      ),
      primaryContactEmail: string()
        .required("Primary Contact Email is required field")
        .email("Invalid Email Address"),
      email: string()
        .email("Invaild email address")
        .required("Email is required field"),
      primaryContactPhone: string().required(
        "Primary Contact Phone is required field",
      ),
      // .min(13, "Phone number is too short (should be 10 digits)"),
      telephone: string().required("Telephone is required field"),
      // .min(13, "Phone number is too short (should be 10 digits)"),
      dialInNumber: string().required("Dial In IVR number is required field"),
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
        email: string().required("email is required").email("Invalid Email"),
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
      values.contact.telephone = formatNumber(values.contact.telephone);
      values.contact.primaryContactPhone = formatNumber(
        values.contact.primaryContactPhone,
      );
      values.contact.dialInNumber = formatNumber(values.contact.dialInNumber);
      values.contact.cellphone = formatNumber(values.contact.cellphone);
      const response = await addClient({ ...values, logo });
      Notify(response.message || "Success", true);
      props.history.push(`/editClient/${response.id}`);
      setLoading(false);

      if (id) setEditPage(!editPage);

      // if (!id) {
      //   setTimeout(() => {
      //     props.history.push(`/editClient/${response.clientId}`);
      //   }, 1500);
      // }
    } catch (err) {
      Notify(err, false);
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

        // Toaster(err?.response?.data?.message || "Something went wrong", false);
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer closeOnClick></ToastContainer>
      <UiContent />
      {loading ? (
        <Loading />
      ) : (
        <div className="page-content">
          <Container fluid={true}>
            <BreadCrumb
              title={id ? "Brand Details" : "Add Brand"}
              pageTitle={props.t("Brand")}
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="live-preview">
                      <AddClientInputs
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
                          handleCheck,
                          handleContactValidation,
                          handleSubmit,
                          handleTypeChange,
                          handleZipCodeChange,
                          domain,
                          domainName,
                          id,
                          editPage,
                          openModal,
                          setOpenModal,
                          imageUpload,
                          logo,
                          setEditPage,
                          initialValue,
                          setLogo,
                          handleLocationChange,
                          addressTypeList,
                          addNewAddress,
                          isChecked,
                          setIsChecked,
                          deleteAddress,
                          tenantName,
                          tenantList,
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

export default withRouter(withTranslation()(AddClient));
