import React, { useEffect, useState } from "react";
import { businessObject, businessPayload } from "./utils";
import { Col, Form, Input, Label, Row } from "reactstrap";
import IntlTelInput from "react-intl-tel-input";
import { updateVendorInfo } from "src/helpers/Vendors";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";

const SubInfo = (props) => {
  const [business, setBusiness] = useState(businessObject);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);

  const { data = {} } = props;

  useEffect(() => {
    const payload = {
      businessName: data?.businessName || "",
      businessPhone: data?.businessPhone || "",
      personalPhone: data?.personalPhone || "",
      faxNumber: data?.faxNumber || "",
      accountingEmail: data?.accountingEmail || "",
      description: data?.description || "",
      apNumber: data?.apNumber || "",
    };

    setBusiness(payload);
  }, [data]);

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  const resetBusinessDetails = (e) => {
    e.preventDefault();
    setBusiness(JSON.parse(JSON.stringify(businessObject)));
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

  const saveBusinessDetails = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await updateVendorInfo(
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

  return (
    <React.Fragment>
      <Form>
        {!edit && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
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
          <Row>
            {!edit && (
              <p>
                Business Name :{" "}
                {data.businessName || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="businessName" className="form-label">
                    Business Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="businessName"
                    name="businessName"
                    placeholder="Enter your business name"
                    value={business.businessName || ""}
                    onChange={handleBusinessChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Business Mobile :{" "}
                {data?.businessPhone || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
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
              <Col md="3">
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
              <Col md="3">
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
                Accounting Email Address :{" "}
                {data.accountingEmail || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="accountingEmail" className="form-label">
                    Accounting Email Address
                  </Label>
                  <Input
                    type="email"
                    name="accountingEmail"
                    className="form-control"
                    id="accountingEmail"
                    placeholder="Enter your accounting email address"
                    value={business.accountingEmail || ""}
                    onChange={handleBusinessChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Description :{" "}
                {data.description || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="description" className="form-label">
                    Description
                  </Label>
                  <Input
                    type="text"
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Enter your description"
                    value={business.description || ""}
                    onChange={handleBusinessChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Number of Technicians :{" "}
                {data.noOfTechnician || <i className="text-danger">0</i>}
              </p>
            )}

            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Vendor AP Number :{" "}
                {data.apNumber || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="apNumber" className="form-label">
                    Vendor AP Number
                  </Label>
                  <Input
                    type="text"
                    name="apNumber"
                    className="form-control"
                    id="apNumber"
                    placeholder="Enter your Vendor AP Number  "
                    value={business.apNumber || ""}
                    onChange={handleBusinessChange}
                  />
                </div>
              </Col>
            )}
          </Row>
        )}
        {edit && !loading && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
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
    </React.Fragment>
  );
};

export default SubInfo;
