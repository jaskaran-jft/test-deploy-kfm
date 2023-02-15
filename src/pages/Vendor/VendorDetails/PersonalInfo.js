import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import { vendorInfo } from "./utils";
import Notify from "src/common/Toaster/toast";
import { updateVendorUser } from "src/helpers/Vendors";
import Loading from "src/common/Loader";

export default function PersonalInfo(props) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tags } = useSelector((state) => state.Login);
  const [user, setUser] = useState(vendorInfo);

  const { details = {} } = props;

  useEffect(() => {
    const data = {
      firstName: details.user?.firstName || "",
      lastName: details.user?.lastName || "",
      username: details.user?.username || "",
    };
    setUser(data);
  }, [details]);

  useEffect(() => {
    if (props.currentTab !== props.id) {
      setEdit(false);
    }
  }, [props.currentTab, props.id]);

  const handleInfoSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const payload = user;
      const response = await updateVendorUser(payload, details.id);
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

  const handleReset = (e) => {
    e.preventDefault();
    setUser(JSON.parse(JSON.stringify(vendorInfo)));
    setEdit(false);
  };

  const handleInfoChange = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <Form>
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
          <Row>
            {!edit && (
              <p>
                First Name :{" "}
                {user.firstName || details?.user?.firstName || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="firstName" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    disabled={!tags.includes(CONSTANT.UPDATE_VENDOR_INFO)}
                    placeholder="Enter your first name"
                    value={user.firstName || ""}
                    onChange={handleInfoChange}
                    required
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}
            {!edit && (
              <p>
                Last Name :{" "}
                {user.lastName || details?.user?.lastName || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="lastName" className="form-label">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastName"
                    disabled={!tags.includes(CONSTANT.UPDATE_VENDOR_INFO)}
                    placeholder="Enter your last name"
                    value={user.lastName || ""}
                    onChange={handleInfoChange}
                  />
                </div>
              </Col>
            )}
            {!edit && <hr></hr>}

            {!edit && (
              <p>
                Email :{" "}
                {user.username || details?.user?.username || (
                  <i className="text-danger">Empty</i>
                )}
              </p>
            )}
            {edit && (
              <Col md="4">
                <div className="mb-3">
                  <Label htmlFor="username" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    disabled={!tags.includes(CONSTANT.UPDATE_VENDOR_INFO)}
                    placeholder="Enter your email"
                    value={user.username || ""}
                    onChange={handleInfoChange}
                    required
                  />
                </div>
              </Col>
            )}
            {edit && !loading && tags.includes(CONSTANT.UPDATE_VENDOR_INFO) && (
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleInfoSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft-danger"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Form>
    </React.Fragment>
  );
}
