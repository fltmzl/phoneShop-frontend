import Counter from "@/components/common/Counter";
import { useState } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState<number>(1);

  const handleDecrease = () => {
    setCounter((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  const handleIncrease = () => {
    setCounter((prev) => {
      return prev + 1;
    });
  };

  // const CounterCompon

  return {
    // <Counter counter={counter} handleDecrease={handleDecrease} handleIncrease={handleIncrease} />
  };
};

export default useCounter;
