import { DateObject } from "react-multi-date-picker";
import SDDatepicker from "../../shared/DatePciker";
import SDLabel from "../../shared/Label";
import LabeledFileInput from "../../shared/LabeledFileInput";
import { useState } from "react";

interface DocumentItem {
  title: string;
  status: string; ///
  withDate?: boolean;
  defualtExpireDate?: string;
  onChange(): void;
  validation?: boolean;
}

const DocumentItem: React.FC<DocumentItem> = ({
  title,
  status,
  withDate = false,
  defualtExpireDate = "",
  onChange,
  validation,
}) => {
  const [expireDate, setExpireDate] = useState<string>(defualtExpireDate);
  function onFileChoose(file: File) {
    console.log(file);
  }
  function onDateChange(value: string) {
    setExpireDate(value);
    console.log(value);
  }
  return (
    <div className="flex justify-between mb-10 items-center flex-wrap">
      <div className=" basis-1/3  xs:basis-1/2 md:basis-1/3">
        <p className="text-slate-500 ">{title}</p>
        {withDate && (
          <div className="relative pt-5">
            <SDLabel className="absolute bg-white text-sm top-2 px-1 right-2">
              تاریخ انقضا
            </SDLabel>
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              onChange={onDateChange}
              required={true}
              manualInvalid={validation && !expireDate}
              value={expireDate}
            ></SDDatepicker>
            {validation && !expireDate && (
              <p className="text-red-600 text-sm pr-2 mt-2">
                تاریخ انقضا برای این مدرک الزامی است.
              </p>
            )}
          </div>
        )}
      </div>
      <div>
        <LabeledFileInput
          accepFiles="application/pdf,image/*"
          title={title}
          onChoose={onFileChoose}
        />
      </div>
      <p className="text-green-500 font-semibold">تایید شده</p>
    </div>
  );
};

export default DocumentItem;
