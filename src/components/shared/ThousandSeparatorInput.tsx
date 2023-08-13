import React, { ChangeEvent } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (!allowMinus) {
      newValue = newValue.replace(/-/g, '');
    }

    newValue = newValue.replace(/,/g, '');
    newValue = newValue.replace(/[^\d-]/g, '');
    console.log(newValue);
    if (newValue === '-' || newValue === '--') {
      register(name).onChange({ target: { value: newValue } });
    } else {
      newValue = newValue.replace(/--/g, '');

      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        register(name).onChange({ target: { value: numericValue.toString() } });
      } else {
        register(name).onChange({ target: { value: '' } });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-4">
      <SDTextInput
        numeric={true}
        id={name}
        {...register(name, options)}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ThousandSeparatorInput;
