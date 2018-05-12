import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends React.Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired
  };

  _handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  _handleSubmit = event => {
    event.preventDefault();
    const { usernameLogin } = this.props;
    const { username, password } = this.state;
    usernameLogin(username, password);
  }

  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  }

  render() {
    const { username, password } = this.state;
    return (
      <LoginForm
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
