import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth.js";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = !!getToken();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}