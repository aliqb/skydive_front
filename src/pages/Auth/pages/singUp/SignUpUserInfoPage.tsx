import { useForm } from "react-hook-form";
import SDLabel from "../../../../components/shared/Label";
import SDTextInput from "../../../../components/shared/TextInput";
import SDButton from "../../../../components/shared/Button";
import PasswordInput from "../../../../components/shared/PasswordInput";
import { useRef } from "react";
import useAPi from "../../../../hooks/useApi";
import { UserSecurityInformation } from "../../../../models/auth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import SDAlert from "../../../../components/shared/Alert";
import SDSpinner from "../../../../components/shared/Spinner";
interface UserInfoFormData {
  username: string;
  password: string;
  repeatPassword: string;
}
const SingUpUserInfoPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<UserInfoFormData>({
    mode: "onTouched",
  });

  const userId = useAppSelector((state) => state.auth.userId);

  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<UserSecurityInformation>();

  const navigate = useNavigate();

  const passwordRef = useRef<string | undefined>();
  passwordRef.current = watch("password", "");

  function onSubmit(data: UserInfoFormData) {
    sendRequest(
      {
        url: "/Users/UserSecurityInformationCompletion",
        method: "post",
        data: {
          id: userId,
          username: data.username,
          password: data.password,
        },
      },
      () => navigate("/")
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">اطلاعات کاربری</h1>
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
        <div className="mb-6">
          <SDLabel htmlFor="nationalId">نام کاربری</SDLabel>
          <SDTextInput
            {...register("username", {
              required: "فیلد الزامی است.",
              pattern: {
                value: /^[\da-zA-z]*$/,
                message: "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
              },
              maxLength: {
                value: 10,
                message: "کد ملی باید 10 رقم باشد.",
              },
              minLength: {
                value: 5,
                message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
              },
            })}
            type="text"
            id="nationalId"
            invalid={!!errors.username}
          />
          {errors.username?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <SDLabel htmlFor="password">
            رمز عبور مورد نظر خود را وارد کنید.
          </SDLabel>
          <PasswordInput
            {...register("password", {
              required: "لطفا رمزعبور خود را وارد کنید.",
              pattern: {
                value: /^(?=.*\d)(?=.*[A-Za-z])[\dA-Za-z!@#$%^&*\-()+=]{6,}$/,
                message:
                  "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
              },
            })}
            id="password"
            invalid={!!errors.password}
          />
          {errors.password?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <SDLabel htmlFor="repeatPassword">
            رمز عبور مورد نظر خود را وارد کنید.
          </SDLabel>
          <PasswordInput
            {...register("repeatPassword", {
              required: "لطفا رمزعبور خود را مجدد وارد کنید.",
              validate: (value) =>
                value === passwordRef.current ||
                "تکرار رمز عبور با رمز عبور مطابقت ندارد.",
            })}
            id="repeatPassword"
            invalid={!!errors.repeatPassword}
          />
          {errors.repeatPassword?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
        <div>
          <SDButton type="submit" color="success" className="w-full" disabled={isPending}>
          {isPending &&  <SDSpinner />}
            ثبت اطلاعات
          </SDButton>
        </div>
      </div>
    </form>
  );
};

export default SingUpUserInfoPage;
