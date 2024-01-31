import React, { useState } from "react";
import styles from "../.././styles/Authentication/SignUp.module.css";
import QUIZZIE from ".././Assets/QUIZZIE.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const validateName = () => {
    let validName = true;
    if (!userName.trim()) {
      setUserError("Invalid Name");
      validName = false;
    } else if (!/^[a-zA-Z\s]*$/.test(userName)) {
      setUserError("Invalid Name");
      validName = false;
    } else {
      setUserError("");
    }
    return validName;
  };
  const validateEmail = () => {
    let validEmail = true;
    if (!email.trim()) {
      setEmailError("Invalid Email");
      validEmail = false;
    } else if (!email.includes("@gmail.com")) {
      setEmailError("Invalid Email");
      validEmail = false;
    } else {
      setEmailError("");
    }
    return validEmail;
  };
  const validatePass = () => {
    let isValid = true;
    if (password.trim() !== confirmPassword.trim()) {
      setPassError("Invalid Password");
      isValid = false;
    }
    return isValid;
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (validateName()) {
      console.log("logged in");
    } else {
      setUserName("");
    }
    if (validateEmail()) {
      console.log("logged in");
    } else {
      setEmail("");
    }
    if (validatePass()) {
      console.log("logged in");
    } else {
      setPassword("");
      setConfirmPassword("");
    }
    if (validateName() && validateEmail() && validatePass()) {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      try {
        const response = await api.post("http://localhost:4000/SignUp", {
          userName,
          email,
          password,
        });

        if (response.data.status === "ADDED") {
          console.log("User added successfully");
          navigate("/Login");
        } else {
          console.error("Failed to add user:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupOuterBox}>
        <img src={QUIZZIE} alt="logo" className={styles.logo} />
        <div className={styles.buttons}>
          <button className={styles.SignUpButton}>Sign Up</button>
          <Link to="/Login" className={styles.LoginButton}>
            Log In
          </Link>
        </div>
        <form className={styles.signUpform} onSubmit={handleChange}>
          <div className={styles.textBox}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              aria-label="Name"
              value={userName}
              placeholder={userError}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
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
              type="password"
              aria-label="password"
              value={password}
              placeholder={passError}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className={styles.textBox}>
            <label className={styles.label}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              aria-label="confirmPassword"
              value={confirmPassword}
              placeholder={passError}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <button className={styles.submitDetails} type="submit">
            Sign-Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
