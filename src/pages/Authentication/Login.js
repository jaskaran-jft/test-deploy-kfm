import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import SideImage from "../../common/leftSideImage/SideImage";
import { useCookies } from "react-cookie";
import {
  allReadyLogin,
  checkDomainName,
  login,
} from "../../redux/actions/login/action";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Toaster from "../../common/Toaster/toaster";
/////// formik imports
import * as yup from "yup";
import { useFormik, getIn } from "formik";

const LoginPage = () => {
  const { domain, userData } = useSelector((state) => state.login);
  const [cookies, setCookie] = useCookies(["userDetails"]);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullUrl = window.location.href;
  const url = fullUrl.split("//")[1].split("/")[0];

  useEffect(() => {
    if (
      userData &&
      userData.accessToken &&
      url === userData.domain.domainName
    ) {
      navigate("/dashboard");
    }
  }, [userData]);

  useEffect(() => {
    if (
      cookies.userData &&
      Object.keys(cookies.userData).length !== 0 &&
      url === cookies.userData.domain.domainName
    ) {
      dispatch(allReadyLogin(cookies.userData));
      setCookie(
        "userData",
        {},
        {
          path: "/",
          domain: "grailsguru.com",
          session: "Thu, 01 Jan 1970 00:00:01 GMT",
        }
      );
    }

    if (
      localStorage.getItem("domain") &&
      JSON.parse(localStorage.getItem("domain")).domainName === url
    ) {
      return null;
    } else {
      checkDomain();
    }
  }, [url]);

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

  const clientId = process.env.REACT_APP_GOOGLE_KEY;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const checkDomain = async () => {
    try {
      // if (url) { ////////      check subdomain here
      if (url.split(".")[0] === "www" && url.split(".")[1] === "grailsguru") {
        return null;
      } else {
        await dispatch(checkDomainName({ domainName: url }));
      }
    } catch (err) {
      window.location.replace("https://www.grailsguru.com/");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await dispatch(login(values));

      if (url !== response.domain.domainName) {
        if (response.domain && response.domain.domainName) {
          setCookie("userData", response, {
            path: "/",
            domain: "grailsguru.com",
          });
          window.location.replace(`https://${response.domain.domainName}`);
        } else {
          window.location.replace("https://www.grailsguru.com/");
        }
      } else {
        Toaster("Login Successful", true);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("domain", JSON.stringify(response.domain));
        navigate("/dashboard");
      }
    } catch (err) {
      Toaster(err?.response?.data?.message || "Something went wrong", false);
      signOut();

      formik.setFieldValue("googleId", "");
    }
  };

  const onSuccess = (res) => {
    formik.setFieldValue("username", res.profileObj.email);
    formik.setFieldValue("googleId", res.profileObj.googleId);
  };

  const onFailure = (err) => {
    console.log(err);
    // Toaster('Some Error Occur', false);
  };

  const { signOut } = useGoogleLogout({
    clientId,
  });

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Email is required field")
      .email("Email is invalid"),
    password: yup.string().required("Password is required field"),
  });

  const formik = useFormik({
    initialValues: {
      tenantId: domain.id || "",
      username: "",
      password: "",
      isActive: true,
      googleId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (formik.values.googleId !== "") {
      handleSubmit(formik.values);
    }
  }, [formik.values.googleId]);

  return (
    <div className="container-fluid">
      <div className="row">
        <SideImage />
        <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
          <div className="card-login">
            <div className="card-body card-body-login">
              <div className="card-title text-right">
                <img
                  src={domain.logoUrl}
                  className="login-logo-sm m-t-20"
                  alt=""
                />
              </div>

              <form className="login-form" onSubmit={formik.handleSubmit}>
                <h3 className="mb-1">Sign In</h3>
                <span className="support-text">
                  Welcome, Please enter your details
                </span>
                <div className="form-group m-t-20">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    name="username"
                    placeholder="Email"
                    className="form-styling"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={Boolean(
                      getIn(formik.touched, "username") &&
                        getIn(formik.errors, "username")
                    )}
                    helperText={
                      getIn(formik.touched, "username") &&
                      getIn(formik.errors, "username")
                    }
                  />
                </div>

                <div className="form-group">
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <TextField
                      id="outlined-adornment-password"
                      type={eye ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={Boolean(
                        getIn(formik.touched, "password") &&
                          getIn(formik.errors, "password")
                      )}
                      helperText={
                        getIn(formik.touched, "password") &&
                        getIn(formik.errors, "password")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setEye(!eye)}
                              edge="end"
                            >
                              {!eye ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="form-group d-flex align-items-center justify-content-end">
                  {/* <div className="custom-control custom-checkbox mb-3 mr-auto">
                    <input type="checkbox" className="custom-control-input" id="customControlValidation1" />
                    <label className="custom-control-label" htmlFor="customControlValidation1">
                      Remember Me
                    </label>
                  </div> */}

                  <div className="mb-4">
                    <Link
                      to="/forgotPassword"
                      className="forgot-password m-t-10"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    name="submit"
                    className="btn btn-primary btn-block btn-lg m-t-10 m-b-10"
                  >
                    <span> Log in</span>
                  </button>
                </div>
                {domain.id ? null : (
                  <>
                    <div className="form-group d-flex justify-content-center">
                      <label className="col-form-label">Or</label>
                    </div>
                    <div className="form-group google-signin">
                      <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        // isSignedIn={true}
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
