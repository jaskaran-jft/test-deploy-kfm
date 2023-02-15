import { saveLocalStorageData } from "src/pages/AuthenticationInner/Login/utilsLogin";
import { setAuth, setTags, setTheme } from "src/store/actions";
import { APIClient, setAuthorization } from "../api_helper";

const api = new APIClient();
export const getUsers = () => api.get("/user/list");
export const SwitchUser = (userId, accessToken = false) =>
  api.create("/auth/reauth", { userId }, false, accessToken);

export const ImpersonateUser = (e, username, props, dispatch) => {
  const userE = JSON.parse(localStorage.getItem("authUser"));
  SwitchUser(username)
    .then((response) => {
      response.switch = {
        username: userE.userId,
        accessToken: userE.accessToken,
      };

      setAuthorization(response.accessToken);

      saveLocalStorageData(props, response);
      //   dispatch(setTags({ tags: response.tags, auth: response }));
      //   dispatch(setTheme(response.theme ? response.theme : {}));
      dispatch(setTags({ tags: response.tags, auth: response }));
      dispatch(setAuth({ domain: response.domain || {}, userData: response }));
      dispatch(setTheme(response.theme ? response.theme : {}));
    })
    .catch((error) => console.log({ error }));
};
