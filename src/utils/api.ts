export const fetchQuiz = async () => {
  const res = await fetch("http://localhost:4000/qa");
  return await res.json();
};
