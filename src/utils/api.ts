export const fetchQuiz = async level => {
  const res = await fetch("http://localhost:4000/qa");
  const qa = await res.json();

  return qa.filter(item => item.level === level).slice(0, 10); // @todo make random...
};
