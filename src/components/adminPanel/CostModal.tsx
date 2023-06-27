import React, { useEffect } from "react";
import {
  CostModalProps,
  NewTicketFeeList,
  SkyDiveEventTicketType,
  TicketFee,
} from "../../models/skyDiveEvents.models";
import SDModal from "../shared/Modal";
import SDLabel from "../shared/Label";
import SDButton from "../shared/Button";
import SDSpinner from "../shared/Spinner";
import SDTextInput from "../shared/TextInput";
import { BaseResponse } from "../../models/shared.models";
import useAPi from "../../hooks/useApi";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import SDSelect from "../shared/Select";

const CostModal: React.FC<CostModalProps> = ({
  showModal,
  onCloseModal,
  rowId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm<NewTicketFeeList>({
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const {
    sendRequest: getRequest,
    isPending: getTypesPending,
    data: typesResponse,
  } = useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const {
    sendRequest: getFees,
    isPending: getFeesPending,
    data: detailResponse,
  } = useAPi<null, BaseResponse<TicketFee[]>>();

  const { sendRequest: sendChangeRequest, isPending: sendDataIsPending } =
    useAPi<NewTicketFeeList, BaseResponse<null>>();

  useEffect(() => {
    getFees({
      url: `/SkyDiveEvents/TicketTypeAmounts/${rowId}`,
    });
  }, [rowId, getFees]);

  useEffect(() => {
    function setFormValue(fees: TicketFee[]) {
      reset({
        items: fees.map((fee) => {
          return {
            amount: fee.amount,
            typeId: fee.typeId,
          };
        }),
      });
    }
    if (detailResponse?.content) {
      if (detailResponse.content.length) {
        setFormValue(detailResponse.content);
      } else {
        setFormValue([{
          amount:0,
          typeId: ''
        }])
      }
    }
  }, [detailResponse, reset, typesResponse]);

  useEffect(() => {
    const fetchEventTicketType = () => {
      getRequest({
        url: "/SkyDiveEventTicketType",
        params: {
          pageIndex: 1,
          pageSize: 1000000000,
        },
      });
    };

    fetchEventTicketType();
  }, [getRequest, detailResponse]);

  const handleSaveButton = handleSubmit((data) => {
    console.log(data);
    sendChangeRequest(
      {
        url: `/SkyDiveEvents/AddEventTypeFee/${rowId}`,
        method: "post",
        data: data,
      },
      (response) => {
        console.log("Response:", response);
        toast.success(response.message);
        onCloseModal(true);
        // if (fetchData) {
        //   fetchData();
        // }
      },
      (error) => {
        console.log("Error:", error);
        toast.error(error?.message);
      }
    );
  });

  const addFeeItem = () => {
    append({
      amount: 0,
      typeId: "",
    });
  };

  const removeFeeItem = (index: number) => {
    remove(index);
  };

  const resetModal = (submitted: boolean) => {
    onCloseModal(submitted);
  };

  return (
    <>
      {showModal && (
        <div>
          <SDModal
            show={showModal}
            onClose={() => resetModal(false)}
            containerClass="!p-0 border-none !w-[480px]"
          >
            <div className="border-b  text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
              <span>ویرایش بهای فروش</span>
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
            {(getTypesPending || getFeesPending) && (
              <div className="flex justify-center py-5">
                <SDSpinner color="blue" size={20}></SDSpinner>
              </div>
            )}
            {typesResponse?.content && !getTypesPending && !getFeesPending && (
              <form className="max-h-[80vh] overflow-auto">
                <div className="px-6 py-8">
                  <div className="flex flex-row items-center  w-full mt-5">
                    <div className="flex flex-col w-5/12 ">
                      <div>
                        <SDLabel>نوع</SDLabel>
                      </div>
                    </div>
                    <div className="flex flex-col w-5/12  mr-4">
                      <div>
                        <SDLabel>قیمت واحد</SDLabel>
                      </div>
                    </div>
                  </div>
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="flex flex-row  justify-between w-full mb-2"
                        key={field.id}
                      >
                        <div className="flex flex-col w-5/12">
                          <div className="">
                            <SDSelect
                              id={`ticketType-${index}`}
                              {...register(`items.${index}.typeId` as const, {
                                required: "فیلد اجباری است.",
                              })}
                              invalid={
                                !!formErrors?.items?.[index]?.typeId?.message
                              }
                            >
                              <option value="">انتخاب کنید</option>
                              {typesResponse.content.map((type, typeIndex) => (
                                <option
                                  key={typeIndex}
                                  value={type.id}
                                  className="text-right"
                                >
                                  {type.title}
                                </option>
                              ))}
                            </SDSelect>
                            {formErrors?.items?.[index]?.typeId && (
                              <p className="text-red-600 text-xs pr-2 mt-2">
                                {formErrors?.items?.[index]?.typeId?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col w-4/12 items-center mr-4">
                          <div>
                            <SDTextInput
                              {...register(`items.${index}.amount` as const, {
                                valueAsNumber: true,
                                required: "فیلد اجباری است.",
                                validate: (value) => {
                                  return (
                                    value > 0 || "قیمت باید بزرگ‌تر از 0 باشد."
                                  );
                                },
                              })}
                              type="number"
                              id={`amount-${index}`}
                              className="ltr"
                              invalid={
                                !!formErrors?.items?.[index]?.amount?.message
                              }
                            />
                            {formErrors?.items?.[index]?.amount && (
                              <p className="text-red-600 text-xs pr-2 mt-2">
                                {formErrors?.items?.[index]?.amount?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex  justify-between pr-4  w-4/12 xs:w-3/12">
                          {fields.length !== 1 && (
                            <SDButton
                              color="primary"
                              className="font-extrabold !h-10 w-10"
                              onClick={() => removeFeeItem(index)}
                            >
                              -
                            </SDButton>
                          )}
                          {index === fields.length - 1 && (
                            <SDButton
                              className=" mr-1 !h-10 w-10"
                              onClick={addFeeItem}
                              disabled={
                                fields.length === typesResponse.content.length
                              }
                            >
                              +
                            </SDButton>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full px-5 pb-6 flex justify-start items-center">
                  <SDButton
                    color="primary"
                    type="submit"
                    className="w-full !bg-blue-900"
                    onClick={handleSaveButton}
                    disabled={sendDataIsPending}
                  >
                    {sendDataIsPending && <SDSpinner />}
                    افزودن
                  </SDButton>
                </div>
              </form>
            )}
          </SDModal>
        </div>
      )}
    </>
  );
};

export default CostModal;
