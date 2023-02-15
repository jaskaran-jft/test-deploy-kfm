import { formatNumber } from "src/helpers/format_helper";

export const vendorInfo = {
  firstName: "",
  lastName: "",
  username: "",
};

export const businessObject = {
  businessName: "",
  businessPhone: "",
  personalPhone: "",
  faxNumber: "",
  creditCard: "",
  accountingEmail: "",
  description: "",
  apNumber: "",
};

export const addressObject = {
  address: {
    streetAddress1: "",
    streetAddress2: "",
    country: "",
    state: "",
    province: "",
    place: "",
    zipCode: "",
  },
};

export const paymentW9Object = {
  billAs: "",
  payment: "",
  taxId: "",
  termNet: "",
};

export const insuranceObject = {
  liabilityStartDate: "",
  liabilityExpirationDate: "",
  compStartDate: "",
  compExpirationDate: "",
};

export const contractObject = {
  regular: "",
  afterHours: "",
  weekend: "",
  holiday: "",
  emergency: "",
  weekendEmergency: "",
  regularTripCharge: "",
  emergencyTripCharge: "",
  workRange: "",
};

export const businessPayload = (data) => {
  const payload = { ...data };
  payload.businessPhone = formatNumber(payload.businessPhone);
  payload.personalPhone = formatNumber(payload.personalPhone);
  payload.faxNumber = formatNumber(payload.faxNumber);
  return payload;
};
