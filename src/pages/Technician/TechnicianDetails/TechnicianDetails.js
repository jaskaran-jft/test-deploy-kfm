import React, { Fragment, useEffect, useState } from "react";
import { Badge, Col, Form, Input, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import { getVendorDropdown } from "src/helpers/Vendors";
import { technicianBusinessObject } from "./utils";
import { updateTechnicianInfo } from "src/helpers/Technician";
import { businessPayload } from "src/pages/Vendor/VendorDetails/utils";
import IntlTelInput from "react-intl-tel-input";

const TechnicianDetails = (props) => {
  const { tags } = useSelector((state) => state.Login);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [business, setBusiness] = useState(technicianBusinessObject);

  const { data = {} } = props;
  const { address = [], vendorInfo = {} } = data;

  useEffect(() => {
    const payload = {
      vendorId: vendorInfo.vendorId || "",
      businessPhone: data.businessPhone || "",
      personalPhone: data.personalPhone || "",
      faxNumber: data.faxNumber || "",
      creditCard: data.creditCard || "",
    };

    setBusiness(payload);

    if (tags.includes(CONSTANT.GET_SUBCONTRACTOR_DROPDOWN)) {
      fetchVendors();
    }
  }, [data, tags, vendorInfo]);

  const fetchVendors = async () => {
    try {
      const response = await getVendorDropdown();
      setVendorList(response);
    } catch (error) {
      console.log({ error });
    }
  };

  const saveBusinessDetails = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await updateTechnicianInfo(
        businessPayload(business),
        data.id,
      );
      if (response) {
        Notify(response.message || "Success", true);
        setEdit(false);
        setLoading(false);
        props.update();
      }
    } catch (error) {
      Notify(error || "Error", false);
      setLoading(false);
    }
  };

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const resetBusinessDetails = (e) => {
    e.preventDefault();
    setBusiness(JSON.parse(JSON.stringify(technicianBusinessObject)));
    setEdit(false);
  };

  const handleChangeNumber = (e, value, country, name) => {
    value = value.toString();
    value = value.replace(/-/g, "");
    value = value.replace("+1 ", "");
    if (value.length > 10) {
      return false;
    }
    setBusiness((prev) => ({ ...prev, [name]: value }));
    return `${value}`;
  };

  const handleContactValidation = (e, value, country, name) => {
    value = value.toString();
    if (value.length > 0) {
      value = value.replace("+1 ", "");
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      setBusiness((prev) => ({ ...prev, [name]: `+1 ${value}` }));
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      {!edit && !loading && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
        <div className="d-flex align-items-center mb-2">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0"></h5>
          </div>
          <div className="flex-shrink-0">
            <Link
              onClick={() => setEdit(true)}
              className="badge bg-light text-primary fs-12"
            >
              <i className="ri-edit-box-line align-bottom me-1"></i> Edit
            </Link>
          </div>
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Form>
          <Row>
            {!edit && (
              <p>
                Vendor :{" "}
                {vendorInfo?.name || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="businessPhone" className="form-label">
                    Vendor
                  </Label>
                  <Input
                    type="select"
                    name="vendorId"
                    id="vendorId"
                    placeholder="Select Vendor"
                    className="form-control"
                    onChange={handleBusinessChange}
                    value={business.vendorId || ""}
                  >
                    <option value="">Select Vendor</option>
                    {vendorList.length > 0 &&
                      vendorList.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                  </Input>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}{" "}
            {!edit && (
              <p>
                Business Mobile :{" "}
                {data?.businessPhone || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="businessPhone" className="form-label">
                    Business Phone
                  </Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="businessPhone"
                    inputClassName={`form-control `}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(e, value, country, "businessPhone")
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "businessPhone",
                      )
                    }
                    formatOnInit
                    value={business.businessPhone || ""}
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Personal Mobile :{" "}
                {data?.personalPhone || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="personalPhone" className="form-label">
                    Personal Mobile
                  </Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="personalPhone"
                    inputClassName={`form-control `}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(e, value, country, "personalPhone")
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(
                        e,
                        value,
                        country,
                        "personalPhone",
                      )
                    }
                    formatOnInit
                    value={business.personalPhone || ""}
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Fax Number :{" "}
                {data?.faxNumber || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="faxNumber" className="form-label">
                    Fax Number
                  </Label>
                  <IntlTelInput
                    containerClassName="intl-tel-input"
                    name="faxNumber"
                    inputClassName={`form-control `}
                    style={{ width: "100%" }}
                    onPhoneNumberChange={(e, value, country) =>
                      handleChangeNumber(e, value, country, "faxNumber")
                    }
                    onPhoneNumberBlur={(e, value, country) =>
                      handleContactValidation(e, value, country, "faxNumber")
                    }
                    formatOnInit
                    value={business.faxNumber || ""}
                    onlyCountries={["us", "ca", "pr"]}
                    defaultCountry={"us"}
                    length={10}
                    preferredCountries={["us"]}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Credit Card :{" "}
                {data?.creditCard || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="creditCard" className="form-label">
                    Credit Card
                  </Label>
                  <Input
                    type="text"
                    name="creditCard"
                    className="form-control"
                    id="creditCard"
                    placeholder="Enter your credit card"
                    value={business.creditCard || ""}
                    onChange={handleBusinessChange}
                  />
                </div>
              </Col>
            )}
          </Row>
          {edit &&
            !loading &&
            tags.includes(CONSTANT.UPDATE_TECHNICIAN_INFO) && (
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveBusinessDetails}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft-danger"
                    onClick={resetBusinessDetails}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            )}
        </Form>
      )}
    </Fragment>
  );
};

export default TechnicianDetails;
