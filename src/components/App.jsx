import { useState, useEffect } from 'react';
import Description from './Description.jsx';
import Options from './Options.jsx';
import Feedback from './Feedback.jsx';
import Notification from './Notification.jsx';

const LS_KEY = 'feedbacks';

export default function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem(LS_KEY);
    return (
      JSON.parse(savedFeedbacks) ?? {
        good: 0,
        neutral: 0,
        bad: 0,
      }
    );
  });

  function updateFeedback(feedbackType) {
    setFeedbacks({
      ...feedbacks,
      [feedbackType]: feedbacks[feedbackType] + 1,
    });
  }

  function handleResetFeedbacks() {
    setFeedbacks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }

  const totalFeedback = Object.values(feedbacks).reduce(
    (acc, value) => acc + value,
    0
  );

  const stats = Math.round(
    ((feedbacks.good + feedbacks.neutral) / totalFeedback) * 100
  );

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(feedbacks));
  }, [feedbacks]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        handleResetFeedbacks={handleResetFeedbacks}
        total={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback feedbacks={feedbacks} total={totalFeedback} stats={stats} />
      ) : (
        <Notification />
      )}
    </>
  );
}