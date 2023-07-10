export function sortDate<T>(data: T[], dateField: keyof T): T[] {
  return data.sort((first, second) => {
    const firstArr = (first[dateField] as string).split("/");
    const secondArr = (second[dateField] as string).split("/");
    const yearsDiff = +firstArr[0] - +secondArr[0];
    if (yearsDiff !== 0) {
      return yearsDiff;
    }
    const monthDiff = +firstArr[1] - +secondArr[1];
    if (monthDiff !== 0) {
      return monthDiff;
    }
    return +firstArr[2] - +secondArr[2];
  });
}

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

export const phonePastValidationHandler: React.ClipboardEventHandler<
  HTMLInputElement
> = (event) => {
  const value = event.clipboardData.getData("text");
  const phoneChars = /[\d+]/;
  if (!phoneChars.test(value)) {
    event.preventDefault();
  }
};

export const phoneInputValidator = {
  onKeyDown: phoneKeyDownValidationHandler,
  onPaste: phonePastValidationHandler,
};

export const persianCharRange = [
  "[\u06A9\u06AF\u06C0\u06CC\u060C",
  "\u067E\u0670\u0686\u0698",
  "\u0621-\u063A\u0641-\u0654]",
].join("");
export const Regexes = {
  mobile: /(\+98|0|0098)9\d{9}$/,
  // eslint-disable-next-line no-misleading-character-class
  persianName: /^([\u06A9\u06AF\u06C0\u06CC\u060C\u067E\u0670\u0686\u0698\u0621-\u063A\u0641-\u0654]+[\s\u200C]?)+$/,
  password: /^(?=.*\d)(?=.*[A-Za-z])[\dA-Za-z!@#$%^&*\-()+=]{6,}$/,
  username: /^[\da-zA-z]*$/
};
