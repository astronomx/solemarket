import React, { useDebugValue, useEffect, useState } from "react";

export const useLocalStorage = <S>(
  key: string,
  initialState?: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [state, setState] = useState<S>(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? parse(item) : initialState;
    } else {
      return initialState as S;
    }
  });
  
  useDebugValue(state);

  useEffect(() => {
    // Check if window is defined (running on the client side)
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      if (item) setState(parse(item));
    }
  }, [key]);

  useEffect(() => {
    // Check if window is defined (running on the client side)
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};