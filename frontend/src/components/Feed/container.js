import React from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

class Container extends React.Component {
  state = {
    loading: true
  };

  static propTypes = {
    getFeed: PropTypes.func.isRequired
  };

  render() {
    return <Feed {...this.state} />;
  }

  componentDidMount() {
    const { getFeed } = this.props;
    getFeed();
  }
}

export default Container;
