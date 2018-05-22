import React from "react";
import PropTyes from "prop-types";
import styles from "./styles.scss";

const FeedPhoto = (props, context) => {
  console.log(props)
  return <div className={styles.feedPhoto}>hello!</div>;
};

FeedPhoto.propTypes = {
  creator: PropTyes.shape({
    profile_image: PropTyes.string,
    username: PropTyes.string.isRequired
  }).isRequired,
  location: PropTyes.string.isRequired,
  file: PropTyes.string.isRequired,
  like_count: PropTyes.number.isRequired,
  caption: PropTyes.string.isRequired,
  comments: PropTyes.arrayOf(
    PropTyes.shape({
      message: PropTyes.string.isRequired,
      creator: PropTyes.shape({
        profile_image: PropTyes.string,
        username: PropTyes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  created_at: PropTyes.string.isRequired
};

export default FeedPhoto;
