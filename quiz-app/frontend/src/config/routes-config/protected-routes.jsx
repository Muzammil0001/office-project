import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <h1 className="text-center text-xl text-red-600 mt-5">
        401 Unauthorized Access.
      </h1>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
