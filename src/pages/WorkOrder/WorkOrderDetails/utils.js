import { deepClone } from "src/helpers/format_helper";

const baseObj = {
  quantity: 0,
  description: "",
  unitPrice: 0,
};

export const incurredLabourObj = {
  technicians: 0,
  rateType: "",
  ...baseObj,
  type: "Incurred",
};

export const incurredMaterialObj = {
  ...baseObj,
  type: "Incurred",
};

export const incurredTripObj = {
  tripCharge: "",
  ...baseObj,
  type: "Incurred",
};

export const estimateLabourObj = {
  technicians: 0,
  rateType: "",
  ...baseObj,
  type: "Estimate",
};

export const estimateMaterialObj = {
  ...baseObj,
  type: "Estimate",
};

export const estimateTripObj = {
  tripCharge: 0,
  ...baseObj,
  type: "Estimate",
};

export const addEstimateInitialValues = {
  vendorId: "",
  assessment: "",
  scopeOfRepairs: "",
};

export const initial = { data: [] };

export const initialReducer = (state = initial, action) => {
  let name, value, index;
  switch (action.type) {
    case "UPDATE":
      ({ name, value, index } = action.payload);
      state.data[index][name] = value;
      return {
        ...state,
        data: state.data,
      };
    case "ADD_MULTIPLE": {
      return {
        ...state,
        data: [...deepClone(action.payload)],
      };
    }
    case "ADD":
      return {
        ...state,
        data: [...state.data, deepClone(action.payload.object)],
      };
    case "DELETE":
      ({ index } = action.payload);
      state.data.splice(index, 1);
      return {
        ...state,
        data: state.data,
      };
    default:
      return state;
  }
};
