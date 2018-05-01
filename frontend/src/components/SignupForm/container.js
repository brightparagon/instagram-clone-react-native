import React from "react";
import SignupForm from "./presenter";

class Container extends React.Component {
  state = {
    email: "",
    fullname: "",
    username: "",
    password: ""
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
      />
    );
  }
}

export default Container;