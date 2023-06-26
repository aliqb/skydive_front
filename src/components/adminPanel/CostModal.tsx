import React, { useEffect, useState } from "react";
import {
  CostModalProps,
  NewTicketFee,
  NewTicketFeeList,
  SkyDiveEventTicketType,
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

const CostModal: React.FC<CostModalProps> = ({
  showModal,
  onCloseModal,
  fetchData,
  rowId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
  } = useForm<NewTicketFeeList>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const {
    sendRequest,
    errors,
    isPending,
    data: getData,
  } = useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const {
    sendRequest: sendDatasendRequest,
    isPending: sendDataIsPending,
    data: newTicketFeeData,
  } = useAPi<NewTicketFee, BaseResponse<NewTicketFee[]>>();

  const [divCount, setDivCount] = useState(1);

  useEffect(() => {
    console.log('hereeeeeeeeeeeeeeeeeeeee')
    append({
      amount: 0,
      typeId: '',
    });
    const fetchEventTicketType = () => {
      try {
        sendRequest({
          url: '/SkyDiveEventTicketType',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEventTicketType();
  }, []);

  const handleSaveButton = handleSubmit((data) => {
    console.log(data);
    sendDatasendRequest(
      {
        url: `/SkyDiveEvents/AddEventTypeFee/${rowId}`,
        method: 'post',
        data: data,
      },
      (response) => {
        console.log('Response:', response);
        toast.success(response.message);
        onCloseModal();
        if (fetchData) {
          fetchData();
        }
      },
      (error) => {
        console.log('Error:', error);
        toast.error(error?.message);
      }
    );
  });

  const addFeeItem = () => {
    append({
      amount: 0,
      typeId: '',
    });
    if (getData && getData.content && divCount < getData.content.length) {
      setDivCount((prevCount) => prevCount + 1);
    }
  };
  return (
    <>
      {showModal && (
        <div>
          <SDModal
            show={showModal}
            onClose={onCloseModal}
            containerClass="!p-0"
          >
            <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
              <span>افزودن بهای فروش</span>
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
              {fields.map((field, index) => {
                return (
                  <div
                    className="flex flex-row items-center justify-center w-full mt-5"
                    key={field.id}
                  >
                    <div className="flex flex-col w-1/2">
                      <div>
                        <SDLabel>نوع</SDLabel>
                      </div>
                      <div className="mt-2">
                        <select
                          id={`ticketType-${index}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register(`items.${index}.typeId` as const)}
                        >
                          <option value="">انتخاب کنید</option>
                          {getData?.content.map((type, typeIndex) => (
                            <option
                              key={typeIndex}
                              value={type.id}
                              className="text-right"
                            >
                              {type.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/2 items-center mr-4">
                      <div>
                        <SDLabel className="mb-5">قیمت واحد</SDLabel>
                      </div>
                      <div className="flex items-center">
                        <SDTextInput
                          {...register(`items.${index}.amount` as const, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          id={`amount-${index}`}
                          className="ltr"
                        />

                        {index === divCount - 1 && getData?.content && (
                          <div className="flex items-center m-2">
                            <SDButton
                              color="primary"
                              className="w-8 h-8 font-extrabold"
                              onClick={addFeeItem}
                              disabled={divCount >= getData.content.length}
                            >
                              +
                            </SDButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full px-5 py-8 flex justify-start items-center">
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
          </SDModal>
        </div>
      )}
    </>
  );
};

export default CostModal;
