import React, { useState, useEffect, useCallback } from "react";

import AnswerInput from "./AnswerInput";
import { fetchQuiz, calculateScore } from "../../utils/api";
import { QA } from "../../utils/types";
import { FAILED_SCORE } from "../../utils/constants";

interface QuizProps {
  started: Boolean;
  handleComplete: () => void;
  handleRetry: () => void;
}

const QuizQuestions = ({ started, handleComplete, handleRetry }: QuizProps) => {
  const [quiz, setQuiz] = useState([]);
  const [qaKey, setQaKey] = useState({});
  const [score, setScore] = useState(null);

  const quizInProgress = started && quiz;
  const passingScore = score > FAILED_SCORE;

  const validateAnswer = (qa: QA) => {
    const question = Object.keys(qa)[0];
    const answer = Object.values(qa)[0];
    const score = {
      ...qaKey,
      [question]: answer
    };
    setQaKey(prevState => {
      return { ...prevState, ...score };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const score = await calculateScore(qaKey);
    setScore(score);
    handleComplete();
  };
  const retry = () => {
    setScore(null);
    doFetchQuiz();
    handleRetry();
  };
  const doFetchQuiz = useCallback(async () => {
    const questions = await fetchQuiz();
    const questionResults = {};
    questions.forEach(({ id }) => (questionResults[id] = false));
    setQuiz(questions);
    setQaKey(questionResults);
  }, []);
  const nextSteps = passingScore ? (
    <>
      <span>Move to the next level!</span>
      <button onClick={retry}>Next Level</button>
    </>
  ) : (
    <>
      <span>Uh oh, that's not a passing score :(</span>
      <button onClick={retry}>Try again</button>
    </>
  );

  useEffect(() => {
    if (started) {
      doFetchQuiz();
    }
  }, []);

  const hasScore = score != null;
  if (hasScore) {
    return (
      <div>
        <div>You scored: {score}%</div>
        <div>{nextSteps}</div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <ul className="quiz-questions">
        {quizInProgress &&
          quiz.map(({ question, answer, id }) => {
            return (
              <li key={id}>
                {question}{" "}
                <AnswerInput
                  id={id}
                  validateAnswer={validateAnswer}
                  answerKey={answer}
                />
              </li>
            );
          })}
        <button type="submit">complete</button>
      </ul>
    </form>
  );
};

export default QuizQuestions;
