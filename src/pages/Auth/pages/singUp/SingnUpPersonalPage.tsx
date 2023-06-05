import { useForm, Controller } from "react-hook-form";
import SDLabel from "../../../../components/shared/Label";
import SDTextInput from "../../../../components/shared/TextInput";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import SDButton from "../../../../components/shared/Button";
import SDDatepicker from "../../../../components/shared/DatePciker";
interface PersonaFormData {
  nationalId: string;
  firstName: string;
  lastName: string;
  birthDate: Value;
}
const SingUpPersonaPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<PersonaFormData>({
    mode: "onTouched",
  });

  function onSubmit(data: PersonaFormData) {
    console.log(data);
  }

  const [test, setTest] = useState<Value>("1402/03/03");

  function onTest(value: DateObject) {
    value.locale = persian_en;
    console.log(value.format("YYYY/MM/DD"));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">ایجاد حساب کاربری</h1>
        <p className="text-slate-400">
          برای تکمیل ثبت نام اطلاعات خود را کامل کنید.
        </p>
      </div>
      <div>
        <div className="mb-4">
          <SDLabel htmlFor="nationalId">کد ملی</SDLabel>
          <SDTextInput
            {...register("nationalId", {
              required: "فیلد الزامی است.",
              pattern: {
                value: /\d*/,
                message: "کد ملی باید شامل ارقام باشد.",
              },
              maxLength: {
                value: 10,
                message: "کد ملی باید 10 رقم باشد.",
              },
              minLength: {
                value: 10,
                message: "کد ملی باید 10 رقم باشد.",
              },
            })}
            type="text"
            id="nationalId"
            invalid={!!errors.nationalId}
          />
          {errors.nationalId?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.nationalId.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <SDLabel htmlFor="firstName">نام</SDLabel>
          <SDTextInput
            {...register("firstName", {
              required: "فیلد الزامی است.",
            })}
            type="text"
            id="firstName"
            invalid={!!errors.firstName}
          />
          {errors.firstName?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <SDLabel htmlFor="lastName">نام خانوادگی</SDLabel>
          <SDTextInput
            {...register("lastName", {
              required: "فیلد الزامی است.",
            })}
            type="text"
            id="lastName"
            invalid={!!errors.lastName}
          />
          {errors.lastName?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <SDLabel htmlFor="birthDate">تاریخ تولد</SDLabel>
          <SDDatepicker
            name="birthDate"
            control={control}
            required={true}
            id="birthDate"
          ></SDDatepicker>

          {errors.birthDate && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div>
          <SDButton type="submit" color="success" className="w-full">
            مرحله بعد
          </SDButton>
        </div>
      </div>
    </form>
  );
};

export default SingUpPersonaPage;
