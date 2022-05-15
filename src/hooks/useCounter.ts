import { useState } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);

  const increment = (inc: number = 1) =>
    setCount((prevCount) => prevCount + inc);

  const decrement = (dec: number = 1) =>
    setCount((prevCount) => prevCount - dec);

  return {
    count,
    increment,
    decrement,
  };
}
