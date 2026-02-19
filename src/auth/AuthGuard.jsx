import React, { Children } from "react";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({
  children,
  required = false,
  redirect = "/login",
}) => {
  const data = JSON.parse(localStorage.getItem("blog_ldata"));
  const authorised = !!data;
  if (required && !authorised) {
    return <Navigate to={redirect} replace />;
  }
  if (!required && authorised) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
