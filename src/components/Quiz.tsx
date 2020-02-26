import React, { useState } from "react";

import Questions from "./Questions";
import Timer from "./Timer";
import UserIcon from "./user/Icon";
import SetUser from "./user/Set";
import { useLocalStorage } from "../utils/hooks";

const Quiz = () => {
  const [inProgress, setInProgress] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const [quizComplete, setQuizComplete] = useState(false);

  const start = () => {
    if (inProgress) {
      return;
    }
    if (quizComplete) {
      setQuizComplete(false);
    }
    setInProgress(true);
  };
  const saveUser = (user: string) => {
    setUser(user);
  };
  const stop = () => {
    setInProgress(false);
    setQuizComplete(true);
  };
  /* @todo
    hide timer when complete...
    hide setUser when inprocess...
  */

  if (quizComplete) {
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
              <SetUser set={saveUser} type="edit" />
            </div>
            {inProgress && <Timer start={inProgress} stop={stop} />}
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
        <SetUser set={saveUser} type="add" />
      )}
    </>
  );
};

export default Quiz;
