import React, { useState, useEffect } from "react";

const Timer = ({ start }) => {
  const [timer, setTimer] = useState(0);

  return <>{start && timer && <div>{timer}</div>}</>;
};

export default Timer;
