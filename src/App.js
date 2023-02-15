import React, { useEffect } from "react";

//import Scss
import "./assets/scss/themes.scss";
import { fetchTags } from "./helpers/AuthLogin/auth";

import Route from "./Routes";
import { useDispatch } from "react-redux";
import { setTags } from "./store/actions";
import "react-toastify/dist/ReactToastify.css";
import "react-intl-tel-input/dist/main.css";
import "./file.css";
import "./App.css";
import { messaging, onMessageListener } from "./Services/firebase";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkTags();
  }, []);

  const checkTags = async () => {
    try {
      const response = await fetchTags();
      localStorage.setItem(
        "tags",
        response ? JSON.stringify(response) : JSON.stringify([]),
      );
      dispatch(setTags({ tags: response, auth: response }));
    } catch (err) {
      console.log(err);
    }
  };

  onMessageListener()
    .then((payload) => {
      console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
