/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UseFormReturn } from "react-hook-form";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
import useAPi from "../../../hooks/useApi";
import { BaseResponse, UserPersonalInfo } from "../../../models/shared.models";
import { useEffect } from "react";
import { PersonalInfoEditableFormData } from "../../../models/account.models";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { accoutnActions } from "../../../store/account";
import { phoneInputValidator } from "../../../utils";

interface PersonalInfoProps {
  onSubmit: () => void;
  formHook: UseFormReturn<PersonalInfoEditableFormData>;
  disableAll: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
    setValue,
  } = props.formHook;

  const { sendRequest: getInfo, data: personalInfo } = useAPi<
    null,
    BaseResponse<UserPersonalInfo>
  >();

  const dispatch = useAppDispatch();

  useEffect(() => {
    getInfo(
      {
        url: "/Users/GetPersonalInformation",
      },
      (response) => {
        // setFormValue(response.content);
        dispatch(accoutnActions.setPersonalInfo(response.content));
      }
    );
  }, [getInfo, dispatch]);

  useEffect(() => {
    function setFormValue(info: UserPersonalInfo) {
      // reset({
      //   address: info.address,
      //   cityAndState: info.cityAndState || "",
      //   email: info.email,
      //   emergencyContact: info.emergencyContact,
      //   emergencyPhone: info.emergencyPhone,
      //   height: info.height,
      //   weight: info.weight,
      // });
      setValue("address", info.address || "");
      setValue("cityAndState", info.cityAndState || "");
      setValue("email", info.email || "");
      setValue("emergencyContact", info.emergencyContact || "");
      setValue("emergencyPhone", info.emergencyPhone || "");
      setValue("height", info.height || null);
      setValue("weight", info.weight || null);

      trigger();
    }

    if (personalInfo?.content) {
      setFormValue(personalInfo.content);
    }
  }, [personalInfo, trigger, setValue]);

  function onSubmit(data: PersonalInfoEditableFormData) {
    const info: UserPersonalInfo = {
      ...personalInfo!.content,
      ...data,
    };
    dispatch(accoutnActions.setPersonalInfo(info));
    props.onSubmit();
  }

  return (
    <div className="flex pt-4">
      <form
        className="flex flex-wrap justify-end max-w-xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2">
            <SDLabel htmlFor="nationalCode">کد ملی</SDLabel>
            <SDTextInput
              type="text"
              id="nationalCode"
              disabled={true}
              defaultValue={personalInfo?.content.nationalCode}
            />
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="birthDate">تاریخ تولد</SDLabel>
            <SDTextInput
              disabled={true}
              type="text"
              id="birthDate"
              defaultValue={personalInfo?.content.birthDate}
            />
          </div>
        </div>
        <div className="mb-6 w-full flex gap-3">
          <div className="w-1/3">
            <SDLabel htmlFor="firstName">نام</SDLabel>
            <SDTextInput
              type="text"
              id="firstName"
              disabled={true}
              defaultValue={personalInfo?.content.firstName}
            />
          </div>
          <div className="w-2/3">
            <SDLabel htmlFor="lastName">نام خانوادگی</SDLabel>
            <SDTextInput
              disabled={true}
              type="text"
              id="lastName"
              defaultValue={personalInfo?.content.lastName}
            />
          </div>
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="email">
            ایمیل
            {errors.email?.message && <span className="text-red-600">*</span>}
          </SDLabel>
          <SDTextInput
            {...register("email", {
              required: "فیلد اجباری است.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "مقدار وارد شده صحیح نیست.",
              },
            })}
            type="email"
            id="email"
            className="ltr"
            disabled={props.disableAll}
            invalid={!!errors.email && touchedFields.email}
          />
          {errors.email?.message && touchedFields.email && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="cityId">
            استان و شهر اقامت
            {errors.cityAndState?.message && (
              <span className="text-red-600">*</span>
            )}
          </SDLabel>
          <SDTextInput
            id="cityId"
            {...register("cityAndState", { required: "فیلد اجباری است." })}
            invalid={!!errors.cityAndState && touchedFields.cityAndState}
            disabled={props.disableAll}
          ></SDTextInput>
          {errors.cityAndState?.message && touchedFields.cityAndState && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.cityAndState.message}
            </p>
          )}
        </div>
        <div className=" w-full mb-6">
          <SDLabel htmlFor="address">
            نشانی
            {errors.address?.message && <span className="text-red-600">*</span>}
          </SDLabel>
          <SDTextInput
            {...register("address", { required: "فیلد اجباری است." })}
            type="address"
            id="address"
            disabled={props.disableAll}
            invalid={!!errors.address && touchedFields.address}
          />
          {errors.address?.message && touchedFields.address && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2 ">
            <SDLabel htmlFor="height">
              قد (سانتی متر)
              {errors.height?.message && (
                <span className="text-red-600">*</span>
              )}
            </SDLabel>
            <SDTextInput
              {...register("height", {
                valueAsNumber: true,
                required: "فیلد اجباری است.",
              })}
              type="number"
              id="height"
              className="ltr"
              disabled={props.disableAll}
              invalid={!!errors.height && touchedFields.height}
            />
            {errors.height?.message && touchedFields.height && (
              <p className="text-red-600 text-sm pr-2 mt-2">
                {errors.height.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="weight">
              وزن (کیلوگرم)
              {errors.weight?.message && (
                <span className="text-red-600">*</span>
              )}
            </SDLabel>
            <SDTextInput
              {...register("weight", {
                valueAsNumber: true,
                required: "فیلد اجباری است.",
              })}
              type="number"
              id="weight"
              disabled={props.disableAll}
              invalid={!!errors.weight && touchedFields.weight}
              className="ltr"
            />
            {errors.weight?.message && touchedFields.weight && (
              <p className="text-red-600 text-sm pr-2 mt-2">
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="text-slate-700 mb-4">اطلاعات تماس اضطراری</p>
          <div className="mb-6 w-full flex gap-6">
            <div className="w-1/2 ">
              <SDLabel htmlFor="emergencyContact">
                نام
                {errors.emergencyContact?.message && (
                  <span className="text-red-600">*</span>
                )}
              </SDLabel>
              <SDTextInput
                {...register("emergencyContact", {
                  required: "فیلد اجباری است.",
                })}
                type="text"
                disabled={props.disableAll}
                id="emergencyContact"
                invalid={
                  !!errors.emergencyContact && touchedFields.emergencyContact
                }
              />
              {errors.emergencyContact?.message &&
                touchedFields.emergencyContact && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {errors.emergencyContact.message}
                  </p>
                )}
            </div>
            <div className="w-1/2">
              <SDLabel htmlFor="emergencyPhone">
                موبایل
                {errors.emergencyPhone?.message && (
                  <span className="text-red-600">*</span>
                )}
              </SDLabel>
              <SDTextInput
                {...register("emergencyPhone", {
                  pattern: {
                    value: /(\+98|0|0098)9\d{9}$/,
                    message: "شماره موبایل صحیح نیست.",
                  },

                  required: "فیلد اجباری است.",
                })}
                type="text"
                disabled={props.disableAll}
                maxLength={14}
                {...phoneInputValidator}
                id="emergencyPhone"
                className="ltr"
                invalid={
                  !!errors.emergencyPhone && touchedFields.emergencyPhone
                }
              />
              {errors.emergencyPhone?.message &&
                touchedFields.emergencyPhone && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {errors.emergencyPhone.message}
                  </p>
                )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <SDButton className="w-full md:w-1/2" color="primary" type="submit">
            مرحله بعد
          </SDButton>
        </div>
      </form>
    </div>
  );
};
export default PersonalInfo;
