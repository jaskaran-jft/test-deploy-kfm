import { CONSTANT } from "src/utils/constant";

const { COMPLETED, REJECTED, SCHEDULED } = CONSTANT;

export const formatNumber = (value) => {
  if (value) {
    value = value.toString();
    value = value.replace("+1 ", "");
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return `+1 ${value}`;
  }
};

export const arrayToString = (arr = []) => {
  let text = "";
  arr.map((_str, index) => (text += index === 0 ? _str : `, ${_str}`));
  return text;
};

export const dateDiff = (date) => {
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getDateTime = (date = new Date()) => {
  const currentDateTime = new Date(date);
  let totalTime = `${
    currentDateTime.toISOString().split("T")[0]
  }T${currentDateTime.getHours()}:${("0" + currentDateTime.getMinutes()).slice(
    -2,
  )}`;

  return totalTime;
};

export const getStatusColor = (status) => {
  let color = "primary";
  switch (status) {
    case COMPLETED:
    case "Approved":
    case "Paid":
      color = "success  custom-badge-rounded-pill ";
      break;
    case SCHEDULED:
    case "Pending":
    case "Processing":
      color = "warning  custom-badge-rounded-pill ";
      break;
    case "Awaiting Parts":
      color = "info  custom-badge-rounded-pill ";
      break;
    case REJECTED:
      color = "danger  custom-badge-rounded-pill ";
      break;
    case "Follow-up":
      color = "dark  custom-badge-rounded-pill ";
      break;
    case "Quote":
    case "Current":
      color = "custom-secondary  custom-badge-rounded-pill ";
      break;
    default:
      color = "primary  custom-badge-rounded-pill ";
      break;
  }

  return color;
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const noop = () => {};

export const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
