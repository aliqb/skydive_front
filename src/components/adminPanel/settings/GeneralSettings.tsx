import { useFieldArray, useForm } from "react-hook-form";
import { GenralSettings } from "../../../models/generalSettings.models";
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

const GeneralSettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm<GenralSettings>({
    mode: "onTouched",
  });
  const { fields } = useFieldArray({
    control,
    name: "userStatusInfo",
  });

  const { sendRequest: getSettingsRequest, isPending: isGetPending } = useAPi<
    null,
    BaseResponse<GenralSettings>
  >();

  const { sendRequest: saveSettingsRequest, isPending: isSaving } = useAPi<
    GenralSettings,
    BaseResponse<null>
  >();

  useEffect(() => {
    getSettingsRequest(
      {
        url: "/settings",
      },
      (response) => {
        const result = response.content;
        reset({
          termsAndConditionsUrl: result.termsAndConditionsUrl,
          userStatusInfo: result.userStatusInfo,
        });
      }
    );
  }, [getSettingsRequest, reset]);

  function onSubmit(data: GenralSettings) {
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
      <div>
        <SDLabel htmlFor="termsAndConditionsUrl">لینک شرایط و قوانین:</SDLabel>
        <SDTextInput
          className="ltr"
          disabled={isGetPending}
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
                disabled={isGetPending}
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
          disabled={isGetPending || isSaving}
          type="submit"
        >
          {isSaving && <SDSpinner />}
          ذخیره
        </SDButton>
      </div>
    </form>
  );
};

export default GeneralSettings;
