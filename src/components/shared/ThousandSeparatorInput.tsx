import React, { ChangeEvent, useState } from "react";
import {
  UseFormRegister,
  RegisterOptions,
  Control,
  Controller,
} from "react-hook-form";
import SDTextInput, { SDTextInputProps } from "./TextInput";

interface ThousandSeparatorInputProps
  extends Omit<SDTextInputProps, "onChange"> {
  name: string;
  control?: Control<any>;
  onChange?: (value: number | "") => void;
}

const ThousandSeparatorInput: React.FC<ThousandSeparatorInputProps> = ({
  control,
  value,
  allowMinus,
  name,
  onChange,
  ...otherProps
}) => {
  const [innerValue, setInnerValue] = useState<string>(
    value?.toLocaleString() || ""
  );

  const convertValue = (value: string, allowMinus = false) => {
    let newValue = value.replace(/[^\d-]/g, "");

    if (!allowMinus) {
      newValue = newValue.replace(/^-/g, "");
    }

    return newValue;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = convertValue(e.target.value, allowMinus);

    const numericValue = parseFloat(newValue);
    if (newValue === "-" || newValue === "") {
      onChange && onChange("");
      setInnerValue(newValue);
      return;
    }
    if (isNaN(numericValue)) {
      onChange && onChange("");
      setInnerValue("");
    }
    onChange && onChange(numericValue);
    const formattedValue = numericValue.toLocaleString();
    setInnerValue(formattedValue);

    // register(name).onChange({ target: { value: e.target.value } });
  };

  const shardAttrs: Partial<ThousandSeparatorInputProps> = {
    ...otherProps,
    numeric: true,
    name: name,
    allowMinus: allowMinus,
    className: `ltr ${otherProps.className || ""}`,
  };

  return control ? (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => {
          console.log("wwwww", value);
          return value !== "-";
        },
      }}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { isTouched }, //optional
        formState: { errors }, //optional, but necessary if you want to show an error message
      }) => {
        console.log(errors);
        return (
          <>
            <SDTextInput
              {...shardAttrs}
              value={value?.toLocaleString() || ""}
              onBlur={onBlur}
              onChange={(event) => {
                const newValue = convertValue(event.target.value, allowMinus);
                if (newValue === "" || newValue === "-") {
                  onChange(newValue);
                  return;
                }
                const numeric = +newValue;
                onChange(isNaN(numeric) ? "" : numeric);
              }}
              invalid={!!errors[name] && isTouched}
            />
          </>
        );
      }}
    />
  ) : (
    <SDTextInput
      {...shardAttrs}
      value={innerValue}
      onChange={handleInputChange}
    />
  );
};

export default ThousandSeparatorInput;
