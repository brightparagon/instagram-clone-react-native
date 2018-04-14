import React from "react";
import styles from "./styles.scss";
import phone from "images/phone.png";
import ios from "images/ios.png";
import android from "images/android.png";
 
const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.column}>
      <img src={phone} alt="Checkout our app. Is cool" />
    </div>
    <div className={styles.column}>
      <div className={styles.whiteBox}>
        {(() => {
          switch (props.action) {
            case "login":
              return (
                <p>
                  Don't have an account?{" "}
                  <span
                    className={styles.changeLink}
                    onClick={props.changeAction}
                  >
                    Sign up
                  </span>
                </p>
              );
            case "signup":
              return (
                <p>
                  Have an account?{" "}
                  <span
                    className={styles.changeLink}
                    onClick={props.changeAction}
                  >
                    Log in
                  </span>
                </p>
              );
            default:
              return null;
          }
        })()}
      </div>
      <div className={styles.appBox}>
        <span>Get the app</span>
        <div className={styles.appstores}>
          <img
            src={ios}
            alt="Download it on the Apple Appstore"
          />
          <img
            src={android}
            alt="Download it on the Apple Appstore"
          />
        </div>
      </div>
    </div>
  </main>
);
 
 export default Auth;
