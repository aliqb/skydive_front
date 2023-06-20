import { useState } from "react";
interface PlusMinusProps {
  onIncrease: (value: number) => void;
  onDecrease: (value: number) => void;
  value?: number;
  allowNegative?: boolean;
}

const PlusMinus: React.FC<PlusMinusProps> = ({
  onDecrease,
  onIncrease,
  value: defaulValue = 0,
  allowNegative = false,
}) => {
  const [value, setValue] = useState<number>(defaulValue ?? 0);

  function increase() {
    setValue((prevVlaue) => {
      const newVlaue = prevVlaue + 1;
      onIncrease(newVlaue);
      return newVlaue;
    });
  }

  function decrease() {
    if (value === 0) {
      return;
    }
    setValue((prevVlaue) => {
      const newVlaue = prevVlaue - 1;
      onIncrease(newVlaue);
      return newVlaue;
    });
  }

  return (
    <div className="flex gap-6 items-center">
      <button onClick={decrease} className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-pink-500 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      <div className="text-lg">{value}</div>
      <button onClick={increase} className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-white bg-pink-500 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlusMinus;
