import React from "react";
import { clearToken } from "../utils/auth.js";

export default function Navbar({ isLoggedIn, onChanged }) {
  return (
    <div className="nav">
      <div className="nav-title">Student/Course System</div>
      <div className="nav-actions">
        <span className={`pill ${isLoggedIn ? "ok" : "bad"}`}>
          {isLoggedIn ? "Logged In" : "Logged Out"}
        </span>
        {isLoggedIn && (
          <button
            className="btn"
            onClick={() => {
              clearToken();
              onChanged();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}