import { CONSTANT } from "./constant";
const {
  ROLE_CORPORATE,
  ROLE_CLIENT,
  ROLE_STOREMANAGER,
  ROLE_ADMIN,
  ROLE_STOREUSER,
  ROLE_VENDOR,
  ROLE_TECHNICIAN,
} = CONSTANT;

export const roleHandle = (userData, role, props) => {
  switch (role) {
    case ROLE_CORPORATE:
      return props.history.push(`/tenantUserDetails/${userData.userId}`);
    case ROLE_CLIENT:
      return props.history.push(`/clientUserDetails/${userData.userId}`);
    case ROLE_STOREUSER:
      return props.history.push(`/storeUserDetails/${userData.userId}`);
    case ROLE_VENDOR:
      return props.history.push(`/vendorDetail/${userData.vendorId}`);
    case ROLE_TECHNICIAN:
      return props.history.push(`/technicianDetail/${userData.technicianId}`);
    case ROLE_STOREMANAGER:
    case ROLE_ADMIN:
    default:
      return props.history.push("/dashboard");
  }
};
