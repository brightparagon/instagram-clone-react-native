import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentBox from "./presenter";

class Container extends Component {
  state = {
    comment: ""
  };

  // a way of defining prop-types when using class component
  static propTypes = {
    photoId: PropTypes.number.isRequired,
    submitComment: PropTypes.func.isRequired
  };

  _handleInputChange = event => {
    const { target: { value } } = event;
    this.setState({
      comment: value
    });
  };

  _handleKeyPress = event => {
    const { submitComment } = this.props;
    const { comment } = this.state;
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      submitComment(comment);
    }
  };

  render() {
    return (
      <CommentBox
        {...this.state}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
      />
    );
  }
}

export default Container;
