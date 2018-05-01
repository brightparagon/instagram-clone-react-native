import React from "react";
import PropTypes from "prop-types";
import Ionicons from "react-ionicons";
import formStyles from "shared/formStyles.scss"

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3>{context.t("Sign up to see photos and videos from your friends.")}</h3>
    <button className={formStyles.button}>
      <Ionicons icon="logo-facebook" fontSize="20px" color="white" /> {context.t("Log in with Facebook")}
    </button>
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="email" placeholder={context.t("Email")} className={formStyles.textInput}
        name="email" value={props.emailValue} onChange={props.handleInputChange}
      />
      <input
        type="text" placeholder={context.t("Full Name")} className={formStyles.textInput}
        name="fullname" value={props.fullnameValue} onChange={props.handleInputChange}
      />
      <input
        type="username" placeholder={context.t("Username")} className={formStyles.textInput}
        name="username" value={props.usernameValue} onChange={props.handleInputChange}
      />
      <input
        type="password" placeholder={context.t("Password")} className={formStyles.textInput}
        name="password" value={props.passwordValue} onChange={props.handleInputChange}
      />
      <input type="submit" value={context.t("Sign up")} className={formStyles.button} />
    </form>
    <p>
      {context.t("By signing up, you agree to our")} <span>{context.t("Terms & Privacy Policy")}</span>.
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  fullnameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
}

export default SignupForm;
