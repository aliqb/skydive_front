import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import SDAlert from "../../../components/shared/Alert";
import SDButton from "../../../components/shared/Button";
import SDLabel from "../../../components/shared/Label";
import SDSpinner from "../../../components/shared/Spinner";
import SDTextInput from "../../../components/shared/TextInput";
import useAPi from "../../../hooks/useApi";
import { UserPersonalInfo } from "../../../models/shared.models";
import SDDatepicker from "../../../components/shared/DatePicker";



const SingUpPersonaPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<UserPersonalInfo>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UserPersonalInfo>({
    mode: "onTouched",
  });

  function navigateToNextPage() {
    console.log("wa");
    navigate("../user-info");
  }

  function onSubmit(data: UserPersonalInfo) {
    sendRequest(
      {
        url: "/Users/UserPersonalInformationCompletion/true",
        data: data,
        method: "post",
      },
      () => navigateToNextPage()
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">اطلاعات شخصی</h1>
        <p className="text-slate-400">
          برای تکمیل ثبت نام، اطلاعات خود را کامل کنید.
        </p>
      </div>
      {apiErrors && (
        <SDAlert color="red" className="my-2">
          {apiErrors.message}
        </SDAlert>
      )}
      <div>
        <div className="mb-4">
          <SDLabel htmlFor="nationalCode">کد ملی</SDLabel>
          <SDTextInput
            {...register("nationalCode", {
              required: "فیلد الزامی است.",
              pattern: {
                value: /^\d{10}$/,
                message: "کد ملی باید 10 رقم باشد.",
              },
            })}
            type="text"
            id="nationalCode"
            maxLength={10}
            invalid={!!errors.nationalCode}
          />
          {errors.nationalCode?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.nationalCode.message}
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
          <SDButton type="submit" color="success" className="w-full" disabled={isPending}>
            {isPending && <SDSpinner />}
            مرحله بعد
          </SDButton>
        </div>
      </div>
    </form>
  );
};

export default SingUpPersonaPage;
