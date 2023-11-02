import { useState } from "react";

export const useCounter = (init) => {
  const [count, setCount] = useState(init);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };

  const double = () => {
    setCount((count) => count * 2);
  };

  const triple = () => {
    setCount((count) => count * 3);
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, decrement, double, triple, reset };
};
