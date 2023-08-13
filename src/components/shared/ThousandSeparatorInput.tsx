import React, { ChangeEvent } from 'react';
import SDTextInput from './TextInput';

interface ThousandSeparatorInputProps {
  value: string | number;
  onChange: (value: string) => void;
  [rest: string]: any;
}

const ThousandSeparatorInput: React.FC<ThousandSeparatorInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/,/g, '');
    newValue = newValue.replace(/[^\d-]/g, '');

    if (newValue === '-') {
      onChange(newValue);
    } else {
      newValue = newValue.replace(/--/g, '');

      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue.toString());
      } else {
        onChange('');
      }
    }
  };

  return (
    <SDTextInput
      {...rest}
      value={value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      onChange={handleInputChange}
    />
  );
};

export default ThousandSeparatorInput;
