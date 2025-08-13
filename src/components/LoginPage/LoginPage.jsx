import React from "react";
import LoginForm from "./LoginForm.jsx";
import styles from "./LoginPage.module.css";
import logo from "../../assets/logo.png"

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPanel}>
        <img src={logo} alt="logo" />
        <div className={styles.loginForm}>
          <LoginForm />
        </div>
      </div>
      <div className={styles.rightPanel}></div>
    </div>
  );
};

export default LoginPage;
