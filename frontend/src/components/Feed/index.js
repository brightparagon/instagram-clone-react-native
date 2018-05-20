import { connect } from "react-redux";
import Container from "./container";
import { actionCreators } from "redux/modules/photo";

const matStateToProps = (state, ownProps) => {
  const { photo: { feed } } = state;
  return {
    feed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeed: () => {
      dispatch(actionCreators.getFeed());
    }
  }
};

export default connect(matStateToProps, mapDispatchToProps)(Container);
