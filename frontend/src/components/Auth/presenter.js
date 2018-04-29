import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import phone from "images/phone.png";
import ios from "images/ios.png";
import android from "images/android.png";
 
const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.column}>
      <img src={phone} alt={context.t("Checkout our app. It's cool")} />
    </div>
    <div className={styles.column}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        {props.action === "login" && <LoginForm />}
        {props.action === "signup" && <SignupForm />}
      </div>
      <div className={styles.whiteBox}>
        {
          props.action === "login" && (
            <p>
              {context.t("Don't have an account?")}{" "}
              <span
                className={styles.changeLink}
                onClick={props.changeAction}
              >
                {context.t("Sign up")}
              </span>
            </p>
          )
        }
        {
          props.action === "signup" && (
            <p>
              {context.t("Have an account?")}{" "}
              <span
                className={styles.changeLink}
                onClick={props.changeAction}
              >
                {context.t("Log in")}
              </span>
            </p>
          )
        }
      </div>
      <div className={styles.appBox}>
        <span>{context.t("Get the app")}</span>
        <div className={styles.appstores}>
          <img
            src={ios}
            alt={context.t("Download it on the Apple Appstore")}
          />
          <img
            src={android}
            alt={context.t("Download it on the Apple Appstore")}
          />
        </div>
      </div>
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired
}
 
export default Auth;
