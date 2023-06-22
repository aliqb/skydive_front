import React, { useEffect, useState } from "react";
import Grid from "../../../components/shared/Grid";
import SDButton from "../../../components/shared/Button";
import SDDatepicker from "../../../components/shared/DatePicker";
import useAPi from "../../../hooks/useApi";
import { useForm } from "react-hook-form";
import {
  NewEvent,
  SkyDiveEventStatus,
} from "../../../models/skyDiveEvents.models";
import { BaseResponse } from "../../../models/shared.models";
import SDSpinner from "../../../components/shared/Spinner";
import { SkyDiveEvent } from "../../../models/skyDiveEvents.models";
import SDModal from "../../../components/shared/Modal";
import SDTextInput from "../../../components/shared/TextInput";
import RadioButton from "../../../components/shared/RadioButton";
import LabeledFileInput from "../../../components/shared/LabeledFileInput";
import SDLabel from "../../../components/shared/Label";

const AdminEvents: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<NewEvent>();
  const { sendRequest, errors, isPending } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();
  const { sendRequest: eventStatusSendRequest, data: eventStatusData } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus[]>
  >();
  const { sendRequest: lastCodeSendRequest, data: lastCode } = useAPi<
    null,
    BaseResponse<string>
  >();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCancelOption, setSelectedCancelOption] = useState(false);
  const [selectedVATOption, setSelectedVATOption] = useState(false);

  const [processedData, setProcessedData] = useState<SkyDiveEvent[]>([]);
  const closeModal = () => {
    setShowModal(false);
  };
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected value:", event.target.value);
  };
  useEffect(() => {
    const fetchUsers = () => {
      try {
        sendRequest(
          {
            url: "/SkyDiveEvents",
            params: {
              pagesize: 10,
              pageindex: 1,
              userStatus: selectedValue.toLowerCase(),
            },
          },
          (response) => {
            const processedData =
              response.content.map((item) => {
                const voidableString = item.voidable ? "هست" : "نیست";
                return { ...item, voidableString };
              }) || [];
            setProcessedData(processedData);
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, [selectedValue]);

  useEffect(() => {
    const fetchEventStatuses = () => {
      try {
        eventStatusSendRequest({
          url: "/SkyDiveEventStatuses",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventStatuses();
  }, []);

  useEffect(() => {
    const fetchLastCode = () => {
      try {
        lastCodeSendRequest({
          url: "/SkyDiveEvents/GetLastCode",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLastCode();
  }, []);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-3/4">
        <SDSpinner size={16} />
      </div>
    );
  }

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }

  function setFormValue(info: NewEvent) {
    reset({
      title: info.title,
      location: info.location,
      startDate: info.startDate,
      endDate: info.endDate,
      voidable: info.voidable,
      image: info.image,
      statusId: info.statusId,
      subjecToVAT: info.subjecToVAT,
    });
  }

  function resetModal() {
    setShowModal(false);
  }

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

  const CancelOptions = [
    { value: "cancel-active", label: "فعال" },
    { value: "cancel-inactive", label: "غیر فعال" },
  ];
  const VATOptions = [
    { value: "vat-active", label: "فعال" },
    { value: "vat-inactive", label: "غیر فعال" },
  ];
  return (
    <>
      <div className="flex justify-between mt-12">
        <div>
          <SDButton color="success" onClick={handleButtonClick}>
            + جدید
          </SDButton>
        </div>

        <SDModal show={showModal} onClose={closeModal} containerClass="!p-0">
          <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
            <span>ثبت رویداد جدید</span>
            <button type="button" onClick={resetModal}>
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
              <SDTextInput
                type="text"
                id="location"
                {...register("location")}
              />
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
                    value={selectedValue}
                    {...register("statusId", {
                      onChange: (event) => {
                        setSelectedValue(event.target.value);
                      },
                    })}
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

        <div className="flex items-center justify-center">
          <div>
            <p>وضعیت :</p>
          </div>
          <div className="mr-5">
            <select
              id="underline_select"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option value="">همه</option>
              {eventStatusData?.content.map((status, index) => (
                <option key={index} value={status.id} className="text-right">
                  {status.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <p> تاریخ :</p>
          </div>
          <div className="mr-5">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="از :"
            ></SDDatepicker>
          </div>
          <div className="mr-5">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="تا :"
            ></SDDatepicker>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Grid
          data={processedData}
          columnsToShow={[
            "code",
            "title",
            "startDate",
            "endDate",
            "location",
            "statusTitle",
            "voidableString",
            "termsAndConditions",
          ]}
        />
      </div>
    </>
  );
};

export default AdminEvents;
