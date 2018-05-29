import React, { Component } from "react";
import FeedPhoto from "./presenter";

class Container extends Component {
  state = {
    seeingLikes: false
  };

  _openLikes = () => {
    const { getPhotoLikes } = this.props;
    this.setState({
      seeingLikes: true
    });
    getPhotoLikes();
  };
  
  _closeLikes = () => {
    this.setState({
      seeingLikes: false
    });
  };

  render() {
    return (
      <FeedPhoto
        {...this.props}
        {...this.state}
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
      />
    );
  }
}

export default Container;
