import React from "react";
import { FC } from "react";

interface Props {
  counter: number;
  handleIncrease: any;
  handleDecrease: any;
}

const Counter: FC<Props> = ({ counter, handleIncrease, handleDecrease }) => {
  return (
    <div className="flex-center gap-3 w-fit border border-gray-400 rounded-full">
      <button onClick={handleDecrease} className="py-2 px-4 hover-pri rounded-full aspect-square">
        -
      </button>
      <div>{counter}</div>
      <button onClick={handleIncrease} className="py-2 px-4 hover-pri rounded-full aspect-square">
        +
      </button>
    </div>
  );
};

export default Counter;
