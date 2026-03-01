import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN, SIGNUP } from "../graphql/mutations.js";
import { setToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

const emptySignup = {
  studentNumber: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  phoneNumber: "",
  email: "",
  program: ""
};

export default function AuthPanel({ onAuth, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);
  const [loginData, setLoginData] = useState({ studentNumber: "", password: "" });
  const [signupData, setSignupData] = useState(emptySignup);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [doLogin, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setToken(data.login.token);
      onAuth();
      navigate("/");  
    },
    onError: (e) => setMsg(`❌ ${e.message}`)
  });

  const [doSignup, { loading: signupLoading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      setToken(data.signup.token);
      onAuth();
      navigate("/");   // 👈 redirect
    },
    onError: (e) => setMsg(`${e.message}`)
  });

  return (
    <div>
      <div className="row">
        <button className={`tab ${mode === "login" ? "active" : ""}`} onClick={() => setMode("login")}>
          Login
        </button>
        <button className={`tab ${mode === "signup" ? "active" : ""}`} onClick={() => setMode("signup")}>
          Sign Up
        </button>
      </div>

      {mode === "login" ? (
        <div className="stack">
          <input
            className="input"
            placeholder="Student Number"
            value={loginData.studentNumber}
            onChange={(e) => setLoginData({ ...loginData, studentNumber: e.target.value })}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <button
            className="btn primary"
            disabled={loginLoading}
            onClick={() => doLogin({ variables: loginData })}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      ) : (
        <div className="stack">
          {Object.keys(emptySignup).map((k) => (
            <input
              key={k}
              className="input"
              placeholder={k}
              type={k === "password" ? "password" : "text"}
              value={signupData[k]}
              onChange={(e) => setSignupData({ ...signupData, [k]: e.target.value })}
            />
          ))}
          <button
            className="btn primary"
            disabled={signupLoading}
            onClick={() => doSignup({ variables: { input: signupData } })}
          >
            {signupLoading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      )}

      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}