import { useForm } from "react-hook-form";
import SDButton from "../../shared/Button";
import SDModal from "../../shared/Modal";
import SDLabel from "../../shared/Label";
import PasswordInput from "../../shared/PasswordInput";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
import SDSpinner from "../../shared/Spinner";
import { Regexes } from "../../../utils/shared";

interface ResetUserPasswordModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  userId: string;
}

const ResetUserPasswordModal: React.FC<ResetUserPasswordModalProps> = ({
  showModal,
  onCloseModal,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<{ password: string }>({
    mode: "onTouched",
  });

  const { sendRequest, isPending } = useAPi<
    { password: string },
    BaseResponse<null>
  >();

  const resetModal = () => {
    reset();
    onCloseModal();
  };

  function onSubmit(data: { password: string }) {
    sendRequest(
      {
        url: `/Admin/UpdateUserPassword/${userId}`,
        method: "put",
        data: data,
      },
      (response) => {
        toast.success(response.message);
        resetModal();
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  return (
    <SDModal
      show={showModal}
      onClose={() => resetModal()}
      containerClass="!p-0 border-none !w-[480px]"
    >
      <div className="border-b  text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
        <span>ویرایش بهای فروش</span>
        <button type="button" onClick={() => resetModal()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form
        className="max-h-[80vh] overflow-auto px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-6 py-8">
          <SDLabel>رمز عبور:</SDLabel>
          <PasswordInput
            {...register("password", {
              required: "فیلد اجباری است.",
              pattern: {
                value: Regexes.password,
                message:
                  "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
              },
            })}
          />
          {formErrors.password?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.password.message}
            </p>
          )}
        </div>
        <div className="w-full px-5 pb-6 flex justify-start items-center">
          <SDButton
            color="primary"
            type="submit"
            className="w-full !bg-blue-900"
            disabled={isPending}
          >
            {isPending && <SDSpinner />}
            ذخیره
          </SDButton>
        </div>
      </form>
    </SDModal>
  );
};

export default ResetUserPasswordModal;
