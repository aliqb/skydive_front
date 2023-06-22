import { useForm } from "react-hook-form";
import SDButton from "../shared/Button";
import SDDatepicker from "../shared/DatePicker";
import SDLabel from "../shared/Label";
import LabeledFileInput from "../shared/LabeledFileInput";
import SDModal from "../shared/Modal";
import RadioButton from "../shared/RadioButton";
import SDTextInput from "../shared/TextInput";
import { useState } from "react";
import { NewEvent, SkyDiveEvent } from "../../models/skyDiveEvents.models";
import { AdminNewEventProps } from "../../models/skyDiveEvents.models";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";

const AdminNewEvent: React.FC<AdminNewEventProps> = ({
  eventStatusData,
  lastCode,
  showModal,
  onOpenModal,
  onCloseModal,
}) => {
  const { sendRequest, errors, isPending } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();
  const { register, handleSubmit, control } = useForm<NewEvent>();
  //   const [showingModal, setShowingModal] = useState(false);

  //   const closeModal = () => {
  //     setShowingModal(false);
  //   };
  //   function resetModal() {
  //     setShowingModal(false);
  //   }

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
  const handleSaveButton = handleSubmit((data) => {
    console.log(data);
    data.subjecToVAT = selectedVATOption;
    data.voidable = selectedCancelOption;

    sendRequest(
      {
        url: "/SkyDiveEvents",
        method: "post",
        data: data,
      },
      (response) => {
        console.log("Response:", response);
      }
    );
  });

  const [selectedCancelOption, setSelectedCancelOption] = useState(false);
  const [selectedVATOption, setSelectedVATOption] = useState(false);

  return (
    <div>
      <SDModal show={showModal} onClose={onCloseModal} containerClass="!p-0">
        <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
          <span>ثبت رویداد جدید</span>
          <button type="button" onClick={onCloseModal}>
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
        <div className="px-6 py-8">
          <div className="flex flex-row mb-6 w-full mt-5">
            <div className="flex flex-col">
              <SDLabel className="mb-2">کد</SDLabel>
              <SDTextInput
                type="text"
                id="eventCode"
                defaultValue={lastCode?.content || ""}
                disabled={true}
              />
            </div>
            <div className="flex flex-col mr-4 w-full">
              <SDLabel className="mb-2">عنوان رویداد </SDLabel>
              <SDTextInput type="text" id="title" {...register("title")} />
            </div>
          </div>
          <div className="mb-6 w-full mt-5">
            <SDLabel>محل رویداد</SDLabel>
            <SDTextInput type="text" id="location" {...register("location")} />
          </div>
          <div className="flex items-center">
            <div>
              <SDLabel>تاریخ شروع</SDLabel>
            </div>
            <div className="mr-5">
              <SDDatepicker
                inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
                name="startDate"
                required={true}
                control={control}
              ></SDDatepicker>
            </div>
            <div className="mr-5">
              <SDLabel>تاریخ پایان</SDLabel>
            </div>
            <div className="mr-5">
              <SDDatepicker
                inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
                name="endDate"
                required={true}
                control={control}
              ></SDDatepicker>
            </div>
          </div>
          <div className="flex flex-row w-full mt-5">
            <div className="flex flex-col w-1/2">
              <div>
                <SDLabel>وضعیت</SDLabel>
              </div>
              <div className="mt-2">
                <select
                  id="eventStatus"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("statusId")}
                >
                  <option selected value="">
                    انتخاب کنید
                  </option>
                  {eventStatusData?.content.map((status, index) => (
                    <option
                      key={index}
                      value={status.id}
                      className="text-right"
                    >
                      {status.title}
                    </option>
                  ))}
                </select>
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
            onClick={handleSaveButton}
          >
            ذخیره
          </SDButton>
        </div>
      </SDModal>
    </div>
  );
};

export default AdminNewEvent;
