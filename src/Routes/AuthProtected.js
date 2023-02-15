import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";
import { TagsContext } from ".";

const AuthProtected = (props) => {
  const dispatch = useDispatch();

  const { userProfile, loading, token } = useProfile();
  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    redirect is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({
  component: Component,
  data: Data,
  tag: TagName,
  ...rest
}) => {
  const { tags } = useContext(TagsContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (tags.indexOf(TagName) !== -1) {
          return (
            <>
              {" "}
              <Component data={Data} {...props} />{" "}
            </>
          );
        }
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
