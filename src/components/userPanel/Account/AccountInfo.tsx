import { useForm } from "react-hook-form";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
import SDTooltip from "../../shared/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { BaseResponse } from "../../../models/shared.models";
import useConfirm from "../../../hooks/useConfirm";
import useAPi from "../../../hooks/useApi";
import { toast } from "react-toastify";
import { authActions } from "../../../store/auth";
import { useEffect, useState } from "react";
import { OTPRequest, OTPResponse } from "../../../models/auth.models";
import ChangePasswordModal from "./ChangePasswordModal";
import UserStatusLabel from "../../shared/UserStatusLabel";
import { removeAuthDataFromLocal } from "../../../utils/authUtils";

interface AccountInfoFormData {
  username: string;
  password: string;
  phone: string;
}
const AccountInfo: React.FC = () => {
  const {
    // register,
    formState: { errors },
    // handleSubmit,
    // watch,
  } = useForm<AccountInfoFormData>({
    mode: "onTouched",
  });

  const authState = useAppSelector((state) => state.auth);
  const userStatusInfo = useAppSelector(
    (state) => state.generalSettings.generalSettings?.userStatusInfo
  );
  const [statusDescription, setStatusDescription] = useState<string>("");

  const [ConfirmModal, confirmation] = useConfirm(
    "حساب کاربری شما غیر فعال خواهد شد. آیا مطمئن هستید؟ ",
    "غیرفعال کردن حساب کاربری"
  );

  const { sendRequest: sendInactivate } = useAPi<null, BaseResponse<string>>();
  const [startChangePassword, setStartChangePassword] =
    useState<boolean>(false);
  const { sendRequest: sendOtpRequest, isPending: otpPending } = useAPi<
    OTPRequest,
    OTPResponse
  >();

  const dispatch = useAppDispatch();

  async function onInactiveAccount() {
    const confirm = await confirmation();
    if (confirm) {
      sendInactivate(
        {
          url: "/Users/Inactivate",
          method: "put",
        },
        (response) => {
          toast.success(response.message);
          removeAuthDataFromLocal();
          dispatch(authActions.logOut());
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  }

  function onStartChangePassword() {
    sendOtpRequest(
      {
        url: "/Users/OtpRequest",
        method: "post",
        data: { username: authState.mobile },
      },
      () => {
        setStartChangePassword(true);
      },
      (error) => toast.error(error?.message)
    );
  }

  useEffect(() => {
    const statusInfo = userStatusInfo?.find(
      (item) => item.status === authState.userStatus
    );
    setStatusDescription(statusInfo?.description || "");
  }, [userStatusInfo, authState.userStatus]);

  return (
    <div className="flex flex-col items-center">
      <ConfirmModal />
      <ChangePasswordModal
        phone={authState.mobile}
        show={startChangePassword}
        onClose={() => setStartChangePassword(false)}
      />
      <div className="flex flex-col items-center mb-10">
        <div className="flex gap-4 mb-3">
          <p className="text-slate-500">وضعیت حساب کاربری</p>
          <UserStatusLabel
            status={authState.userStatus}
            display={authState.userStatusDisplay}
          />
          <SDTooltip
            content={statusDescription}
            trigger="hover"
            placement="bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </SDTooltip>
        </div>
        <div className="flex gap-4">
          <p className="text-slate-500">نوع حساب کاربری</p>
          <p className="font-semibold">{authState.userType}</p>
        </div>
      </div>
      <form className="flex flex-wrap max-w-2xl">
        <div className="mb-6 w-full sm:w-1/2 sm:pl-12">
          <SDLabel htmlFor="userId">کد کاربری</SDLabel>
          <SDTextInput
            value={authState.code}
            disabled={true}
            type="text"
            id="userId"
            className="ltr"
          />
        </div>
        <div className="mb-6 w-full sm:w-1/2 sm:pl-12">
          <SDLabel htmlFor="username">نام کاربری</SDLabel>
          <SDTextInput
            // {...register("username", {
            //   required: "فیلد الزامی است.",
            //   pattern: {
            //     value: /^[\da-zA-z]*$/,
            //     message: "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
            //   },
            //   maxLength: {
            //     value: 10,
            //     message: "کد ملی باید 10 رقم باشد.",
            //   },
            //   minLength: {
            //     value: 5,
            //     message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
            //   },
            // })}
            type="text"
            id="username"
            disabled={true}
            invalid={!!errors.username}
            value={authState.username}
            className="ltr"
          />
          {errors.username?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6 w-full sm:w-1/2 sm:pl-12">
          <div className="flex justify-between">
            <SDLabel htmlFor="phone">رمز ورود</SDLabel>
            <button
              type="button"
              className="text-green-500 mb-2 font-semibold text-sm pl-2"
              disabled={otpPending}
              onClick={onStartChangePassword}
            >
              ویرایش
            </button>
          </div>
          <SDTextInput
            type="password"
            disabled={true}
            id="phone"
            value="•••••••"
          />
        </div>
        <div className="mb-6 w-full sm:w-1/2 sm:pl-12">
          <div className="flex justify-between">
            <SDLabel htmlFor="phone">موبایل</SDLabel>
            {/* <button
              type="button"
              className="text-green-500 mb-2 font-semibold text-sm pl-2"
            >
              ویرایش
            </button> */}
          </div>
          <SDTextInput
            type="text"
            // {...register("phone", {
            //   required: "لطفا شماره موبایل خود را وارد کنید.",
            //   pattern: {
            //     value: /(\+98|0|0098)9\d{9}$/,
            //     message: "فرمت شماره موبایل صحیح نیست.",
            //   },
            // })}
            disabled={true}
            value={authState.mobile}
            className="ltr"
            id="phone"
          />
          {errors.phone?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="w-full sm:w-1/2 sm:pl-12">
          <button
            type="button"
            className="text-red-600 font-semibold text-sm"
            onClick={onInactiveAccount}
          >
            غیر فعال کردن حساب کاربری
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;
