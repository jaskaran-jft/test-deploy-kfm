import { formatNumber } from "src/helpers/format_helper";
import {
  fetchAddress,
  fetchZipCode,
} from "../../helpers/AddressMethod/address";

export const changeDataFormat = (data) => {
  const newData = [];
  data.map((item) => {
    const newItem = { store: {}, address: {}, contact: {} };
    newItem.store.storeName = item["Store Name"] || item["storeName"];
    newItem.store.mall = item["Mall"] || item["mall"];
    newItem.address.streetAddress1 =
      item["Address Main"] || item["streetAddress1"];
    newItem.address.streetAddress2 =
      item["Street Address 2"] || item["streetAddress2"];
    newItem.address.zipCode = (item["Zip Code"] || item["zipCode"]).toString();
    newItem.address.place = item["Place"] || item["place"];
    newItem.address.state = item["State"] || item["state"];
    newItem.address.province = item["Area"] || item["province"];
    newItem.address.type = "Billing";
    newItem.contact.primaryContactEmail =
      item["Primary Contact Email"] || item["primaryContactEmail"];
    newItem.contact.primaryContactPhone = formatNumber(
      item["Primary Contact Phone"] || item["primaryContactPhone"]
    );
    newData.push(newItem);
    return item;
  });
  return newData;
};

////////////////////// address functions /////////////////
export const handleLocationChange = async (
  e,
  address,
  key,
  api,
  objCode,
  listSet,
  resetList,
  resetValue
) => {
  address[key] = e.target.value;

  address[key] = e.target.value;

  resetList.map((item) => {
    item([]);
  });

  resetValue.map((item) => {
    address[item] = "";
  });

  try {
    let dataToSend = {};
    objCode.map((code) => {
      dataToSend[code] = address[code];
      return null;
    });

    const response = await api(dataToSend);

    listSet(response || []);
  } catch (err) {
    console.log(err);
  }
};

export const handleAreaChange = async (e, key, address) => {
  address[key] = e.target.value;

  try {
    const response = await fetchZipCode({
      place: e.target.value,
      province: address.province,
      state: address.state,
    });
    address.zipCode = response.zipCode;
  } catch (err) {
    console.log(err);
  }
};

export const handleZipCodeChange = async (
  e,
  response,
  setAreaList,
  setCityList,
  setStateList
) => {
  let address = response ?? response.address;
  address.zipCode = e.target.value;

  if (e.target.value.length > 3 && e.target.value.length < 7) {
    try {
      const response = await fetchAddress({
        zipCode: e.target.value,
      });

      setAreaList(response.placeList || []);

      setCityList(response.provinceList || []);

      setStateList(response.stateList || []);

      address.country = response.selectedAddress.country;
      address.state = response.selectedAddress.state;
      address.province = response.selectedAddress.province;
      address.place = response.selectedAddress.place;
    } catch (err) {
      setAreaList([]);

      setCityList([]);

      setStateList([]);

      address.country = "";
      address.state = "";
      address.province = "";
      address.place = "";
    }
  }
};

export const storeUserPayload = (data) => {
  const newData = [];
  data.map((item) => {
    const newItem = { user: {}, contact: {} };
    newItem.user.firstName = item["First Name"] || item["firstName"];
    newItem.user.lastName = item["Last Name"] || item["lastName"];
    newItem.user.password = item["Password"] || item["password"];
    newItem.user.username = item["Username"] || item["username"];
    newItem.user.isManager =
      (item["Is Manager"] || item["isManager"]) === true ||
      (item["Is Manager"] || item["isManager"]) === "true" ||
      (item["Is Manager"] || item["isManager"]) === "TRUE";
    newItem.user.lastName = item["Last Name"] || item["lastName"];
    newItem.user.ext = item["Ext"] || item["ext"];

    newItem.contact.primaryContactEmail =
      item["Primary Contact Email"] || item["primaryContactEmail"];
    newItem.contact.primaryContactPhone = formatNumber(
      item["Primary Contact Phone"] || item["primaryContactPhone"]
    );
    newData.push(newItem);
    return item;
  });

  return newData;
};
