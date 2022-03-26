/** @format */

import React from "react";

import { Navigate } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }, props) => {
  let token = localStorage.getItem("token");

  return token ? <component {...props} {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;

/*  <Route
  {...rest}
  render={(props) =>
    !isAuthenticated && !loading ? (
      <Navigate to="/login" />
    ) : (
      <Component {...props} />
    )
  }
/>  */
