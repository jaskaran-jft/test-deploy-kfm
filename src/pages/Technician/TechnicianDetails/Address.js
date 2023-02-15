import { Fragment, useMemo, useState } from "react";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";
import { Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { useFormik } from "formik";
import {
  fetchAddress,
  fetchAreaList,
  fetchCityList,
  fetchStateList,
  fetchZipCode,
} from "src/helpers/AddressMethod/address";
import { updateTechnicianAddress } from "src/helpers/Technician";
import { addressObject } from "src/pages/Vendor/VendorDetails/utils";

const AddressComponent = (props) => {
  const [edit, setEdit] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [loading, setLoading] = useState(false);
  const countryList = useState([{ countryCode: "US" }])[0];
  const [billingCityList, setBillingCityList] = useState([]);
  const [billingStateList, setBillingStateList] = useState([]);
  const [billingAreaList, setBillingAreaList] = useState([]);

  const { data = {} } = props;
  const { address = {} } = data;

  const billingAddress = useMemo(() => address || {}, [address]);

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

  const validation = useFormik({
    initialValues: addressObject,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    console.log({ values });
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
    let address = addressValue;

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

      // setAddressValue(address);
      validation.setFieldValue("address", address);
    } catch (error) {
      console.log({ error });
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

  const handleZipCodeChange = async (
    e,
    response,
    setAreaList,
    setCityList,
    setStateList,
    setAddressValue,
  ) => {
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

  const handleBillingAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...validation.values?.address };
      console.log({ payload });
      payload.type = "Billing";
      const response = await updateTechnicianAddress(payload, data.id);
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
    <Fragment>
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
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <Row className="">
              {edit && (
                <>
                  <Col md="3">
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
                              setBillingStateList,
                              [
                                setBillingStateList,
                                setBillingAreaList,
                                setBillingCityList,
                              ],
                              ["state", "province", "place", "zipCode"],
                              validation.values?.address,
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
                    </div>
                  </Col>
                  {!edit && <hr></hr>}
                </>
              )}
              {!edit && (
                <p>
                  State :{" "}
                  {billingAddress.state || <i className="text-danger">Empty</i>}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                            validation.values?.address,
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
                        {billingStateList?.map((option, index) => (
                          <option key={index} value={option.state}>
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
                  </div>
                </Col>
              )}
              {!edit && <hr></hr>}
              {!edit && (
                <p>
                  City :{" "}
                  {billingAddress.province || (
                    <i className="text-danger">Empty</i>
                  )}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                            validation.values?.address,
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
                        {billingCityList?.map((option, index) => (
                          <option key={index} value={option.province}>
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
                  </div>
                </Col>
              )}
              {!edit && <hr></hr>}
              {!edit && (
                <p>
                  Area :{" "}
                  {billingAddress.place || <i className="text-danger">Empty</i>}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                        onChange={(e) => handleAreaChange(e, "place")}
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
                        {billingAreaList?.map((option, index) => (
                          <option key={index} value={option.place}>
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
                  </div>
                </Col>
              )}
              {!edit && <hr></hr>}
              {!edit && (
                <p>
                  Zip Code :{" "}
                  {billingAddress.zipCode || (
                    <i className="text-danger">Empty</i>
                  )}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                        onChange={validation.handleChange}
                        onBlur={(e) =>
                          handleZipCodeChange(
                            e,
                            undefined,
                            setBillingAreaList,
                            setBillingCityList,
                            setBillingStateList,
                          )
                        }
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
                  </div>
                </Col>
              )}

              {!edit && <hr></hr>}
              {!edit && (
                <p>
                  Address :{" "}
                  {billingAddress.streetAddress1 || (
                    <i className="text-danger">Empty</i>
                  )}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          (validation.values?.address &&
                            validation.values.address?.streetAddress1) ||
                          ""
                        }
                        invalid={
                          validation.touched?.address &&
                          validation.touched.address?.streetAddress1 &&
                          validation.errors?.address &&
                          validation.errors.address?.streetAddress1
                            ? true
                            : false
                        }
                      />
                      {validation.touched.address &&
                      validation.touched.address?.streetAddress1 &&
                      validation.errors.address &&
                      validation.errors.address?.streetAddress1 ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.address &&
                            validation.values.address?.streetAddress1}
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
                  {billingAddress.streetAddress2 || (
                    <i className="text-danger">Empty</i>
                  )}
                </p>
              )}
              {edit && (
                <Col md="3">
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
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={
                          (validation.values?.address &&
                            validation.values.address?.streetAddress2) ||
                          ""
                        }
                        invalid={
                          validation.touched?.address &&
                          validation.touched.address?.streetAddress2 &&
                          validation.errors?.address &&
                          validation.errors.address?.streetAddress2
                            ? true
                            : false
                        }
                      />
                      {validation.touched.address &&
                      validation.touched.address?.streetAddress2 &&
                      validation.errors.address &&
                      validation.errors.address?.streetAddress2 ? (
                        <FormFeedback type="invalid">
                          {validation.errors?.address &&
                            validation.values.address?.streetAddress2}
                        </FormFeedback>
                      ) : null}
                    </>
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
                      onClick={handleBillingAddress}
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
        )}
      </Form>
    </Fragment>
  );
};

export default AddressComponent;
