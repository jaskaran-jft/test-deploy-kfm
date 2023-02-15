import PropTypes from "prop-types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useSelector } from "react-redux";

import { withRouter, Link, useLocation } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";
import FMILogoBlack from "src/assets/images/logo/logo-green.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import Notify from "../../common/Toaster/toast";
import Loading from "src/common/Loader";
import {
  resetPasswordData,
  validatePasswordToken,
} from "src/helpers/AuthLogin/auth";

const ResetPassword = (props) => {
  const { domain } = useSelector((state) => state.Login);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { search } = useLocation();
  const [data, setData] = useState({});
  const validation = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match",
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const token = search.split("=")[1];
      const response = await validatePasswordToken({
        token,
      });
      setData(response);
      setLoading(false);
      setError("");
    } catch (error) {
      props.history.push("/invalidLink");
      //   setLoading(false);
      //   setError(error.message);
    }
  };

  const handleSubmit = async (values) => {
    setIsDisabled(true);
    try {
      const payload = { ...values, ...data };
      const response = await resetPasswordData(payload);
      Notify(response.message || "", true);
      setTimeout(() => {
        props.history.push("/");
      }, 2000);
      setIsDisabled(false);
    } catch (err) {
      setIsDisabled(false);
      Notify(err, false);
    }
  };

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Row>
                <Col lg={12}>
                  <div className="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                      <Link to="/" className="d-inline-block auth-logo">
                        <img
                          src={domain.logoUrl || FMILogoBlack}
                          alt=""
                          height="40"
                        />
                      </Link>
                    </div>
                    {/* <p className="mt-3 fs-15 fw-medium">
                      {domain.name || "FMI"}
                    </p> */}
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="mt-4">
                    <CardBody className="p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Reset Password?</h5>
                        <p className="text-muted">
                          Reset password with {domain.name || "FMI"}
                        </p>

                        <lord-icon
                          src="https://cdn.lordicon.com/rhvddzym.json"
                          trigger="loop"
                          colors="primary:#0ab39c"
                          style={{ width: "120px", height: "120px" }}
                          className="avatar-xl"
                        ></lord-icon>
                      </div>

                      <Alert
                        className="alert-borderless alert-warning text-center mb-2 mx-2"
                        role="alert"
                      >
                        Enter your new password!
                      </Alert>
                      <div className="p-2">
                        {error ? (
                          <Alert color="danger" style={{ marginTop: "13px" }}>
                            {error}
                          </Alert>
                        ) : null}
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-4">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
                              type="password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.password}</div>
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <Label className="form-label">
                              Confirm Password
                            </Label>
                            <Input
                              name="confirmPassword"
                              className="form-control"
                              placeholder="Enter confirmPassword"
                              type="password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.confirmPassword || ""}
                              invalid={
                                validation.touched.confirmPassword &&
                                validation.errors.confirmPassword
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.confirmPassword &&
                            validation.errors.confirmPassword ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.confirmPassword}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="text-center mt-4">
                            <button
                              className="btn btn-info w-100"
                              type="submit"
                              disabled={isDisabled}
                            >
                              Save
                            </button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ResetPassword);
