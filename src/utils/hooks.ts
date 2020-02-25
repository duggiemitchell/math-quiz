import { useState } from "react";

export const useLocalStorage = (key: string, initVal: string | null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get local storage by key
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initVal;
    } catch (error) {
      console.log(error);
      return initVal;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
