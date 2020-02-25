import React from "react";
import { useLocalStorage } from "../../utils/hooks";

const SetUser = ({ set }: { set: (user: string) => void }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   save user to the local storage...
    setUser(user.trim());
    /* callback to set user at top level up the app.  It may be preferable to have this callback live elsewhere to be set from anywhere? */
    set(user.trim());
  };
  return (
    <form className="quiz-set-user" onSubmit={handleSubmit}>
      <label htmlFor="user">Please, enter your name to take the quiz...</label>
      <input required type="text" onChange={handleChange} />
      <button type="submit">Enter</button>
    </form>
  );
};

export default SetUser;
//
