import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { saveLocalStorageData } from "../../pages/AuthenticationInner/Login/utilsLogin";
import {
  logoutUser,
  setAuth,
  setTags,
  setTheme,
  settingOpen,
} from "../../store/actions";
import { SwitchUser } from "src/helpers/Impersonate";
import { setAuthorization } from "src/helpers/api_helper";
import { roleHandle } from "src/utils/roleHandle";
import { CONSTANT } from "src/utils/constant";
import { withTranslation } from "react-i18next";

const ProfileDropdown = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);
  const { firstName = "" } = userData;
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const [userName, setUserName] = useState("Admin");
  const [img, setImg] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    history.push("/login");
  };

  const switchUser = () => {
    const user = JSON.parse(localStorage.getItem("switchUser"));

    SwitchUser(user?.username, user.accessToken).then((response) => {
      response.deleteSwitch = user.accessToken;

      setAuthorization(response.accessToken);
      saveLocalStorageData(props, response).then((data) => {
        dispatch(setTags({ tags: response.tags, auth: response }));
        dispatch(
          setAuth({ domain: response.domain || {}, userData: response }),
        );
        dispatch(setTheme(response.theme ? response.theme : {}));
      });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setUserName(`${obj.firstName}` || "Admin");
      setImg(obj.profileImage || null);
    }
  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleProfile = () => {
    roleHandle(userData, userData.role[0].name, props);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className={`ms-sm-3 header-item topbar-user ${
          localStorage.getItem("switch") ? "border-warning" : ""
        }`}
        style={
          localStorage.getItem("switch")
            ? { borderWidth: "1px", borderStyle: "solid" }
            : {}
        }
      >
        <DropdownToggle tag="button" type="button" className={`btn `}>
          <span className="d-flex align-items-center">
            {img && (
              <img
                className="rounded-circle header-profile-user"
                src={img}
                alt="UserImage"
              />
            )}
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {firstName}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            {props.t("Welcome")} {firstName}!
          </h6>
          {userData?.role[0]?.name !== CONSTANT.SUPER_ADMIN ? (
            <DropdownItem onClick={handleProfile}>
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">{props.t("Profile")}</span>
            </DropdownItem>
          ) : null}
          <Link to="/change_password">
            <DropdownItem>
              <i className="mdi mdi-key-change text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                {props.t("Change password")}
              </span>
            </DropdownItem>
          </Link>
          <DropdownItem onClick={() => dispatch(settingOpen())}>
            <i className="mdi mdi-chart-arc text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              {props.t("Theme Settings")}
            </span>
          </DropdownItem>

          {localStorage.getItem("switch") && (
            <DropdownItem onClick={(e) => switchUser(e)}>
              <i className="ri-exchange-line text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                {props.t("Switch Back")}
              </span>
            </DropdownItem>
          )}
          <DropdownItem onClick={(e) => logout(e)}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              {props.t("Logout")}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(ProfileDropdown);
