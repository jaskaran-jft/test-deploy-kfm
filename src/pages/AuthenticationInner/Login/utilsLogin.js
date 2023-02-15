export const saveLocalStorageData = (props, response) => {
  return new Promise((resolve, reject) => {
    const url = window.location;

    if (response.switch) {
      localStorage.setItem("switch", true);
      localStorage.setItem("switchUser", JSON.stringify(response.switch));
    }
    if (response.deleteSwitch) {
      localStorage.removeItem("switch");
      localStorage.removeItem("switchUser");
    }

    localStorage.setItem("lastLogin", JSON.stringify(response.lastLogin));
    localStorage.setItem("authUser", JSON.stringify(response));
    localStorage.setItem("tags", JSON.stringify(response.tags));
    localStorage.setItem("domain", JSON.stringify(response.domain));
    localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
    localStorage.setItem(
      "theme",
      response.theme ? JSON.stringify(response.theme) : JSON.stringify({}),
    );
    props.history.push("/dashboard");
    resolve("success");
  });
};
