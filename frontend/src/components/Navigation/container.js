import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
  state = {
    term: ""
  };

  static propTypes = {
    goToSearch: PropTypes.func.isRequired
  };

  _onInputChange = (event) => {
    const { target: { value } } = event;
    this.setState({
      term: value
    });
  };

  _onSubmit = (event) => {
    const { goToSearch } = this.props;
    const { term } = this.state;
    event.preventDefault();
    goToSearch(term);
    this.setState({
      term: ""
    });
  };

  render() {
    const { term } = this.state;
    return (
      <Navigation
        onSubmit={this._onSubmit}
        onInputChange={this._onInputChange}
        value={term}
      />
    );
  }
}

export default Container;
