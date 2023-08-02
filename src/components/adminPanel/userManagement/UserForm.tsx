import { useForm } from "react-hook-form";
import {
  UserDatail,
  UserRequest,
  userType,
} from "../../../models/usermanagement.models";
import SDButton from "../../shared/Button";
import UserFormInput from "./UserFormInput";
import { useEffect, useState } from "react";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import UserFormSelect from "./UserFormSelect";
import {
  Regexes,
  nationalCodeValidator,
  phoneInputValidator,
} from "../../../utils/shared";
import ResetUserPasswordModal from "./ResetUserPasswordModal";

interface UserFormProps {
  userDetail?: UserDatail;
  onSubmit: (data: UserRequest, afterSubmit: () => void) => void;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    control,
    reset,
  } = useForm<UserRequest>({
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  const { sendRequest: sendUserTypesRequest, data: userTypes } = useAPi<
    null,
    BaseResponse<userType[]>
  >();

  useEffect(() => {
    function getUserTypes() {
      sendUserTypesRequest({
        url: "/UserTypes",
        params: {
          pageSize: 10000,
          pageIndex: 1,
        },
      });
    }
    getUserTypes();
  }, [props.userDetail, sendUserTypesRequest]);

  useEffect(() => {
    function setFormValue(userDetail: UserDatail) {
      reset({
        address: userDetail.address,
        birthDate: userDetail.birthDate,
        cityAndState: userDetail.cityAndState,
        email: userDetail.email,
        emergencyContact: userDetail.emergencyContact,
        emergencyPhone: userDetail.emergencyPhone,
        firstName: userDetail.firstName,
        height: userDetail.height,
        lastName: userDetail.lastName,
        nationalCode: userDetail.nationalCode,
        phone: userDetail.phone,
        username: userDetail.username,
        userTypeId: userDetail.userTypeId,
        weight: userDetail.weight,
      });
    }

    if (props.userDetail) {
      setFormValue(props.userDetail);
    }
  }, [props.userDetail, userTypes, reset]);

  function openPasswordModal() {
    setShowPasswordModal(true);
  }

  function onSubmit(data: UserRequest) {
    setIsSubmitting(true);
    props.onSubmit(data, () => {
      setIsSubmitting(false);
    });
  }

  return (
    <>
      {props.userDetail && (
        <ResetUserPasswordModal
          userId={props.userDetail.id}
          showModal={showPasswordModal}
          onCloseModal={() => setShowPasswordModal(false)}
        />
      )}
      <form
        className="  text-slate-800 lg:px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap justify-between">
          <div className="flex  w-full md:w-1/2 ">
            <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto md:min-w-max">
              <label htmlFor="firstName" className="mb-6 h-12 leading-[3rem]">
                نام
              </label>
              <label htmlFor="lastName" className="mb-6 h-12 leading-[3rem]">
                نام خانوادگی
              </label>
              <label htmlFor="userTypeId" className="mb-6 h-12 leading-[3rem]">
                نوع حساب کاربری
              </label>
              <label
                htmlFor="nationalCode"
                className="mb-6 h-12 leading-[3rem]"
              >
                کد ملی
              </label>
              <label htmlFor="birthDate" className="mb-6 h-12 leading-[3rem]">
                تاریخ تولد
              </label>
              <label htmlFor="cityId" className="mb-6 h-12 leading-[3rem]">
                محل اقامت
              </label>
              <label htmlFor="address" className="mb-6 h-12 leading-[3rem]">
                آدرس
              </label>
            </div>
            <div className=" flex flex-col w-1/2 text-center md:text-right">
              <UserFormInput
                register={register}
                name="firstName"
                errors={formErrors}
                options={{
                  pattern: {
                    value: Regexes.persianName,
                    message: "نام باید فارسی باشد.",
                  },
                }}
              />
              <UserFormInput
                register={register}
                name="lastName"
                errors={formErrors}
                options={{
                  pattern: {
                    value: Regexes.persianName,
                    message: "نام خانوادگی باید فارسی باشد.",
                  },
                }}
              />
              <UserFormSelect
                name="userTypeId"
                register={register}
                errors={formErrors}
                options={{ required: "فیلد الزامی است." }}
              >
                <option value=""></option>;
                {userTypes?.content &&
                  userTypes.content.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.title}
                      </option>
                    );
                  })}
              </UserFormSelect>
              <UserFormInput
                {...nationalCodeValidator}
                register={register}
                name="nationalCode"
                options={{
                  required: "فیلد الزامی است.",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "کد ملی باید 10 رقم باشد.",
                  },
                }}
                errors={formErrors}
              />
              <UserFormInput
                control={control}
                name="birthDate"
                options={{
                  required: "فیلد الزامی است.",
                }}
                errors={formErrors}
                type="date"
                required={true}
              />

              <UserFormInput
                name="cityAndState"
                register={register}
                errors={formErrors}
                options={{}}
              ></UserFormInput>
              <UserFormInput
                register={register}
                name="address"
                errors={formErrors}
                options={{}}
              />
            </div>
          </div>
          <div className="flex  w-full md:w-1/2 justify-end">
            <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto  md:min-w-max">
              <label htmlFor="userCode" className="mb-6 h-12 leading-[3rem]">
                کد کابر
              </label>
              <label htmlFor="username" className="mb-6 h-12 leading-[3rem]">
                نام کاربری
              </label>
              <label htmlFor="password" className="mb-6 h-12 leading-[3rem]">
                رمز عبور
              </label>
              <label htmlFor="email" className="mb-6 h-12 leading-[3rem]">
                ایمیل
              </label>
              <label htmlFor="phone" className="mb-6 h-12 leading-[3rem]">
                شماره موبایل
              </label>
              <label htmlFor="height" className="mb-6 h-12 leading-[3rem]">
                قد
              </label>
              <label htmlFor="weight" className="mb-6 h-12 leading-[3rem]">
                وزن
              </label>
            </div>
            <div className=" flex flex-col w-1/2 text-center md:text-right">
              <UserFormInput
                name="userCode"
                //   register={register}
                disabled={true}
                errors={formErrors}
                ltr={true}
                defaultValue={props.userDetail?.userCode || ""}
              />
              <UserFormInput
                register={register}
                name="username"
                ltr={true}
                options={{
                  required: "فیلد الزامی است.",
                  pattern: {
                    value: Regexes.username,
                    message:
                      "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
                  },
                  minLength: {
                    value: 5,
                    message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
                  },
                }}
                errors={formErrors}
              />
              {props.userDetail ? (
                <div className="mb-6 h-12 flex flex-col justify-center">
                  <SDButton
                    className="w-12 h-12"
                    color="light"
                    onClick={openPasswordModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-2 stroke-slate-800"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </SDButton>
                </div>
              ) : (
                <UserFormInput
                  register={register}
                  name="password"
                  errors={formErrors}
                  options={{
                    required: "فیلد الزامی است.",
                    pattern: {
                      value: Regexes.password,
                      message:
                        "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
                    },
                  }}
                  type="password"
                />
              )}
              <UserFormInput
                register={register}
                name="email"
                type="email"
                errors={formErrors}
                ltr={true}
                options={{
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "مقدار وارد شده صحیح نیست.",
                  },
                }}
              />
              <UserFormInput
                register={register}
                name="phone"
                errors={formErrors}
                maxLength={14}
                {...phoneInputValidator}
                ltr={true}
                options={{
                  required: "فیلد اجباری است.",
                  pattern: {
                    value: Regexes.mobile,
                    message: "شماره موبایل صحیح نیست.",
                  },
                }}
              />
              <UserFormInput
                register={register}
                name="height"
                numeric={true}
                errors={formErrors}
                options={{}}
                ltr={true}
              />
              <UserFormInput
                register={register}
                name="weight"
                numeric={true}
                errors={formErrors}
                options={{}}
                ltr={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h6 className="font-bold text-lg">اطلاعات تماس اضطراری</h6>
          <div className="pt-5 flex flex-wrap justify-between">
            <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
              <label className="font-semibold ml-12 h-12 leading-[3rem]  w-2">
                نام
              </label>
              <UserFormInput
                register={register}
                name="emergencyContact"
                errors={formErrors}
                options={{
                  pattern: {
                    value: Regexes.persianName,
                    message: "نام باید فارسی باشد.",
                  },
                }}
              />
            </div>
            <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
              <label className="font-semibold ml-12 h-12 leading-[3rem]  w-2">
                موبایل
              </label>
              <UserFormInput
                register={register}
                name="emergencyPhone"
                errors={formErrors}
                maxLength={14}
                {...phoneInputValidator}
                options={{
                  pattern: {
                    value: Regexes.mobile,
                    message: "شماره موبایل صحیح نیست.",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="my-3 flex">
          <SDButton type="submit" className="mr-auto" disabled={isSubmitting}>
            ذخیره
          </SDButton>
        </div>
      </form>
    </>
  );
};

export default UserForm;
