import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photo";

// react-redux의 connect 함수가 mapSomethingToProps 함수에
// redux store의 dispatch와 props를 주입해준다
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComment: (message) => {
      dispatch(photoActions.commentPhoto(ownProps.photoId, message));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
