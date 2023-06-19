import React from "react";
import { Radio } from "flowbite-react";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="flex">
      {options.map((option) => (
        <div key={option.value} className="flex  items-center mr-5">
          <Radio
            name="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onOptionChange(option.value)}
          />
          <label className="mr-3">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
