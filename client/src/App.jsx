import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ListsPage from "./pages/ListsPage.jsx";

import { getToken } from "./utils/auth.js";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const isLoggedIn = useMemo(() => !!getToken(), [refreshKey]);

  return (
    <div className="container">
      <Navbar isLoggedIn={isLoggedIn} onChanged={() => setRefreshKey((k) => k + 1)} />

      <Routes>
        <Route
          path="/login"
          element={<LoginPage onAuth={() => setRefreshKey((k) => k + 1)} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage refreshKey={refreshKey} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/lists"
          element={
            <ProtectedRoute>
              <ListsPage refreshKey={refreshKey} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}