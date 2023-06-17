import { InputHTMLAttributes, forwardRef, Ref } from "react";
interface SDTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const SDTextInput = forwardRef(
  (props: SDTextInputProps, ref: Ref<HTMLInputElement>) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.className

    return (
      <input
        {...inputProps}
        id="password"
        ref={ref}
        className={`${
          props.invalid
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } ${props.className || ''} placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
    );
  }
);

export default SDTextInput;
