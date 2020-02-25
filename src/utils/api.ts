import { MAX_QUESTIONS } from "./constants";

export const fetchQuiz = async () => {
  const res = await fetch("http://localhost:4000/qa");
  const qa = await res.json();

  return qa.slice(0, MAX_QUESTIONS); // @todo make random...
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
