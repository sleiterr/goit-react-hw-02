// App.jsx

import { useEffect, useState } from "react";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";
import styles from "./App.module.css";

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  useEffect(() => {
    const savedFeedback = localStorage.getItem("feedback");
    if (savedFeedback) {
      try {
        setFeedback(JSON.parse(savedFeedback));
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        setFeedback({ good: 0, neutral: 0, bad: 0 });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
    } else {
      setFeedback((prevState) => ({
        ...prevState,
        [feedbackType]: prevState[feedbackType] + 1,
      }));
    }
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedbackPercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

 return (
   <div className={styles.container}>
     <Description />
     <Options onLeaveFeedback={updateFeedback} totalFeedback={totalFeedback} />
     {totalFeedback > 0 ? (
       <Feedback
         good={feedback.good}
         neutral={feedback.neutral}
         bad={feedback.bad}
         total={totalFeedback}
         positivePercentage={positiveFeedbackPercentage}
       />
     ) : (
       <Notification />
     )}
   </div>
 );
};

export default App;
