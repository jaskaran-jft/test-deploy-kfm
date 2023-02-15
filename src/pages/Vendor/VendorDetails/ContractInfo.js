import React, { Fragment, useEffect, useState } from "react";
import { Col, Input, Row, Label, Button } from "reactstrap";
import { CONSTANT } from "src/utils/constant";
import { useSelector } from "react-redux";
import { contractObject } from "./utils";
import { updateVendorContract } from "src/helpers/Vendors";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";

export default function ContractInfo(props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [contract, setContract] = useState(contractObject);
  const { data = {} } = props;
  const vendorContract = data.vendorContract || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContract((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await updateVendorContract(contract, vendorContract.id);
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
      regular: vendorContract.regular || "",
      afterHours: vendorContract.afterHours || "",
      weekend: vendorContract.weekend || "",
      holiday: vendorContract.holiday || "",
      emergency: vendorContract.emergency || "",
      weekendEmergency: vendorContract.weekendEmergency || "",
      regularTripCharge: vendorContract.regularTripCharge || "",
      emergencyTripCharge: vendorContract.emergencyTripCharge || "",
      workRange: vendorContract.workRange || "",
    };

    setContract(payload);

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
            {!edit && <h5 className=" mb-2">Rate Charges</h5>}
            {!edit && <br />}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Work Range : &nbsp;
                {vendorContract.workRange || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="workRange" className="form-label">
                    Work Range
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="workRange"
                    name="workRange"
                    placeholder="Enter your Work range"
                    value={contract.workRange}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}

            {!edit && (
              <p>
                Regular : $&nbsp;
                {vendorContract.regular || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="regular" className="form-label">
                    Regular
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="regular"
                    name="regular"
                    placeholder="Enter your Regular"
                    value={contract.regular}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                After hours : $&nbsp;
                {vendorContract.afterHours || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="afterHours" className="form-label">
                    After hours
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="afterHours"
                    name="afterHours"
                    placeholder="Enter your After hours"
                    value={contract.afterHours}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Weekend : $&nbsp;
                {vendorContract.weekend || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="weekend" className="form-label">
                    Weekend
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="weekend"
                    name="weekend"
                    placeholder="Enter your weekend"
                    value={contract.weekend}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}

            {!edit && (
              <p>
                Holiday : $&nbsp;
                {vendorContract.holiday || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="holiday" className="form-label">
                    Holiday
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="holiday"
                    name="holiday"
                    placeholder="Enter your Holiday"
                    value={contract.holiday}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Emergency : $&nbsp;
                {vendorContract.emergency || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="emergency" className="form-label">
                    Emergency
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="emergency"
                    name="emergency"
                    placeholder="Enter your emergency"
                    value={contract.emergency}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Weekend Emergency : $&nbsp;
                {vendorContract.weekendEmergency || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="weekendEmergency" className="form-label">
                    Weekend Emergency
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="weekendEmergency"
                    name="weekendEmergency"
                    placeholder="Enter weekend emergency"
                    value={contract.weekendEmergency}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <h5 className="mt-2 mb-2">Trip Charges</h5>}
            {!edit && <br></br>}
            {!edit && <hr></hr>}

            {!edit && (
              <p>
                Regular Trip Charge : $&nbsp;
                {vendorContract.regularTripCharge || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="regularTripCharge" className="form-label">
                    Regular Trip Charge
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="regularTripCharge"
                    name="regularTripCharge"
                    placeholder="Enter regular trip charge"
                    value={contract.regularTripCharge}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Emergency (Trip Charge) : $&nbsp;
                {vendorContract.emergencyTripCharge || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="emergencyTripCharge" className="form-label">
                    Emergency (Trip Charge)
                  </Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="emergencyTripCharge"
                    name="emergencyTripCharge"
                    placeholder="Enter emergency trip charge"
                    value={contract.emergencyTripCharge}
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
