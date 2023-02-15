import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import LoginModal from "src/common/loginModal/LoginModal";
import { getDeviceToken, onMessageListener } from "src/Services/firebase";
import { saveNotificationToken } from "src/helpers/AuthLogin/auth";
import { isSupported } from "firebase/messaging";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CONSTANT } from "src/utils/constant";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import StoreDashboard from "./StoreDashboard";
import VendorDashboard from "./VendorDashboard";
import TechnicianDashboard from "./TechnicianDashboard";

const Dashboard = (props) => {
  const { userData = {} } = useSelector((state) => state.Login);
  const [isOpen, setIsOpen] = useState(false);
  const lastLogin = localStorage.getItem("lastLogin");

  useEffect(() => {
    isSupported().then(() => {
      if (Notification.permission === "granted") {
        getToken();
      } else {
        Notification.requestPermission().then((result) => {
          if (result === "granted") {
            getToken();
          }
        });
      }
    });

    if (!lastLogin || lastLogin === "null") {
      toggle();
    }
  }, []);

  const getToken = async () => {
    const token = await getDeviceToken();
    saveToken(token);
  };

  const saveToken = async (token) => {
    try {
      await saveNotificationToken({ token });
    } catch (error) {
      console.log({ error });
    }
  };

  isSupported().then(() => {
    onMessageListener()
      .then((result) => {
        console.log({ result });
      })
      .catch();
  });

  const toggle = () => {
    setIsOpen((prev) => !prev);
    localStorage.setItem("lastLogin", "yes");
  };

  const changePassword = () => {
    props.history.push("/change_password");
    localStorage.setItem("lastLogin", "yes");
  };

  const handleDashboard = (type) => {
    switch (type) {
      case CONSTANT.SUPER_ADMIN:
      case CONSTANT.ROLE_CORPORATE:
        return <AdminDashboard />;
      case CONSTANT.ROLE_CLIENT:
        return <ClientDashboard />;
      case CONSTANT.ROLE_STOREUSER:
      case CONSTANT.ROLE_STOREMANAGER:
        return <StoreDashboard />;
      case CONSTANT.ROLE_VENDOR:
        return <VendorDashboard />;
      case CONSTANT.ROLE_TECHNICIAN:
        return <TechnicianDashboard />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb pageTitle="Dashboard" />
          <LoginModal
            changePassword={changePassword}
            toggle={toggle}
            isOpen={isOpen}
          />
          {handleDashboard(userData?.role[0]?.name)}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(Dashboard);
