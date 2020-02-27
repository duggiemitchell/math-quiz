import React, { useState, useEffect } from "react";

import Questions from "./Questions";
import UserIcon from "./user/Icon";
import SetUser from "./user/Set";
import { useLocalStorage, useTimer } from "../utils/hooks";
import { MAX_TIME } from "../utils/constants";
import { initiateTimer } from "../utils/api";

const Quiz = () => {
  const [inProgress, setInProgress] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useTimer(inProgress);

  const start = () => {
    if (!inProgress) {
      setInProgress(true);
    }
    setTimer(10);
    setShowTimer(true);
  };
  const saveUser = (user: string) => {
    setUser(user);
  };
  const complete = () => {
    /* called when the quiiz is done in time */
    setShowTimer(false);
    setTimer(null);
  };
  const timeIsExpired = inProgress && timer === 0;

  if (timeIsExpired) {
    return (
      <div>
        Time is up! <button onClick={start}>Try again!</button>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <>
          <nav className="quiz-header">
            <div className="quiz-header-user">
              <UserIcon />
              {!showTimer && <SetUser set={saveUser} type="edit" />}
            </div>
            {showTimer && <div>{timer}</div>}
          </nav>
          <main className="quiz-main">
            {inProgress ? (
              <Questions
                started={inProgress}
                handleComplete={complete}
                handleRetry={start}
              />
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
        <SetUser set={saveUser} type="add" />
      )}
    </>
  );
};

export default Quiz;
