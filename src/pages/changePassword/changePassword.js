import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import Notify from "../../common/Toaster/toast";
import { changePassword } from "../../helpers/AuthLogin/auth";
const ChangePassword = () => {
  const [eye, setEye] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const validationSchema = yup.object({
    currentPassword: yup.string().required("Old Password is a required field"),
    newPassword: yup
      .string()
      .required("New Password is a required field")
      .matches(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
        "Must contain at least 8 characters and up to 20 characters with one uppercase, lowercase, numeric and special characters."
      )
      .max(20, "Should be less than 20 character"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is a required field")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
  const validation = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      const response = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      validation.resetForm();
      Notify(response.message || "Success", true);
    } catch (err) {
      Notify(err || "Failed", false);
    }
  };
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Change Password" pageTitle="Password" />
        </Container>

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="live-preview">
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label>Current Password</Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type={eye.currentPassword ? "text" : "password"}
                              name="currentPassword"
                              placeholder="Enter Current Password"
                              className="form-control"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.currentPassword || ""}
                              invalid={
                                validation.touched.currentPassword &&
                                validation.errors.currentPassword
                                  ? true
                                  : false
                              }
                            />

                            {validation.touched.currentPassword &&
                            validation.errors.currentPassword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.currentPassword}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() =>
                                setEye((prev) => {
                                  return {
                                    ...prev,
                                    currentPassword: !prev.currentPassword,
                                  };
                                })
                              }
                            >
                              <i
                                className={
                                  !eye.currentPassword
                                    ? "ri-eye-off-fill align-middle"
                                    : "ri-eye-fill align-middle"
                                }
                              ></i>
                            </button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label>New Password</Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type={eye.newPassword ? "text" : "password"}
                              name="newPassword"
                              placeholder="Enter New Password"
                              className="form-control"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.newPassword || ""}
                              invalid={
                                validation.touched.newPassword &&
                                validation.errors.newPassword
                                  ? true
                                  : false
                              }
                            />

                            {validation.touched.newPassword &&
                            validation.errors.newPassword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.newPassword}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() =>
                                setEye((prev) => {
                                  return {
                                    ...prev,
                                    newPassword: !prev.newPassword,
                                  };
                                })
                              }
                            >
                              <i
                                className={
                                  !eye.newPassword
                                    ? "ri-eye-off-fill align-middle"
                                    : "ri-eye-fill align-middle"
                                }
                              ></i>
                            </button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup className="mb-3">
                          <Label>Confirm Password</Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type={eye.confirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              placeholder="Enter Confirm Password"
                              className="form-control"
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
                                {validation.errors.confirmPassword}
                              </FormFeedback>
                            ) : null}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() =>
                                setEye((prev) => {
                                  return {
                                    ...prev,
                                    confirmPassword: !prev.confirmPassword,
                                  };
                                })
                              }
                            >
                              <i
                                className={
                                  !eye.confirmPassword
                                    ? "ri-eye-off-fill align-middle"
                                    : "ri-eye-fill align-middle"
                                }
                              ></i>
                            </button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="row mt-4">
                      <div className="col-md-2">
                        <Button color="primary" type="submit">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChangePassword;
