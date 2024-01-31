import React, { useState } from "react";
import styles from "../.././styles/Authentication/Login.module.css";
import QUIZZIE from ".././Assets/QUIZZIE.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!email.trim()) {
      setEmailError("Invalid Email");
      isValid = false;
    } else if (!email.includes("@gmail.com")) {
      setEmailError("Invalid Email");
      isValid = false;
    } else {
      setEmailError("");
    }
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setEmail("");
    }
    if (validateForm()) {
      try {
        const response = await api.post("http://localhost:4000/Login", {
          email,
          password,
        });

        if (response.data.status === "Success") {
          console.log("Logged in successfully");

          localStorage.setItem("token", response.data.token);

          navigate("/Login/main");
        } else {
          console.error("Login failed:", response.data.message);

          setPasswordError("Invalid password");
          setPassword("");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginOuterBox}>
        <img src={QUIZZIE} alt="logo" className={styles.logo} />
        <div className={styles.buttons}>
          <Link to="/" className={styles.SignUpButton}>
            Sign Up
          </Link>
          <button className={styles.LoginButton}>Log In</button>
        </div>
        <form className={styles.loginform} onSubmit={handleSubmit}>
          <div className={styles.textBox}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="text"
              aria-label="email"
              value={email}
              placeholder={emailError}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            ></input>
          </div>
          <div className={styles.textBox}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              aria-label="password"
              value={password}
              placeholder={passError}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button className={styles.submitDetails} type="submit">
            Sign-In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
