import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth.js";

export default function Navbar({ isLoggedIn, onChanged }) {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-title">Student/Course System</div>

      <div className="nav-actions">
        {isLoggedIn && (
          <>
            <Link className="link" to="/">Action</Link>
            <Link className="link" to="/lists">Lists</Link>
          </>
        )}

        <span className={`pill ${isLoggedIn ? "ok" : "bad"}`}>
          {isLoggedIn ? "Logged In" : "Logged Out"}
        </span>

        {isLoggedIn && (
          <button
            className="btn"
            onClick={() => {
              clearToken();
              onChanged();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}