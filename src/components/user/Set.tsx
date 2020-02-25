import React, { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../../utils/hooks";

interface Props {
  set: (user: string) => void;
  type: "edit" | "add";
}
const SetUser = ({ set, type }: Props) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [newUser, setNewUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const editEl = useRef(null);

  const reset = () => {
    setIsEditing(false);
  };
  const edit = () => {
    setIsEditing(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing) {
      reset();
    }
    const quizzer = newUser ? newUser : user;
    //   save user to the local storage...
    setUser(quizzer.trim());
    /* callback to set user at top level up the app.  It may be preferable to have this callback live elsewhere to be set from anywhere? */
    set(quizzer.trim());
  };

  useEffect(() => {
    if (isEditing) {
      editEl.current.focus();
    }
  }, [isEditing, editEl]);

  const content = {
    add: [
      <form className="quiz-set-user" onSubmit={handleSubmit} key="set-user">
        <label htmlFor="user">
          Please, enter your name to take the quiz...
        </label>
        <input required type="text" onChange={handleChange} />
        <button type="submit">Enter</button>
      </form>
    ],
    edit: [
      <form className="quiz-edit-user" onSubmit={handleSubmit} key="edit-user">
        <span>Not {user}?</span>{" "}
        {isEditing ? (
          <input onBlur={reset} onChange={handleEdit} ref={editEl} />
        ) : (
          <span onClick={edit}>Edit</span>
        )}
      </form>
    ]
  };
  return <>{content[type]}</>;
};

export default SetUser;
//
