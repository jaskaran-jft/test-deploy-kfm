import React, { Fragment, useEffect, useState } from "react";
import { Col, Input, Row, Label } from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { paymentW9Object } from "./utils";
import { updateVendorW9 } from "src/helpers/Vendors";
import Notify from "src/common/Toaster/toast";
import Loading from "src/common/Loader";
import { Link } from "react-router-dom";

export default function Payment(props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [payment, setPayment] = useState(paymentW9Object);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const { data = {} } = props;
  const vendorW9 = data.vendorW9 || {};

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await updateVendorW9(payment, vendorW9.id);
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

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  const handleEdit = () => {
    const payload = {
      billAs: vendorW9?.billAs || "",
      payment: vendorW9?.payment || "",
      taxStatus: vendorW9?.taxStatus || "",
      taxId: vendorW9?.taxId || "",
      termNet: vendorW9?.termNet || "",
    };
    setPayment(payload);
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
                Bill as :{" "}
                {vendorW9?.billAs || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="billAs" className="form-label">
                    Bill as
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="billAs"
                    name="billAs"
                    placeholder="Bill As"
                    value={payment.billAs}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Payment Type :{" "}
                {vendorW9?.payment || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="payment" className="form-label">
                    Payment Type
                  </Label>
                  <Input
                    type="select"
                    name={`payment`}
                    id="payment"
                    placeholder="Select Payment Type"
                    className="form-control"
                    onChange={handleChange}
                    value={payment.payment || ""}
                  >
                    <option value="">Select Payment Type</option>
                    {CONSTANT.PAYMENT_TYPE.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Tax Status :{" "}
                {vendorW9?.taxStatus || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="taxStatus" className="form-label">
                    Tax Status
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="taxStatus"
                    name="taxStatus"
                    placeholder="Enter your Tax Status"
                    value={payment.taxStatus}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Tax ID :{" "}
                {vendorW9?.taxId || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="taxId" className="form-label">
                    Tax ID
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="taxId"
                    name="taxId"
                    placeholder="Enter your Tax Id"
                    value={payment.taxId}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Term NET :{" "}
                {vendorW9?.termNet || <i className="text-danger">Empty</i>}
              </p>
            )}
            {edit && (
              <Col md="3">
                <div className="mb-3">
                  <Label htmlFor="termNet" className="form-label">
                    Term NET
                  </Label>
                  <Input
                    type="select"
                    name={`termNet`}
                    id="termNet"
                    placeholder="Select Term net"
                    className="form-control"
                    onChange={handleChange}
                    value={payment.termNet || ""}
                  >
                    <option value="">Select Term net</option>
                    {CONSTANT.TERM_NET_TYPE.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
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
