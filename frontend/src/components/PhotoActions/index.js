import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photo";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if(ownProps.isLiked) {
        dispatch(photoActions.doUnlikePhoto(ownProps.photoId));
      } else {
        dispatch(photoActions.doLikePhoto(ownProps.photoId));
      }
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
