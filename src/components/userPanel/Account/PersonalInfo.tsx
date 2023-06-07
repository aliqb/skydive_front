import { useForm } from "react-hook-form";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
interface PersonalInfoEditableFormData {
  email: string;
  location: string;
  address: string;
  height: number;
  weight: number;
  emergencyName: string;
  emergencyPhone: string;
}
const PersonalInfo: React.FC = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<PersonalInfoEditableFormData>({
    mode: "onTouched",
  });
  function onSubmit(data:PersonalInfoEditableFormData ){
    console.log(data)
  }
  return (
    <div className="flex pt-4">
      <form className="flex flex-wrap justify-end max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2">
            <SDLabel htmlFor="nationalId">کد ملی</SDLabel>
            <SDTextInput type="text" id="nationalId" disabled={true} />
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="birthDate">تاریخ تولد</SDLabel>
            <SDTextInput disabled={true} type="text" id="birthDate" />
          </div>
        </div>
        <div className="mb-6 w-full flex gap-3">
          <div className="w-1/3">
            <SDLabel htmlFor="firstName">نام</SDLabel>
            <SDTextInput type="text" id="firstName" disabled={true} />
          </div>
          <div className="w-2/3">
            <SDLabel htmlFor="lastName">نام خانوادگی</SDLabel>
            <SDTextInput disabled={true} type="text" id="lastName" />
          </div>
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="email">ایمیل</SDLabel>
          <SDTextInput
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "مقدار وارد شده صحیح نیست.",
              },
            })}
            type="email"
            id="email"
            className="ltr"
            invalid={!!errors.email}
          />
          {errors.email?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="location">استان و شهر اقامت</SDLabel>
          <SDTextInput
            {...register("location")}
            type="location"
            id="location"
          />
        </div>
        <div className=" w-full mb-6">
          <SDLabel htmlFor="address">نشانی</SDLabel>
          <SDTextInput {...register("address")} type="address" id="address" />
        </div>
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2 ">
            <SDLabel htmlFor="firstName">قد (سانتی متر)</SDLabel>
            <SDTextInput
              {...register("height", { valueAsNumber: true })}
              type="number"
              id="firstName"
              className="ltr"
            />
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="lastName">وزن (کیلوگرم)</SDLabel>
            <SDTextInput
              {...register("weight", { valueAsNumber: true })}
              type="number"
              id="lastName"
              className="ltr"
            />
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="text-slate-700 mb-4">اطلاعات تماس اضطراری</p>
          <div className="mb-6 w-full flex gap-6">
            <div className="w-1/2 ">
              <SDLabel htmlFor="firstName">نام</SDLabel>
              <SDTextInput
                {...register("emergencyName")}
                type="number"
                id="firstName"
                className="ltr"
              />
            </div>
            <div className="w-1/2">
              <SDLabel htmlFor="lastName">موبایل</SDLabel>
              <SDTextInput
                {...register("emergencyPhone", {
                  pattern: {
                    value:/(\+98|0|0098)9\d{9}$/,
                    message: 'شماره موبایل صحیح نیست.'
                  },
                })}
                type="number"
                id="lastName"
                className="ltr"
                invalid={!!errors.emergencyPhone}
              />
              {errors.emergencyPhone?.message && (
                <p className="text-red-600 text-sm pr-2 mt-2">
                  {errors.emergencyPhone.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end md:w-1/2 pr-3">
          <SDButton
            className="w-full"
            color="primary"
            type="submit"
            disabled={!isDirty}
          >
            ذخیره
          </SDButton>
        </div>
      </form>
    </div>
  );
};
export default PersonalInfo;
