import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import AuthPanel from "./components/AuthPanel.jsx";
import CoursePanel from "./components/CoursePanel.jsx";
import ListsPanel from "./components/ListsPanel.jsx";
import { getToken } from "./utils/auth.js";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const isLoggedIn = useMemo(() => !!getToken(), [refreshKey]);

  return (
    <div className="container">
      <Navbar isLoggedIn={isLoggedIn} onChanged={() => setRefreshKey((k) => k + 1)} />

      <div className="grid">
        <div className="card">
          <h2>Authentication</h2>
          <AuthPanel onAuth={() => setRefreshKey((k) => k + 1)} />
        </div>

        <div className="card">
          <h2>Course Actions</h2>
          <CoursePanel refreshKey={refreshKey} />
        </div>

        <div className="card full">
          <h2>Lists</h2>
          <ListsPanel refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}