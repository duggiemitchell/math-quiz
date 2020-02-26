import React, { useState, ChangeEvent } from "react";
import { QA } from "../utils/types";

interface Props {
  id: string;
  answerKey: number;
  validateAnswer: (qa: QA) => void;
}
const AnswerInput = ({ id, validateAnswer, answerKey }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };
  const validate = () => {
    const isValid = answerKey === Number(answer);
    validateAnswer({ [id]: isValid });
  };

  return (
    <input id={id} type="number" onChange={handleChange} onBlur={validate} />
  );
};

export default AnswerInput;
