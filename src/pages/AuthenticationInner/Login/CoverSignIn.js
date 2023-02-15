import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  FormFeedback,
} from "reactstrap";
import AuthSlider from "../authCarousel";
import { login, domainCheck } from "../../../helpers/AuthLogin/auth";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { string, object } from "yup";
import { useFormik } from "formik";

import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { setTheme, setTags, setAuth } from "../../../store/actions";

import logoLight from "../../../assets/images/kfm_logo-org_white.png";
import Notify from "../../../common/Toaster/toast";
import { saveLocalStorageData } from "./utilsLogin";
import { setAuthorization } from "src/helpers/api_helper";

const CoverSignIn = (props) => {
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["userData"]);
  const { domain } = useSelector((state) => state.Login);
  const [userDomain, setUserDomain] = useState(domain);
  const [logo, setLogo] = useState("");
  const [eye, setEye] = useState(true);

  const fullUrl = window.location.href;
  const url = fullUrl.split("//")[1].split("/")[0];
  const domainName = process.env.REACT_APP_DOMAIN || "";
  const subDomain = process.env.REACT_APP_SUBDOMAIN || "";
  const subDomainName = process.env.REACT_APP_SUBDOMAIN_NAME || "";
  const clientId = process.env.REACT_APP_GOOGLE_KEY || "";

  useEffect(() => {
    document.title = domain.name || "FMI";

    if (domain.logoUrl) {
      var link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = domain.logoUrl;
    }
  }, [domain]);

  useEffect(() => {
    if (
      cookies.userData &&
      Object.keys(cookies.userData).length !== 0 &&
      url === cookies.userData.domain.domainName
    ) {
      localStorage.setItem("authUser", JSON.stringify(cookies.userData));
      localStorage.setItem("tags", JSON.stringify(cookies.userData.tags));
      localStorage.setItem("domain", JSON.stringify(cookies.userData.domain));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(cookies.userData.accessToken),
      );
      props.history.push("/dashboard");
      setCookie(
        "userData",
        {},
        {
          path: "/",
          domain: subDomain,
          session: "Thu, 01 Jan 1970 00:00:01 GMT",
        },
      );
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      !(
        Object.keys(domain).length === 0 &&
        domain.domainName &&
        domain.domainName === url
      )
    ) {
      checkDomain();
    }

    // eslint-disable-next-line
  }, []);
  const checkDomain = async () => {
    try {
      if (url.split(".")[0] === "www" && url.split(".")[1] === subDomainName) {
        return null;
      } else {
        const response = await domainCheck({ domainName: url });
        setLogo(response.logoUrl);
        setUserDomain(response);
        localStorage.setItem("domain", JSON.stringify(response));
      }
    } catch (err) {
      console.log("error", err);
      setUserDomain("");
      window.location.replace(domainName);
    }
  };

  const validation = useFormik({
    initialValues: {
      username: "",
      password: "",
      tenantId: "",
      isActive: true,
      googleId: "",
    },
    validationSchema: object({
      username: string()
        .required("Email is required field")
        .email("Email is invalid"),
      password: string().required("Password is required field"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    values.tenantId = userDomain.id || domain.id || "";
    try {
      const response = await login(values);
      setAuthorization(response.accessToken);
      if (url !== response.domain.domainName) {
        localStorage.setItem(
          "lastLogin",
          JSON.stringify(response.lastLogin || "yes"),
        );
        if (response.domain && response.domain.domainName) {
          setCookie(
            "user",
            { response: response.userId },
            {
              path: "/",
              domain: subDomain,
            },
          );

          window.location.replace(`https://${response.domain.domainName}`);
        } else {
          window.location.replace(domainName);
        }
      } else {
        saveLocalStorageData(props, response).then((data) => {
          dispatch(setTags({ tags: response.tags, auth: response }));
          dispatch(
            setAuth({ domain: response.domain || {}, userData: response }),
          );
          dispatch(setTheme(response.theme ? response.theme : {}));
        });
      }
    } catch (err) {
      Notify(err, false);
      signOut();
      validation.setFieldValue("googleId", "");
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = (response) => {
    try {
      validation.setFieldValue("username", response.profileObj.email);
      validation.setFieldValue("googleId", response.profileObj.googleId);
      handleSubmit({
        username: response.profileObj.email,
        googleId: response.profileObj.googleId,
      });
    } catch (error) {
      console.log({ error });
      Notify(error, false);
    }
  };

  // useEffect(() => {
  //   if (validation.values.googleId !== "") {
  //     handleSubmit(validation.values);
  //   }
  // }, [validation.values.googleId]);

  const { signOut } = useGoogleLogout({
    clientId,
  });

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-6 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden">
                  <Row className="g-0">
                    <AuthSlider
                      userDomain={userDomain}
                      logo={logo || logoLight}
                    />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="">Welcome Back !</h5>
                        </div>

                        <div className="mt-4">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              validation.handleSubmit();
                              return false;
                            }}
                            action="#"
                          >
                            <div className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                Email
                              </Label>
                              <Input
                                name="username"
                                className="form-control"
                                placeholder="Enter email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
                                invalid={
                                  validation.touched.username &&
                                  validation.errors.username
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.username &&
                              validation.errors.username ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.username}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  name="password"
                                  value={validation.values.password || ""}
                                  type={eye ? "password" : "text"}
                                  className="form-control pe-5"
                                  placeholder="Enter Password"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
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
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                  type="button"
                                  id="password-addon"
                                  onClick={() => {
                                    setEye((prev) => !prev);
                                  }}
                                >
                                  {!eye ? (
                                    <span className="mdi mdi-eye"></span>
                                  ) : (
                                    <span className="mdi mdi-eye-off"></span>
                                  )}
                                </button>
                                <div className="float-end">
                                  <Link
                                    to="/forgot-password"
                                    className="text-muted"
                                  >
                                    Forgot password?
                                  </Link>
                                </div>
                              </div>
                            </div>

                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                Sign In
                              </Button>
                            </div>

                            <div className="mt-4 text-center">
                              <div>
                                <GoogleLogin
                                  clientId={clientId}
                                  buttonText="Sign in with google"
                                  onSuccess={googleResponse}
                                  onFailure={(error) => {
                                    Notify(error, false);
                                  }}
                                  isSignedIn={true}
                                  cookiePolicy={"single_host_origin"}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CoverSignIn;
