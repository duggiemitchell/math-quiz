import { useState, useEffect } from "react";

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

  const setValue = (value: any) => {
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

export const useTimer = (start: boolean) => {
  const [timer, setTimer] = useState(null);
  // @todo make display friendly...
  useEffect(() => {
    if (start && timer) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  });
  return [timer, setTimer];
};
