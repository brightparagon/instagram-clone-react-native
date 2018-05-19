import { connect } from "react-redux";
import Container from "./container";
import { actionCreators } from "redux/modules/photo";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeed: () => {
      dispatch(actionCreators.getFeed());
    }
  }
};

export default connect(null, mapDispatchToProps)(Container);
