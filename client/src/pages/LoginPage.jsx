import React from "react";
import AuthPanel from "../components/AuthPanel.jsx";

export default function LoginPage({ onAuth }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>
        <AuthPanel defaultMode="login" onAuth={onAuth} />
      </div>
    </div>
  );
}