import { useForm } from "react-hook-form";
import SDButton from "../shared/Button";
import SDDatepicker from "../shared/DatePicker";
import SDLabel from "../shared/Label";
import LabeledFileInput from "../shared/LabeledFileInput";
import SDModal from "../shared/Modal";
import RadioButton from "../shared/RadioButton";
import SDTextInput from "../shared/TextInput";
import { useEffect, useState } from "react";
import { NewEvent, SkyDiveEvent } from "../../models/skyDiveEvents.models";
import { AdminEventModalProps } from "../../models/skyDiveEvents.models";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import SDSpinner from "../shared/Spinner";
import { toast } from "react-toastify";
import SDSelect from "../shared/Select";

const AdminEventModal: React.FC<AdminEventModalProps> = ({
  eventStatusData,
  lastCode,
  showModal,
  onCloseModal,
  eventData,
}) => {
  const { sendRequest, isPending } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors: formErrors },
    reset
  } = useForm<NewEvent>({
    mode: "onTouched",
  });
  const [selectedCancelOption, setSelectedCancelOption] = useState(false);
  const [selectedVATOption, setSelectedVATOption] = useState(false);

  useEffect(() => {
    if (eventData) {
      setValue("title", eventData.title);
      setValue("location", eventData.location);
      setValue("startDate", eventData.startDate);
      setValue("endDate", eventData.endDate);
      setValue("statusId", eventData.statusId);
      setSelectedCancelOption(eventData.voidable === true);
      setSelectedVATOption(eventData.subjecToVAT === true);
    }
  }, [eventData, setValue]);

  const CancelOptions = [
    { value: "cancel-active", label: "فعال" },
    { value: "cancel-inactive", label: "غیر فعال" },
  ];
  const VATOptions = [
    { value: "vat-active", label: "فعال" },
    { value: "vat-inactive", label: "غیر فعال" },
  ];

  const handleCancelOptionChange = (value: string) => {
    setSelectedCancelOption(value === "cancel-active");
  };

  const handleVATOptionChange = (value: string) => {
    setSelectedVATOption(value === "vat-active");
  };
  const handleSaveButton = (data: NewEvent) => {
    console.log(data);
    data.subjecToVAT = selectedVATOption;
    data.voidable = selectedCancelOption;

    if (eventData) {
      sendRequest(
        {
          url: `/SkyDiveEvents/${eventData.id}`,
          method: "put",
          data: data,
        },
        (response) => {
          console.log("Response:", response);
          toast.success(response.message);
          resetModal(true);
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    } else {
      sendRequest(
        {
          url: "/SkyDiveEvents",
          method: "post",
          data: data,
        },
        (response) => {
          toast.success(response.message);
          resetModal(true);
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  };

  function resetModal(submitted: boolean){
    reset();
    onCloseModal(submitted);
  }

  return (
    <div>
      <SDModal show={showModal} onClose={()=>resetModal(false)} containerClass="!p-0">
        <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
          {!eventData && <span>ثبت رویداد جدید</span>}
          {eventData && <span>ویرایش رویداد</span>}
          <button type="button" onClick={()=>resetModal(false)}>
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
          onSubmit={handleSubmit(handleSaveButton)}
          className="max-h-[80vh] overflow-auto"
        >
          <div className="px-6 py-8">
            <div className="flex flex-row mb-6 w-full mt-5">
              <div className="flex flex-col">
                <SDLabel className="mb-2">کد</SDLabel>
                <SDTextInput
                  type="text"
                  id="eventCode"
                  defaultValue={lastCode}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col mr-4 w-full">
                <SDLabel className="mb-2">عنوان رویداد </SDLabel>
                <SDTextInput
                  type="text"
                  id="title"
                  invalid={!!formErrors.title}
                  {...register("title", { required: "فیلد اجباری است." })}
                />
                {formErrors.title?.message && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {formErrors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-6 w-full mt-5">
              <SDLabel>محل رویداد</SDLabel>
              <SDTextInput
                type="text"
                id="location"
                {...register("location", { required: "فیلد اجباری است." })}
                invalid={!!formErrors.location}
              />
              {formErrors.location?.message && (
                <p className="text-red-600 text-sm pr-2 mt-2">
                  {formErrors.location.message}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <div>
                <SDLabel>تاریخ شروع</SDLabel>
              </div>
              <div className="mr-5">
                <SDDatepicker
                  inputClass=" !xs:w-40 text-center !bg-white "
                  name="startDate"
                  required={true}
                  control={control}
                ></SDDatepicker>
                {formErrors.startDate?.message && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {formErrors.startDate.message}
                  </p>
                )}
              </div>
              <div className="mr-5">
                <SDLabel>تاریخ پایان</SDLabel>
              </div>
              <div className="mr-5">
                <SDDatepicker
                  inputClass=" !xs:w-40 text-center !bg-white "
                  name="endDate"
                  required={true}
                  control={control}
                ></SDDatepicker>
                {formErrors.endDate?.message && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {formErrors.endDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-1/2">
                <div>
                  <SDLabel>وضعیت</SDLabel>
                </div>
                <div className="mt-2">
                  <SDSelect
                    id="eventStatus"
                    invalid={!!formErrors.statusId}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("statusId")}
                  >
                    <option value="">انتخاب کنید</option>
                    {eventStatusData &&
                      eventStatusData.map((status, index) => (
                        <option
                          key={index}
                          value={status.id}
                          className="text-right"
                        >
                          {status.title}
                        </option>
                      ))}
                  </SDSelect>
                  {formErrors.statusId?.message && (
                    <p className="text-red-600 text-sm pr-2 mt-2">
                      {formErrors.statusId.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2 items-center mr-4">
                <div>
                  <SDLabel className="mb-5">قابلیت لغو</SDLabel>
                </div>
                <div>
                  <RadioButton
                    groupName="voidable"
                    options={CancelOptions}
                    selectedOption={
                      selectedCancelOption ? "cancel-active" : "cancel-inactive"
                    }
                    onOptionChange={handleCancelOptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-1/2">
                <div>
                  <SDLabel>تصویر</SDLabel>
                </div>
                <div className="mt-5">
                  <LabeledFileInput
                    accepFiles="application/pdf,image/*"
                    onUpload={() => {
                      return;
                    }}
                    title=""
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2 items-center mr-4">
                <div>
                  <SDLabel className="mb-5">ارزش افزوده</SDLabel>
                </div>
                <div>
                  <RadioButton
                    groupName="subjecToVAT"
                    options={VATOptions}
                    selectedOption={
                      selectedVATOption ? "vat-active" : "vat-inactive"
                    }
                    onOptionChange={handleVATOptionChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-5 py-8 flex justify-start items-center">
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
    </div>
  );
};

export default AdminEventModal;
