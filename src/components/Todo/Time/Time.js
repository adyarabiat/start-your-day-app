import React, { useState, useEffect } from "react";

export const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const greeting = () => {
    const time = date.getHours();
    if (time <= 12) {
      return "Good Morning";
    } else {
      return "Good Evning";
    }
  };
  return (
    <div>
      <h1>{date.toLocaleTimeString()}</h1>
      <h4>{greeting()}</h4>
    </div>
  );
};

export default DateTime;
