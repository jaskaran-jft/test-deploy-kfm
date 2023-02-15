import React, { createContext, useEffect, useState, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";
//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from "./AuthProtected";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import PageNotFound from "src/pages/PageNotFound/404";
import Dashboard from "src/pages/DashboardEcommerce";
import Loading from "src/common/Loader";
import Notifications from "src/pages/Notifications";

const ChangePassword = React.lazy(() =>
  import("../pages/changePassword/changePassword"),
);
export const TagsContext = createContext();

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);

  ///context api integration....
  const { tags } = useSelector((state) => state.Login);

  return (
    <React.Fragment>
      <TagsContext.Provider value={{ tags: tags || [] }}>
        <Switch>
          <Route path={availablePublicRoutesPaths}>
            <NonAuthLayout>
              <Switch>
                {publicRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </Switch>
            </NonAuthLayout>
          </Route>

          <Route path={availableAuthRoutesPath}>
            <AuthProtected>
              <VerticalLayout>
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route
                      path="/dashboard"
                      component={Dashboard}
                      exact={true}
                    />
                    <Route
                      path="/notifications"
                      component={Notifications}
                      exact={true}
                    />
                    <Route
                      path="/change_password"
                      component={ChangePassword}
                      exact={true}
                    />
                    {authProtectedRoutes.map((route, idx) => (
                      <AccessRoute
                        path={route.path}
                        component={route.component}
                        data={route.data || ""}
                        tag={route.tag || ""}
                        key={idx}
                        exact={true}
                      />
                    ))}
                    <Route
                      path="*"
                      render={(props) => {
                        return <PageNotFound {...props} />;
                      }}
                    />
                  </Switch>
                </Suspense>
              </VerticalLayout>
            </AuthProtected>
          </Route>
        </Switch>
      </TagsContext.Provider>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Index;
