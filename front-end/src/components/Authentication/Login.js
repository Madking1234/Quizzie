import React, { useState } from "react";
import styles from "../.././styles/Authentication/Login.module.css";
import QUIZZIE from ".././Assets/QUIZZIE.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  console.log(email);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("form submittes");
    } else {
      console.log("try again");
      setEmail("");
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
            ></input>
          </div>
          <div className={styles.textBox}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="text"
              aria-label="password"
              value={password}
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
