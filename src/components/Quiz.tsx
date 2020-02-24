import React, { useState } from "react";

import Questions from "./Questions";
import User from "./User";
import Timer from "./Timer";

const Quiz = () => {
  const [inProgress, setInprogress] = useState(false);
  const user = "Erica"; // @todo make user an input

  const start = () => {
    if (inProgress) {
      return;
    }
    setInprogress(true);
  };

  return (
    <>
      {user ? (
        <>
          <nav className="quiz-header">
            <User />
            {inProgress && <Timer start={inProgress} />}
          </nav>
          <main className="quiz-main">
            {inProgress ? (
              <Questions started={inProgress} />
            ) : (
              <div>
                <div className="quiz-hero">
                  <h1>Hello, {user}!</h1>
                  <p>time to take your quiz...</p>
                </div>

                <button onClick={start}>Begin</button>
              </div>
            )}
          </main>
        </>
      ) : (
        <div>enter your name...</div>
      )}
    </>
  );
};

export default Quiz;
