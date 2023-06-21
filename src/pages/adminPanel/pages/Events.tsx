import React, { useEffect, useState } from "react";
import Grid from "../../../components/shared/Grid";
import SDButton from "../../../components/shared/Button";
import SDDatepicker from "../../../components/shared/DatePicker";
import useAPi from "../../../hooks/useApi";
import {
  BaseResponse,
  EventStatusesPersianMap,
} from "../../../models/shared.models";
import SDSpinner from "../../../components/shared/Spinner";
import { SkyDiveEvent } from "../../../models/skyDiveEvents.models";
import SDModal from "../../../components/shared/Modal";
import SDTextInput from "../../../components/shared/TextInput";
import RadioButton from "../../../components/shared/RadioButton";
import LabeledFileInput from "../../../components/shared/LabeledFileInput";
import { LastCode } from "../../../models/skyDiveEvents.models";

const Events: React.FC = () => {
  const { sendRequest, errors, isPending } = useAPi<
    null,
    BaseResponse<SkyDiveEvent[]>
  >();
  const {
    sendRequest: lastCodeSendRequest,
    errors: lastCodeErrors,
    isPending: lastCodePending,
    data: lastCode,
  } = useAPi<null, BaseResponse<string>>();
  // const [result, setResult] = useState<SkyDiveEvent[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCancelOption, setSelectedCancelOption] = useState<string>("");
  const [selectedVATOption, setSelectedVATOption] = useState<string>("");
  const [code, setCode] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [voidableValue, setVoidableValue] = useState(true);
  const [imageValue, setImageValue] = useState("");
  const [statusIdValue, setStatusIdValue] = useState("");
  const [subjectToVATValue, setSubjectToVATValue] = useState(true);
  const [processedData, setProcessedData] = useState<SkyDiveEvent[]>([]);
  const closeModal = () => {
    setShowModal(false);
  };
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
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

  function resetModal() {
    setShowModal(false);
  }

  const handleCancelOptionChange = (value: string) => {
    setSelectedCancelOption(value === selectedCancelOption ? "null" : value);
  };

  const handleVATOptionChange = (value: string) => {
    setSelectedVATOption(value === selectedVATOption ? "null" : value);
  };

  const handleSaveButton = () => {
    const requestBody = {
      title: titleValue,
      location: locationValue,
      startDate: startDateValue,
      endDate: endDateValue,
      voidable: voidableValue,
      image: imageValue,
      statusId: statusIdValue,
      subjectToVAT: subjectToVATValue,
    };
    sendRequest(
      {
        url: "/SkyDiveEvents",
        method: "post",
        data: requestBody as any,
      },
      (response) => {
        console.log("Response:", response);
      }
    );
  };

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
          <div className="border-b text-lg flex justify-between px-6 py-4 bg-primary-500 text-white rounded-t-md">
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
                <p className="mb-2">کد</p>
                <SDTextInput
                  type="text"
                  id="eventCode"
                  onChange={(event) => setCode(event.target.value)}
                  defaultValue={lastCode?.content || ""}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col mr-4 w-full">
                <p className="mb-2">عنوان رویداد</p>
                <SDTextInput
                  type="text"
                  id="newEvent"
                  onChange={(event) => setTitleValue(event.target.value)}
                  value={titleValue}
                />
              </div>
            </div>
            <div className="mb-6 w-full mt-5">
              <p>محل رویداد</p>
              <SDTextInput
                type="text"
                id="eventPlace"
                onChange={(event) => setLocationValue(event.target.value)}
                value={locationValue}
              />
            </div>
            <div className="flex items-center">
              <div>
                <p>تاریخ شروع</p>
              </div>
              <div className="mr-5">
                <SDDatepicker
                  inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
                  name="expireDate"
                  required={true}
                  onChange={(date) => setStartDateValue(date)}
                  value={startDateValue}
                ></SDDatepicker>
              </div>
              <div className="mr-5">
                <p>تاریخ پایان</p>
              </div>
              <div className="mr-5">
                <SDDatepicker
                  inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
                  name="expireDate"
                  required={true}
                  onChange={(date) => setEndDateValue(date)}
                  value={endDateValue}
                ></SDDatepicker>
              </div>
            </div>
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-1/2">
                <div>
                  <p>وضعیت</p>
                </div>
                <div className="mt-2">
                  <select
                    id="underline_select"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleSelectChange}
                    value={selectedValue}
                  >
                    <option selected value="">
                      انتخاب کنید
                    </option>
                    {Array.from(EventStatusesPersianMap.entries()).map(
                      ([key, value]) => (
                        <option key={key} value={key} className="text-right">
                          {value}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-1/2 items-center mr-4">
                <div>
                  <p className="mb-5">قابلیت لغو</p>
                </div>
                <div>
                  <RadioButton
                    name="voidable"
                    options={CancelOptions}
                    selectedOption={selectedCancelOption}
                    onOptionChange={handleCancelOptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full mt-5">
              <div className="flex flex-col w-1/2">
                <div>
                  <p>تصویر</p>
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
                  <p className="mb-5">ارزش افزوده</p>
                </div>
                <div>
                  <RadioButton
                    name="vat"
                    options={VATOptions}
                    selectedOption={selectedVATOption}
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
              className="w-full"
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
              <option selected value="">
                همه
              </option>
              {Array.from(EventStatusesPersianMap.entries()).map(
                ([key, value]) => (
                  <option key={key} value={key} className="text-right">
                    {value}
                  </option>
                )
              )}
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

export default Events;
