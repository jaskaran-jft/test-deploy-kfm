import { Fragment, useEffect, useMemo, useState } from "react";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import { Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { addressObject } from "./utils";
import { useFormik } from "formik";
import { updateVendorAddress } from "src/helpers/Vendors";
import {
  fetchAddress,
  fetchAreaList,
  fetchCityList,
  fetchStateList,
  fetchZipCode,
} from "src/helpers/AddressMethod/address";

const VendorAddressComponent = (props) => {
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const countryList = useState([{ countryCode: "US" }])[0];
  const [billingCityList, setBillingCityList] = useState([]);
  const [billingStateList, setBillingStateList] = useState([]);
  const [billingAreaList, setBillingAreaList] = useState([]);

  const { data = {} } = props;
  const { address = [] } = data;

  const vendorAddress = useMemo(
    () => address.find((item) => item.type === props.type) || {},
    [address, props.type],
  );

  const validationSchema = object({
    address: object().shape({
      streetAddress1: string().required("Address 1 is required field"),
      streetAddress2: string().notRequired(),
      country: string().required("country is required field"),
      state: string().required("state is required field"),
      province: string().required("city is required field"),
      place: string().required("place is required field"),
      zipCode: string()
        .required("zip is required field")
        .max(7, "Zip Code should not be more than 7 character."),
    }),
  });

  const addressValidation = useFormik({
    initialValues: addressObject,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  
  const handleSubmit = (values) => {
    console.log({ values });
  };

  useEffect(() => {
    setVendorInitialAddress();
  }, []);

  const setVendorInitialAddress = () => {
    //logic
    handleZipCodeChange(
      { target: { value: vendorAddress.zipCode } },
      undefined,
      setBillingAreaList,
      setBillingCityList,
      setBillingStateList,
      addressValidation.values?.address,
      saveVendorAddress,
      vendorAddress,
    );
  };

  const saveVendorAddress = (address) => {
    addressValidation.setFieldValue("address", address);
  };

  const handleLocationChange = async (
    e,
    key,
    api,
    objCode,
    listSet,
    resetList,
    resetValue,
    addressValue,
    setAddressValue,
  ) => {
    let address = addressValue; // validation.values.address;

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

      setAddressValue(address);
      // validation.setFieldValue("address", address);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleZipCodeChange = async (
    e,
    response,
    setAreaList,
    setCityList,
    setStateList,
    addressValue,
    setAddressValue,
    vendorAddress,
  ) => {
    let address = response ? response.address : addressValue;
    address.zipCode = e.target.value;

    console.log("address", address);

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
        if (vendorAddress) {
          address.streetAddress1 = vendorAddress.streetAddress1;
          address.streetAddress2 = vendorAddress.streetAddress2;
        }

        address.zipCode = e.target.value;
        console.log("address 12", address);
        setAddressValue(address);
      } catch (err) {
        setAreaList([]);

        setCityList([]);

        setStateList([]);

        address.country = "";
        address.state = "";
        address.province = "";
        address.place = "";
        address.zipCode = "";
        setAddressValue(address);
      }
    } else {
      setAddressValue(address);
    }
  };

  const handleAreaChange = async (e, key, addressValue, setAddressValue) => {
    let address = addressValue;
    address[key] = e.target.value;

    try {
      const response = await fetchZipCode({
        place: e.target.value,
        province: address.province,
        state: address.state,
      });
      address.zipCode = response.zipCode;
      setAddressValue(address);
    } catch (err) {
      console.log(err);
      setAddressValue(address);
    }
  };

  const handleVendorAddress = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = { ...addressValidation.values?.address };
      payload.type = props.type;
      const response = await updateVendorAddress(payload, data.id);
      if (response) {
        Notify(response.message || "Success", true);
        setEdit(false);
        setLoading(false);

        props.update();
      }
    } catch (error) {
      console.log("error", error);
      Notify(error || "Error", false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  return (
    <Fragment>
      <Form>
        {!edit && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
          <div className="d-flex align-items-center mb-2">
            <div className="flex-grow-1">
              <h5 className="card-title mb-0"></h5>
            </div>
            <div className="flex-shrink-0">
              <Link
                onClick={() => {
                  setVendorInitialAddress();
                  setEdit(true);
                }}
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
          <Row className="">
            {edit && (
              <>
                <Col md="4">
                  <div className="mb-3">
                    <Label htmlFor="country" className="form-label">
                      Country
                    </Label>
                    <>
                      <Input
                        type="select"
                        name="address.country"
                        placeholder="Select Country *"
                        className="form-control"
                        onBlur={addressValidation.handleBlur}
                        value={
                          (addressValidation.values?.address &&
                            addressValidation.values?.address.country) ||
                          ""
                        }
                        invalid={
                          addressValidation.touched?.address &&
                          addressValidation.touched?.address.country &&
                          addressValidation.errors?.address &&
                          addressValidation.errors?.address.country
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          handleLocationChange(
                            e,
                            "country",
                            fetchStateList,
                            ["country"],
                            setBillingStateList,
                            [
                              setBillingStateList,
                              setBillingAreaList,
                              setBillingCityList,
                            ],
                            ["state", "province", "place", "zipCode"],
                            addressValidation.values?.address,
                            saveVendorAddress,
                          );
                        }}
                      >
                        <option value="">Select Country *</option>
                        {countryList.map((option, index) => (
                          <option key={index} value={option.countryCode}>
                            {option.countryCode}
                          </option>
                        ))}
                      </Input>
                      {addressValidation.touched?.address &&
                      addressValidation.touched?.address.country &&
                      addressValidation.errors.address &&
                      addressValidation.errors?.address.country ? (
                        <FormFeedback type="invalid">
                          {addressValidation.errors?.address &&
                            addressValidation.errors?.address.country}
                        </FormFeedback>
                      ) : null}
                    </>
                  </div>
                </Col>
                {!edit && <hr></hr>}
              </>
            )}
            {!edit && (
              <p>
                State :{" "}
                {vendorAddress.state || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="state" className="form-label">
                    State
                  </Label>
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
                          setBillingCityList,
                          [setBillingCityList, setBillingAreaList],
                          ["province", "place", "zipCode"],
                          addressValidation.values?.address,
                          saveVendorAddress,
                        )
                      }
                      onBlur={addressValidation.handleBlur}
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values?.address.state) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched?.address &&
                        addressValidation.touched?.address.state &&
                        addressValidation.errors?.address &&
                        addressValidation.errors?.address.state
                          ? true
                          : false
                      }
                    >
                      <option value="">Select State *</option>
                      {billingStateList?.map((option, index) => (
                        <option key={index} value={option.state}>
                          {option.state}
                        </option>
                      ))}
                    </Input>
                    {addressValidation.touched?.address &&
                    addressValidation.touched?.address.state &&
                    addressValidation.errors.address &&
                    addressValidation.errors?.address.state ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors?.address &&
                          addressValidation.errors?.address.state}
                      </FormFeedback>
                    ) : null}
                  </>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                City :{" "}
                {vendorAddress.province || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="place" className="form-label">
                    City
                  </Label>
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
                          setBillingAreaList,
                          [setBillingAreaList],
                          ["place", "zipCode"],
                          addressValidation.values?.address,
                          saveVendorAddress,
                        )
                      }
                      onBlur={addressValidation.handleBlur}
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values?.address.province) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched?.address &&
                        addressValidation.touched?.address.province &&
                        addressValidation.errors?.address &&
                        addressValidation.errors?.address.province
                          ? true
                          : false
                      }
                    >
                      <option value="">Select City *</option>
                      {billingCityList?.map((option, index) => (
                        <option key={index} value={option.province}>
                          {option.province}
                        </option>
                      ))}
                    </Input>
                    {addressValidation.touched?.address &&
                    addressValidation.touched?.address.province &&
                    addressValidation.errors.address &&
                    addressValidation.errors?.address.province ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors?.address &&
                          addressValidation.errors?.address.province}
                      </FormFeedback>
                    ) : null}
                  </>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Area :{" "}
                {vendorAddress.place || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="place" className="form-label">
                    Area
                  </Label>
                  <>
                    <Input
                      type="select"
                      name="address.place"
                      placeholder="Select Area *"
                      className="form-control"
                      onChange={(e) =>
                        handleAreaChange(
                          e,
                          "place",
                          addressValidation.values?.address,
                          saveVendorAddress,
                        )
                      }
                      onBlur={addressValidation.handleBlur}
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values?.address.place) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched?.address &&
                        addressValidation.touched?.address.place &&
                        addressValidation.errors?.address &&
                        addressValidation.errors?.address.place
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Area *</option>
                      {billingAreaList?.map((option, index) => (
                        <option key={index} value={option.place}>
                          {option.place}
                        </option>
                      ))}
                    </Input>
                    {addressValidation.touched?.address &&
                    addressValidation.touched?.address.place &&
                    addressValidation.errors.address &&
                    addressValidation.errors?.address.place ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors?.address &&
                          addressValidation.errors?.address.place}
                      </FormFeedback>
                    ) : null}
                  </>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Zip Code :{" "}
                {vendorAddress.zipCode || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </Label>
                  <>
                    <Input
                      name="address.zipCode"
                      placeholder="Enter Zip Code *"
                      type="text"
                      className="form-control"
                      onChange={addressValidation.handleChange}
                      onBlur={(e) =>
                        handleZipCodeChange(
                          e,
                          undefined,
                          setBillingAreaList,
                          setBillingCityList,
                          setBillingStateList,
                          addressValidation.values?.address,
                          saveVendorAddress,
                        )
                      }
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values.address.zipCode) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched.address &&
                        addressValidation.touched.address.zipCode &&
                        addressValidation.errors.address &&
                        addressValidation.errors.address.zipCode
                          ? true
                          : false
                      }
                    />
                    {addressValidation.touched.address &&
                    addressValidation.touched.address.zipCode &&
                    addressValidation.errors.address &&
                    addressValidation.errors.address.zipCode ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors.address.zipCode}
                      </FormFeedback>
                    ) : null}
                  </>
                </div>
              </Col>
            )}

            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Address :{" "}
                {vendorAddress.streetAddress1 || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="streetAddress1" className="form-label">
                    Address
                  </Label>
                  <>
                    <Input
                      name="address.streetAddress1"
                      placeholder="Enter Address"
                      type="text"
                      className="form-control"
                      onChange={addressValidation.handleChange}
                      onBlur={addressValidation.handleBlur}
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values.address?.streetAddress1) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched?.address &&
                        addressValidation.touched.address?.streetAddress1 &&
                        addressValidation.errors?.address &&
                        addressValidation.errors.address?.streetAddress1
                          ? true
                          : false
                      }
                    />
                    {addressValidation.touched.address &&
                    addressValidation.touched.address?.streetAddress1 &&
                    addressValidation.errors.address &&
                    addressValidation.errors.address?.streetAddress1 ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors?.address &&
                          addressValidation.values.address?.streetAddress1}
                      </FormFeedback>
                    ) : null}
                  </>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Address 2 :{" "}
                {vendorAddress.streetAddress2 || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="streetAddress2" className="form-label">
                    Address 2
                  </Label>
                  <>
                    <Input
                      name="address.streetAddress2"
                      placeholder="Enter Address 2"
                      type="text"
                      className="form-control"
                      onChange={addressValidation.handleChange}
                      onBlur={addressValidation.handleBlur}
                      value={
                        (addressValidation.values?.address &&
                          addressValidation.values.address?.streetAddress2) ||
                        ""
                      }
                      invalid={
                        addressValidation.touched?.address &&
                        addressValidation.touched.address?.streetAddress2 &&
                        addressValidation.errors?.address &&
                        addressValidation.errors.address?.streetAddress2
                          ? true
                          : false
                      }
                    />
                    {addressValidation.touched.address &&
                    addressValidation.touched.address?.streetAddress2 &&
                    addressValidation.errors.address &&
                    addressValidation.errors.address?.streetAddress2 ? (
                      <FormFeedback type="invalid">
                        {addressValidation.errors?.address &&
                          addressValidation.values.address?.streetAddress2}
                      </FormFeedback>
                    ) : null}
                  </>
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
                onClick={handleVendorAddress}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-soft-danger"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Col>
        )}
      </Form>
    </Fragment>
  );
};

export default VendorAddressComponent;
