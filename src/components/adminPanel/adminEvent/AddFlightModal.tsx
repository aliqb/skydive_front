import { useFieldArray, useForm } from "react-hook-form";
import SDModal from "../../shared/Modal";
import {
  AddFlightRequest,
  SkyDiveEventTicketType,
} from "../../../models/skyDiveEvents.models";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
import { useEffect, useState } from "react";
import SDSelect from "../../shared/Select";
import SDButton from "../../shared/Button";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import SDSpinner from "../../shared/Spinner";

interface AddFlightModalProps {
  dayId: string;
  date: string;
  showModal: boolean;
  onCloseModal: (submitted: boolean) => void;
}

const AddFlightModal: React.FC<AddFlightModalProps> = ({
  dayId,
  date,
  showModal,
  onCloseModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    watch,
  } = useForm<AddFlightRequest>({
    mode: "onTouched",
    defaultValues: {
      voidableQty: 0,
      ticketTypes: [
        {
          qty: 0,
          typeId: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ticketTypes",
  });

  const {
    sendRequest: getTicketTypesRequest,
    isPending: typesPending,
    data: tickeTypeResponse,
  } = useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const [totalCapacity, setTotalCapacity] = useState<number>();

  function resetModal(submitted: boolean) {
    reset();
    onCloseModal(submitted);
  }

  function onSubmit(data: AddFlightRequest) {
    console.log(data);
  }

  function addTicket() {
    append({
      qty: 0,
      typeId: "",
    });
  }

  function removeTicket(index: number) {
    remove(index);
  }

  useEffect(() => {
    const fetchEventTicketType = () => {
      getTicketTypesRequest({
        url: "/SkyDiveEventTicketType",
        params: {
          pageIndex: 1,
          pageSize: 1000000000,
        },
      });
    };

    fetchEventTicketType();
  }, [getTicketTypesRequest]);

  useEffect(() => {
    function getCapacityById(
      types: SkyDiveEventTicketType[],
      id: string
    ): number {
      const ticketType = types.find((item) => item.id === id);
      if (!ticketType) {
        return 0;
      }
      return ticketType.capacity;
    }

    const subscription = watch((value) => {
      let total = 0;
      if (tickeTypeResponse?.content && value.ticketTypes) {
        total = value.ticketTypes.reduce((prev, currentItem) => {
          if (currentItem?.typeId && currentItem?.qty !== undefined) {
            return (
              prev +
              currentItem.qty *
                getCapacityById(tickeTypeResponse.content, currentItem.typeId)
            );
          }
          return prev;
        }, total);
        setTotalCapacity(total - Number(value.voidableQty));
      }
    });
    return () => subscription.unsubscribe();
  }, [tickeTypeResponse, watch]);

  return (
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 !w-[480px]"
    >
      <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
        ایجاد پرواز
        <button type="button" onClick={() => resetModal(false)}>
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
      <div className="max-h-[80vh] overflow-auto px-3 py-5">
        <div className="flex flex-col gap-3 items-center text-slate-700 text-center w-full">
          <div className="flex gap-6">
            <p className="font-semibold">تاریخ</p>
            <p>{date}</p>
          </div>
          <div className="flex gap-6">
            <p className="font-semibold">ظرفیت هر پرواز</p>
            {totalCapacity === undefined || isNaN(Number(totalCapacity)) ? (
              <p>-</p>
            ) : (
              <p
                className={`${
                  Number(totalCapacity) > 0 ? "text-green-500" : "text-red-600"
                }  ltr`}
              >
                {totalCapacity}
              </p>
            )}
          </div>
        </div>
        {typesPending && (
          <div className="flex justify-center my-12">
            <SDSpinner size={20} color="blue"></SDSpinner>
          </div>
        )}
        {tickeTypeResponse?.content && !typesPending && (
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2 px-5 py-3">
                <SDLabel htmlFor="flightQty" className="mb-2">
                  تعداد پرواز
                </SDLabel>
                <SDTextInput
                  type="number"
                  id="flightQty"
                  invalid={!!formErrors.flightQty}
                  {...register("flightQty", {
                    required: "فیلد اجباری است.",
                    valueAsNumber: true,
                    validate: (value) => {
                      return value > 0 || "مقدار باید بزرگ‌تر از 0 باشد.";
                    },
                  })}
                />
                {formErrors.flightQty?.message && (
                  <p className="text-red-600 text-xs pr-2 mt-2">
                    {formErrors.flightQty.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-5 py-3">
                <SDLabel htmlFor="voidableQty" className="mb-2">
                  غیر قابل رزرو
                </SDLabel>
                <SDTextInput
                  type="number"
                  id="voidableQty"
                  invalid={!!formErrors.voidableQty}
                  {...register("voidableQty", {
                    required: "فیلد اجباری است.",
                    valueAsNumber: true,
                    validate: (value) => {
                      return value >= 0 || "مقدار نمی‌تواند منفی باشد..";
                    },
                  })}
                />
                {formErrors.voidableQty?.message && (
                  <p className="text-red-600 text-xs pr-2 mt-2">
                    {formErrors.voidableQty.message}
                  </p>
                )}
              </div>
            </div>
            <section className=" mt-8">
              <div className="w-full flex">
                <div className="w-5/12 px-5 pl-1">
                  <SDLabel className="mb-2">نوع</SDLabel>
                </div>
                <div className="w-4/12 px-5 pl-1">
                  <SDLabel className="mb-2">تعداد</SDLabel>
                </div>
              </div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="w-full flex  mb-3">
                    <div className="w-5/12 px-5 pl-1">
                      <SDSelect
                        id={`ticketType-${index}`}
                        {...register(`ticketTypes.${index}.typeId` as const, {
                          required: "فیلد اجباری است.",
                        })}
                        invalid={
                          !!formErrors?.ticketTypes?.[index]?.typeId?.message
                        }
                      >
                        <option></option>
                        {tickeTypeResponse.content.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.title}
                            </option>
                          );
                        })}
                      </SDSelect>
                      {formErrors?.ticketTypes?.[index]?.typeId && (
                        <p className="text-red-600 text-xs pr-2 mt-2">
                          {formErrors?.ticketTypes?.[index]?.typeId?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-4/12 px-5 pl-1">
                      <SDTextInput
                        type="number"
                        id={`qty-${index}`}
                        {...register(`ticketTypes.${index}.qty` as const, {
                          required: "فیلد اجباری است.",
                          valueAsNumber: true,
                          validate: (value) => {
                            return value > 0 || "مقدار باید بزرگ‌تر از 0 باشد.";
                          },
                        })}
                        invalid={
                          !!formErrors?.ticketTypes?.[index]?.qty?.message
                        }
                      />
                      {formErrors?.ticketTypes?.[index]?.qty && (
                        <p className="text-red-600 text-xs pr-2 mt-2">
                          {formErrors?.ticketTypes?.[index]?.typeId?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-4/12 xs:w-3/12 flex  pl-5 pr-2 justify-between">
                      {fields.length !== 1 && (
                        <SDButton
                          color="primary"
                          className="font-extrabold !h-10 w-10"
                          onClick={() => removeTicket(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </SDButton>
                      )}
                      {fields.length - 1 === index && (
                        <SDButton
                          className=" mr-1 !h-10 w-10"
                          onClick={addTicket}
                          disabled={
                            index === tickeTypeResponse.content.length - 1
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </SDButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
            <div className="w-full px-5 pt-5 flex justify-start items-center">
              <SDButton
                color="primary"
                type="submit"
                className="w-full !bg-blue-900"
                //   disabled={sendDataIsPending}
              >
                {/* {sendDataIsPending && <SDSpinner />} */}
                افزودن
              </SDButton>
            </div>
          </form>
        )}
      </div>
      {/* <form
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
                defaultValue={eventData?.code || lastCode}
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
          <div className="flex items-center flex-wrap  justify-between">
            <div className="w-full md:w-1/2 mb-5 md:mb-0">
              <SDLabel>تاریخ شروع</SDLabel>

              <div>
                <SDDatepicker
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
            </div>
            <div className="w-full md:pr-3 md:w-1/2">
              <SDLabel>تاریخ پایان</SDLabel>

              <div>
                <SDDatepicker
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
          </div>
          <div className="w-full flex  mt-3 flex-wrap">
            <div className="flex flex-col w-full md:w-1/2 mt-5 mb-6">
              <div className="flex flex-col">
                <div>
                  <SDLabel>وضعیت</SDLabel>
                </div>
                <SDSelect
                  id="eventStatus"
                  invalid={!!formErrors.statusId}
                  {...register("statusId", {
                    required: "فیلد اجباری است.",
                  })}
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
              <div className="flex flex-col mt-5 justify-center">
                <div>
                  <SDLabel>تصویر</SDLabel>
                </div>
                <div className="mt-3">
                  {!uploadedImageId && eventData?.image && (
                    <a
                      href={fileBase + eventData.image}
                      target="_blank"
                      className="block w-40 max-h-48 mb-2"
                    >
                      <img
                        className="w-full h-full object-contain"
                        src={fileBase + eventData.image}
                        alt=""
                      />
                    </a>
                  )}
                  <div className="pr-3">
                    <LabeledFileInput
                      accepFiles="image/*"
                      onUpload={onUploadImage}
                      onRemove={onRemoveImage}
                      title="image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:pr-3  md:w-1/2 mt-5">
              <div className="flex flex-col  ">
                <SDLabel className="mr-5">قابلیت لغو</SDLabel>
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
              <div className="flex flex-col mt-6 ">
                <SDLabel className="mr-5">ارزش افزوده</SDLabel>
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
      </form> */}
    </SDModal>
  );
};

export default AddFlightModal;
