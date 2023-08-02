import { useFieldArray, useForm } from "react-hook-form";
import useAPi from "../../../hooks/useApi";
import {
  BaseResponse,
  UserStatusesPersianMap,
} from "../../../models/shared.models";
import { useEffect } from "react";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
import SDButton from "../../shared/Button";
import { toast } from "react-toastify";
import SDSpinner from "../../shared/Spinner";
import { GeneralSettings } from "../../../models/settings.models";
import { useAppSelector } from "../../../hooks/reduxHooks";

const GeneralSettingsComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm<GeneralSettings>({
    mode: "onTouched",
  });
  const { fields } = useFieldArray({
    control,
    name: "userStatusInfo",
  });

  const generalSettingsState = useAppSelector((state) => state.generalSettings);

  const { sendRequest: saveSettingsRequest, isPending: isSaving } = useAPi<
    GeneralSettings,
    BaseResponse<null>
  >();

  useEffect(() => {
    if (generalSettingsState.generalSettings) {
      reset({
        termsAndConditionsUrl:
          generalSettingsState.generalSettings.termsAndConditionsUrl,
        userStatusInfo: generalSettingsState.generalSettings.userStatusInfo,
        registrationTermsAndConditionsUrl:
          generalSettingsState.generalSettings
            .registrationTermsAndConditionsUrl,
        fileSizeLimitaion:
          generalSettingsState.generalSettings.fileSizeLimitaion,
        jumpDuration: generalSettingsState.generalSettings.jumpDuration,
      });
    }
  }, [generalSettingsState, reset]);

  function onSubmit(data: GeneralSettings) {
    saveSettingsRequest(
      {
        url: "/settings",
        method: "put",
        data: data,
      },
      (response) => {
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <SDLabel htmlFor="termsAndConditionsUrl">
          لینک شرایط و قوانین اصلی:
        </SDLabel>
        <SDTextInput
          className="ltr"
          disabled={generalSettingsState.loading}
          id="termsAndConditionsUrl"
          {...register("termsAndConditionsUrl", {
            required: "این فیلد اجباری است.",
          })}
        />
        {formErrors.termsAndConditionsUrl?.message && (
          <p className="text-red-600 text-xs pr-2 mt-2">
            {formErrors.termsAndConditionsUrl.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <SDLabel htmlFor="registrationTermsAndConditionsUrl">
          لینک شرایط و قوانین ثبت نام:
        </SDLabel>
        <SDTextInput
          className="ltr"
          disabled={generalSettingsState.loading}
          id="registrationTermsAndConditionsUrl"
          {...register("registrationTermsAndConditionsUrl", {
            required: "این فیلد اجباری است.",
          })}
        />
        {formErrors.registrationTermsAndConditionsUrl?.message && (
          <p className="text-red-600 text-xs pr-2 mt-2">
            {formErrors.registrationTermsAndConditionsUrl.message}
          </p>
        )}
      </div>
      <div className="mb-6 flex gap-6">
        <div className="w-full">
          <SDLabel htmlFor="fileSizeLimitaion">حداکثر حجم آپلود (KB):</SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            disabled={generalSettingsState.loading}
            id="fileSizeLimitaion"
            {...register("fileSizeLimitaion", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="w-full">
          <SDLabel htmlFor="termsAndConditionsUrl">اعتبار سابقه پرش (روز):</SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            disabled={generalSettingsState.loading}
            id="jumpDuration"
            {...register("jumpDuration", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className="mt-10">
        <h6 className="text-slate-700 font-semibold text-lg mb-4">
          توضیحات وضعیت‌ها
        </h6>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="mb-6">
              <SDLabel htmlFor={field.status}>
                {UserStatusesPersianMap.get(field.status)}
              </SDLabel>
              <SDTextInput
                id={field.status}
                disabled={generalSettingsState.loading}
                {...register(`userStatusInfo.${index}.description` as const, {
                  required: "این فیلد اجباری است.",
                })}
              />
              {formErrors?.userStatusInfo?.[index]?.description && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors?.userStatusInfo?.[index]?.description?.message}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <SDButton
          className="w-full max-w-sm !bg-blue-900"
          disabled={generalSettingsState.loading || isSaving}
          type="submit"
        >
          {isSaving && <SDSpinner />}
          ذخیره
        </SDButton>
      </div>
    </form>
  );
};

export default GeneralSettingsComponent;
