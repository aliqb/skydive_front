import { InputHTMLAttributes, forwardRef, Ref } from "react";
import { replacePersianArabicsNumbers } from "../../utils/shared";
export interface SDTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  numeric?: boolean;
}

const SDTextInput = forwardRef(
  (props: SDTextInputProps, ref: Ref<HTMLInputElement>) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.numeric;
    delete inputProps.className

    const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      let value = event.target.value;
      value = replacePersianArabicsNumbers(value);
      if (props.numeric) {
        if (value === '' || value === '-') {
          event.target.value = '';
        } else if (/^-/.test(value)) {
          value = value.replace(/[^\d-]/g, '');
          event.target.value = value;
        } else {
          value = value.replace(/[^\d]/g, '');
          event.target.value = value;
        }
      }
    };

    return (
      <>
        <input
          {...inputProps}
          id={props.id}
          onInput={inputProps.onInput ? inputProps.onInput : inputHandler}
          ref={ref}
          className={`${
            props.invalid
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          } ${
            props.className || ''
          } placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      </>
    );
  }
);

export default SDTextInput;
