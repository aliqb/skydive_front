import { replacePersianArabicsNumbers } from "./shared";

export const phoneInputChangeValidationHandler: React.ChangeEventHandler<
  HTMLInputElement
> = (event) => {
  let value = event.target.value;
  value = replacePersianArabicsNumbers(value)
  value = value.replace(/[^\d+]/g, "");
  event.target.value = value;
};

export const phonePastValidationHandler: React.ClipboardEventHandler<
  HTMLInputElement
> = (event) => {
  const value = event.clipboardData.getData("text");
  const phoneChars = /[\d+]/;
  if (!phoneChars.test(value)) {
    event.preventDefault();
  }
};

export const nationalCodeInputChangeValidationHandler: React.ChangeEventHandler<
  HTMLInputElement
> = (event) => {
  let value = event.target.value;
  value = replacePersianArabicsNumbers(value)
  value = value.replace(/[^\d]/g, "");
  event.target.value = value;
};

export const phoneKeyDownValidationHandler: React.KeyboardEventHandler<
  HTMLInputElement
> = (event) => {
  const noneCharKeys = ["Backspace", "Enter", "Tab", "Contol", "Meta"];
  if (noneCharKeys.includes(event.key) || event.key.startsWith("Arrow")) {
    return;
  }
  if (event.ctrlKey || event.metaKey) {
    return;
  }
  const phoneChars = /[\d+]/;
  if (!phoneChars.test(event.key)) {
    event.preventDefault();
  }
};

export const phoneInputValidator = {
    // onKeyDown: phoneKeyDownValidationHandler,
    // onPaste: phonePastValidationHandler,
    onInput: phoneInputChangeValidationHandler,
  };
  
  
  export const nationalCodeValidator = {
    // onKeyDown: phoneKeyDownValidationHandler,
    // onPaste: phonePastValidationHandler,
    onInput: nationalCodeInputChangeValidationHandler,
  };