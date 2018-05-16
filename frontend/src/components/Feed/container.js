import React from "react";
import Feed from "./presenter";

class Container extends React.Component {
  state = {
    loading: true
  };

  render() {
    return <Feed {...this.state} />;
  }
}

export default Container;
