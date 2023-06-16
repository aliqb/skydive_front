import { useRef } from "react";
import SDLabel from "../../../../components/shared/Label";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../../components/shared/PasswordInput";
import SDButton from "../../../../components/shared/Button";
import useAPi from "../../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import SDSpinner from "../../../../components/shared/Spinner";
import SDAlert from "../../../../components/shared/Alert";
interface ChangePasswordFormData {
  password: string;
  repeatPassword: string;
}
const ChangePasswordPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ChangePasswordFormData>({ mode: "onTouched" });

  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<{ password: string }>();
  const navigate = useNavigate();

  const passwordRef = useRef<string | undefined>();
  passwordRef.current = watch("password", "");

  function onSubmit(data: ChangePasswordFormData) {
    sendRequest(
      {
        url: "/Users/ResetPassword",
        method: "put",
        data: { password: data.password },
      },
      () => {
        navigate("/");
      }
    );
  }

  return (
    <section className="w-full">
      <form className="p-8 pt-4" onSubmit={handleSubmit(onSubmit)}>
        {apiErrors && (
          <SDAlert color="red" className="my-3">
            {apiErrors.message}
          </SDAlert>
        )}
        <div>
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
        <div className="mt-6">
          <SDLabel htmlFor="repeatPassword">
            رمز عبور مورد نظر خود را مجدد وارد کنید.
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
        <SDButton
          className="mt-4 w-full"
          color="primary"
          type="submit"
          disabled={isPending}
        >
          {isPending && <SDSpinner />}
          تغییر رمزعبور
        </SDButton>
      </form>
    </section>
  );
};
export default ChangePasswordPage;
