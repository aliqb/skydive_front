import { InputHTMLAttributes, forwardRef, Ref } from "react";
import { replacePersianArabicsNumbers } from "../../utils/shared";
import SDButton from "./Button";
import SDSpinner from "./Spinner";

export interface SDTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  numeric?: boolean;
  allowMinus?: boolean;
  magnifier?: boolean;
  onButtonClick?: () => void;
  isPending?: boolean;
}

const SDTextInput = forwardRef(
  (props: SDTextInputProps, ref: Ref<HTMLInputElement>) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.numeric;
    delete inputProps.allowMinus;
    delete inputProps.magnifier;
    delete inputProps.className;
    delete inputProps.isPending;

    const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      let value = event.target.value;
      value = replacePersianArabicsNumbers(value);

      if (props.numeric) {
        if (!props.allowMinus) {
          value = value.replace(/[^0-9]/g, "");
        } else {
          value = value.replace(/[^0-9-]/g, "");
          value = value.replace(/--/g, "-");
        }

        if (value.startsWith("-")) {
          value = "-" + value.replace(/-/g, "");
        }
      }
      if (props.numeric && (isNaN(parseFloat(value)) || value === "")) {
        value = "0";
      }
      event.target.value = value;
    };

    return (
      <div className="relative">
        <input
          {...inputProps}
          id={props.id}
          onInput={inputProps.onInput ? inputProps.onInput : inputHandler}
          ref={ref}
          className={`${
            props.invalid
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          } ${
            props.className || ""
          } placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />

        {props.isPending ? (
          <div className="absolute inset-y-0 left-1 flex items-center pr-3">
            <SDSpinner />
          </div>
        ) : (
          props.magnifier && (
            <div className="absolute inset-y-0 left-1 flex items-center pr-3">
              <SDButton
                className="font-extrabold !h-8 w-8 bg-white  hover:bg-gray-300"
                onClick={props.onButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 stroke-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </SDButton>
            </div>
          )
        )}
      </div>
    );
  }
);

export default SDTextInput;
