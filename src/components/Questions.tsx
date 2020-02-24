import React, { useState, useEffect, useCallback } from "react";

import { fetchQuiz } from "../utils/api";

interface QuizProps {
  started: Boolean;
}
const Questions = ({ started }: QuizProps) => {
  const [quiz, setQuiz] = useState([]);
  const quizInProgress = started && quiz;

  const doFetchQuiz = useCallback(async () => {
    const ques = await fetchQuiz();
    setQuiz(ques);
  }, []);
  useEffect(() => {
    if (started) doFetchQuiz();
  }, []);

  return <> {quizInProgress && quiz.map(q => q.question)}</>;
};

export default Questions;
