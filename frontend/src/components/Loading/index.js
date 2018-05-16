import React from "react";
import styles from "./styles.scss";
import loading from "images/loading.png";

const Loading = props => (
  <div className={styles.container}>
    <img src={loading} className={styles.spinner} alt="loading" />
  </div>
);

export default Loading;
