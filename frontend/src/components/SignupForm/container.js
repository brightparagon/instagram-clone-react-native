import React from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends React.Component {
  state = {
    email: "",
    fullname: "",
    username: "",
    password: ""
  };

  static propTypes = {
    facebookLogin: PropTypes.func.isRequired
  };

  _handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  };
 
  _handleSubmit = event => {
    event.preventDefault();
    // action
  };

  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };

  render() {
    const { email, fullname, username, password } = this.state;
    return (
      <SignupForm
        emailValue={email}
        fullnameValue={fullname}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }
}

export default Container;