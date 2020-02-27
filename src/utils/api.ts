import { MAX_QUESTIONS } from "./constants";

export const fetchQuiz = async () => {
  const res = await fetch("http://localhost:4000/qa");
  const qa = await res.json();

  const quiz = qa
    .sort(() => Math.random() - Math.random())
    .slice(0, MAX_QUESTIONS);
  return quiz;
};

export const calculateScore = async result => {
  const max = MAX_QUESTIONS;
  const correct = [];
  for (const property in result) {
    if (result[property] === true) {
      correct.push(result);
    }
  }
  return (correct.length / max) * 100;
};

export const initiateTimer = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};
