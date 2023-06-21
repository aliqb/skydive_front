import React from "react";
import { Radio } from "flowbite-react";
import SDLabel from "./Label";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  name: string;
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="flex">
      {options.map((option) => (
        <div key={option.value} className="flex  items-center mr-5">
          <Radio
            name={name}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onOptionChange(option.value)}
          />
          <SDLabel className="mr-3">{option.label}</SDLabel>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
