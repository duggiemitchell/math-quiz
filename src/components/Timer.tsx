import React, { useState, useEffect } from "react";

interface Props {
  start: boolean;
  stop: () => void;
}

const Timer = ({ start, stop }: Props) => {
  const [time, setTime] = useState(5); /* make 5 mins... */
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTime(time - 1);

        if (time === 0) {
          stop();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  return <>{start && time && <div>{time}</div>}</>;
};

export default Timer;
