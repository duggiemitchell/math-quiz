import React, { useState, useEffect, useCallback } from "react";

import AnswerInput from "./AnswerInput";
import { fetchQuiz } from "../utils/api";
import { QA } from "../utils/types";

interface QuizProps {
  started: Boolean;
}
const Questions = ({ started }: QuizProps) => {
  const [quiz, setQuiz] = useState([]);
  const [attempt, setAttempt] = useState(1);
  const [qaKey, setQaKey] = useState([]);

  const quizInProgress = started && quiz;

  const validateAnswer = (qa: QA) => {
    setQaKey([...qaKey, qa]);
  };
  const doFetchQuiz = useCallback(async () => {
    const ques = await fetchQuiz(attempt);
    setQuiz(ques);
  }, []);

  useEffect(() => {
    if (started) doFetchQuiz();
  }, []);
  return (
    <ul className="quiz-questions">
      {quizInProgress &&
        quiz.map(({ question, answer }, idx) => {
          return (
            <li key={idx}>
              {question}{" "}
              <AnswerInput
                id={`${idx + 1}`}
                validateAnswer={validateAnswer}
                answerKey={answer}
              />
            </li>
          );
        })}
      <button>complete</button>
    </ul>
  );
};

export default Questions;
