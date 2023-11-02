// 実際にhooksを使用するファイル
import React from "react";
import { useCounter } from "./useCounter";

const CustomHooks = () => {
  const { count, increment, decrement, double, triple, reset } = useCounter(3);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>足す</button>
      <button onClick={decrement}>引く</button>
      <button onClick={double}>２倍</button>
      <button onClick={triple}>３倍</button>
      <button onClick={reset}>リセット</button>
    </div>
  );
};

export default CustomHooks;
