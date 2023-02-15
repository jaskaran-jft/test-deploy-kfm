import React, { Fragment, useEffect, useState } from "react";
import { Col, Input, Row, Label, Button } from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { insuranceObject } from "./utils";
import Notify from "src/common/Toaster/toast";
import { updateVendorInsurance } from "src/helpers/Vendors";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";

export default function InsuranceInfo(props) {
  const [edit, setEdit] = useState(false);
  const [insurance, setInsurance] = useState(insuranceObject);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const { data = {} } = props;
  const vendorInsurance = data.vendorInsurance || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInsurance((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await updateVendorInsurance(
        insurance,
        vendorInsurance.id,
      );
      if (response) {
        Notify(response.message || "Success", true);
        setEdit(false);
        props.update();
      }
      setLoading(false);
    } catch (error) {
      Notify(error || "Error", false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  const handleEdit = () => {
    const payload = {
      liabilityStartDate: vendorInsurance.liabilityStartDate || "",
      liabilityExpirationDate: vendorInsurance.liabilityExpirationDate || "",
      compStartDate: vendorInsurance.compStartDate || "",
      compExpirationDate: vendorInsurance.compExpirationDate || "",
    };
    setInsurance(payload);

    setEdit(true);
  };

  return (
    <Fragment>
      {!edit && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
        <div className="d-flex align-items-center mb-2">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0"></h5>
          </div>
          <div className="flex-shrink-0">
            <Link
              onClick={handleEdit}
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
        <>
          <Row>
            {!edit && (
              <p>
                General Liability Start Date :{" "}
                {vendorInsurance.liabilityStartDate ? (
                  new Date(
                    vendorInsurance.liabilityStartDate,
                  ).toLocaleDateString()
                ) : (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="liabilityStartDate" className="form-label">
                    General Liability Start Date
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    id="liabilityStartDate"
                    name="liabilityStartDate"
                    placeholder="General Liability Start Date"
                    value={insurance.liabilityStartDate}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                General Liability Expiration Date :{" "}
                {vendorInsurance.liabilityExpirationDate ? (
                  new Date(
                    vendorInsurance.liabilityExpirationDate,
                  ).toLocaleDateString()
                ) : (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label
                    htmlFor="liabilityExpirationDate"
                    className="form-label"
                  >
                    General Liability Expiration Date
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    id="liabilityExpirationDate"
                    name="liabilityExpirationDate"
                    placeholder="General Liability Expiration Date"
                    value={insurance.liabilityExpirationDate}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Workman's Comp Start Date :{" "}
                {vendorInsurance.compStartDate ? (
                  new Date(vendorInsurance.compStartDate).toLocaleDateString()
                ) : (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="compStartDate" className="form-label">
                    Workman's Comp Start Date
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    id="compStartDate"
                    name="compStartDate"
                    placeholder="Workman's Comp Start Date"
                    value={insurance.compStartDate}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Workman's Comp Expiration Date :{" "}
                {vendorInsurance.compExpirationDate ? (
                  new Date(
                    vendorInsurance.compExpirationDate,
                  ).toLocaleDateString()
                ) : (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="compExpirationDate" className="form-label">
                    Workman's Comp Expiration Date
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    id="compExpirationDate"
                    name="compExpirationDate"
                    placeholder="Workman's Comp Expiration Date"
                    value={insurance.compExpirationDate}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
          </Row>
          {edit && !loading && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
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
        </>
      )}
    </Fragment>
  );
}
