import PropTypes from "prop-types";
import React, { useState } from "react";
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

import { withRouter, Link } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

// import images
// import profile from "../../assets/images/bg.png";
import FMILogoBlack from "src/assets/images/logo/logo-green.png";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import Notify from "../../common/Toaster/toast";
import { forgotPassword } from "../../helpers/AuthLogin/auth";

const ForgetPasswordPage = (props) => {
  const { domain } = useSelector((state) => state.Login);
  const [isDisabled, setIsDisabled] = useState(false);
  const validation = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      // dispatch(userForgetPassword(values, props.history));
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setIsDisabled(true);

    try {
      const response = await forgotPassword({
        email: values.email,
        tenantId: domain.id || "",
      });

      Notify(response.message || "", true);
      setTimeout(() => {
        props.history.push("/login");
      }, 2000);
    } catch (err) {
      setIsDisabled(false);
      Notify(err, false);
    }
  };

  const { forgetError, forgetSuccessMsg } = useSelector((state) => ({
    forgetError: state.ForgetPassword.forgetError,
    forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
  }));

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
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
                {/* <p className="mt-3 fs-15 fw-medium">{domain.name || "FMI"}</p> */}
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-secondary">Forgot Password?</h5>
                    <p>Reset password with {domain.name || "FMI"}</p>

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
                    Enter your email and instructions will be sent to you!
                  </Alert>
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
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
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button
                          className="btn btn-info w-100"
                          type="submit"
                          disabled={isDisabled}
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
