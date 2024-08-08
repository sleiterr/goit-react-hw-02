// Options.jsx

import "react";
import PropTypes from 'prop-types'
import styles from "./Options.module.css";

const Options = ({ onLeaveFeedback, totalFeedback }) => {
  const handleClick = (feedbackType) => {
    if (typeof onLeaveFeedback === "function") {
      onLeaveFeedback(feedbackType);
    } else {
      console.error("onLeaveFeedback is not a function");
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => handleClick("good")}>Good</button>
      <button onClick={() => handleClick("neutral")}>Neutral</button>
      <button onClick={() => handleClick("bad")}>Bad</button>
      {totalFeedback > 0 && (
        <button onClick={() => handleClick("reset")}>Reset</button>
      )}
    </div>
  );
};

Options.propTypes = {
  onLeaveFeedback: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number.isRequired,
};

export default Options;
