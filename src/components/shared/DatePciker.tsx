import { DatePickerProps, CalendarProps } from "react-multi-date-picker";
import { Control, Controller } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import DatePicker, { DateObject } from "react-multi-date-picker";
type DatePickerFinalProps = CalendarProps & DatePickerProps
interface SDDatePcikerProps extends DatePickerFinalProps {
  name: string;
  control?: Control<any>;
  required?: boolean;
  manualInvalid?:boolean
}

const SDDatepicker: React.FC<SDDatePcikerProps> = (props) => {
  const datePickerPropsTemp = { ...props };
  delete datePickerPropsTemp.control;
  delete datePickerPropsTemp.required;
  delete datePickerPropsTemp.onChange
  function formaDateObject(date: DateObject): string {
    if (!date) {
      return "";
    }
    date.locale = persian_en;
    return date.format("YYYY/MM/DD");
  }

  function validateDate(value: string) {
    const message = "تاریخ درست نیست.";
    if (!/\d{4}\/\d{2}\/\d{2}/.test(value)) {
      return message;
    }
    const [year, month, day] = value.split("/").map((part) => +part);
    if (day > 31 || day < 0 || month > 12 || month < 0 || year < 1000) {
      return message;
    }
    if (6 <= month && day > 30) {
      return message;
    }
    return true;
  }
  return props.control ? (
    <Controller
      control={props.control}
      name={props.name}
      rules={
        props.required
          ? { required: "فیلد الزامی است.", validate: validateDate }
          : { validate: validateDate }
      } //optional
      render={({
        field: { onChange, value },
        //   fieldState: { invalid, isDirty }, //optional
        formState: { errors }, //optional, but necessary if you want to show an error message
      }) => (
        <>
          <DatePicker
            name={props.name}
            id={props.id}
            value={value || ""}
            onChange={(date: DateObject) => {
              onChange(formaDateObject(date));
            }}
            //   format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            containerClassName="w-full"
            inputClass={`${
              errors[props.name]
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }  placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
        </>
      )}
    />
  ) : (
    <DatePicker
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      id={props.id}
      //   format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      containerClassName="w-full"
      inputClass={`${
        props.manualInvalid
          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-blue-500"
      }  placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    />
  );
};

export default SDDatepicker;
