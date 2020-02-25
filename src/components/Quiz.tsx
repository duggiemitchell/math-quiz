import React, { useState } from "react";

import Questions from "./Questions";
import Timer from "./Timer";
import UserIcon from "./user/Icon";
import SetUser from "./user/Set";
import { useLocalStorage } from "../utils/hooks";

const Quiz = () => {
  const [inProgress, setInprogress] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);

  const start = () => {
    if (inProgress) {
      return;
    }
    setInprogress(true);
  };

  const saveUser = (user: string) => {
    setUser(user);
  };
  return (
    <>
      {user ? (
        <>
          <nav className="quiz-header">
            <div className="quiz-header-user">
              <UserIcon />
              <SetUser set={saveUser} type="edit" />
            </div>
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
        <SetUser set={saveUser} type="add" />
      )}
    </>
  );
};

export default Quiz;
