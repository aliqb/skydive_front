import React, { ChangeEvent } from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';
import SDTextInput from './TextInput';

interface ThousandSeparatorInputProps {
  register: UseFormRegister<any>;
  allowMinus?: boolean;
  name: string;
  options?: RegisterOptions;
}

const ThousandSeparatorInput: React.FC<ThousandSeparatorInputProps> = ({
  register,
  allowMinus = false,
  name,
  options = { required: 'فیلد اجباری است.' },
}) => {
  const formatWithThousandsSeparator = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    newValue = newValue.replace(/[^\d,-]/g, '');

    if (!allowMinus) {
      newValue = newValue.replace(/^-/g, '');
    }

    newValue = newValue.replace(/--/g, '-');

    newValue = newValue.replace(/,/g, '');

    const numericValue = parseFloat(newValue);

    if (!isNaN(numericValue)) {
      // Format the numeric value with thousands separators
      const formattedValue = numericValue.toLocaleString('fa-IR');
      register(name).onChange({ target: { value: formattedValue } });
    } else {
      register(name).onChange({ target: { value: '' } });
    }
  };

  return (
    <SDTextInput
      numeric={true}
      allowMinus={true}
      id={name}
      placeholder="مبلغ مورد نظر را وارد کنید"
      {...register(name, options)}
      onChange={handleInputChange}
    />
  );
};

export default ThousandSeparatorInput;
