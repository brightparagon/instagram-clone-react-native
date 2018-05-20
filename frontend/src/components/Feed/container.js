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
    const { feed } = this.props;
    return <Feed {...this.state} feed={feed} />;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.feed) {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    const { getFeed } = this.props;

    // persistence: if reducer already has data don't send an api request
    if(!this.props.feed) {
      getFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
}

export default Container;
