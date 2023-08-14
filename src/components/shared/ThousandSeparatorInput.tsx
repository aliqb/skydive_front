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
  allowMinus,
  name,
  options = { required: 'فیلد اجباری است.' },
}) => {
  const formatWithThousandsSeparator = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    newValue = newValue.replace(/[^\d-]/g, '');

    if (!allowMinus) {
      newValue = newValue.replace(/^-/g, '');
    }

    newValue = newValue.replace(/--/g, '-');

    newValue = newValue.replace(/,/g, '');

    if (newValue === '-' || newValue === '') {
      e.target.value = newValue;
    } else {
      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        const formattedValue = formatWithThousandsSeparator(newValue);
        e.target.value = formattedValue;
      } else {
        e.target.value = '';
      }
    }

    register(name).onChange({ target: { value: e.target.value } });
  };
  

  return (
    <SDTextInput
      numeric={true}
      allowMinus={allowMinus}
      maxLength={12}
      id={name}
      placeholder="مبلغ مورد نظر را وارد کنید"
      {...register(name, options)}
      onChange={handleInputChange}
      dir="ltr"
      className="text-center"
    />
  );
};

export default ThousandSeparatorInput;
