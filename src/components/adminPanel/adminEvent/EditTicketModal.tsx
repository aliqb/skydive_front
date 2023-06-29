import { useForm } from "react-hook-form";
import SDModal from "../../shared/Modal";
import {
  AdminTicketModel,
  EditTicketRequest,
  SkyDiveEventTicketType,
} from "../../../models/skyDiveEvents.models";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDSelect from "../../shared/Select";
import RadioButton from "../../shared/RadioButton";
import { useState, useEffect } from "react";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
import SDSpinner from "../../shared/Spinner";

interface EditTicketModal extends AdminTicketModel {
  showModal: boolean;
  onCloseModal: (submitted: boolean) => void;
}

const EditTicketModal: React.FC<EditTicketModal> = ({
  showModal,
  onCloseModal,
  ...ticket
}) => {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    reset,
  } = useForm<EditTicketRequest>({
    mode: "onTouched",
  });

  const [selectedReservableOption, setSelectedReservableOption] =
    useState(false);

  const { sendRequest: getTicketTypesRequest, data: tickeTypeResponse } =
    useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const { sendRequest: sendEditRequest, isPending: editPending } = useAPi<
    EditTicketRequest,
    BaseResponse<null>
  >();

  const reservableOptions = [
    { value: "reservable-active", label: "فعال" },
    { value: "reservable-inactive", label: "غیر فعال" },
  ];

  function handleReservableOptionChange(value: string) {
    setSelectedReservableOption(value === "reservable-active");
  }

  function resetModal(submitted: boolean) {
    reset();
    onCloseModal(submitted);
  }

  function onSubmit(data: EditTicketRequest) {
    sendEditRequest(
      {
        url: `/SkyDiveEvents/UpdateTicket`,
        data: {
          id: ticket.id,
          ticketTypeId: data.ticketTypeId,
          reservable: selectedReservableOption,
        },
        method: "put",
      },
      (reponse) => {
        toast.success(reponse.message);
        resetModal(true);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
    console.log(data);
  }

  useEffect(() => {
    setSelectedReservableOption(ticket.reservable);
  }, [ticket]);

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

  return (
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 !w-[480px]"
    >
      <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
        ویرایش بلیت
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
            <p className="font-semibold">شماره بلیت</p>
            <p>{ticket.ticketNumber}</p>
          </div>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="tpyeId" className="mb-2">
                نوع بلیت
              </SDLabel>
              <SDSelect
                id="tpyeId"
                invalid={!!formErrors.ticketTypeId}
                {...register("ticketTypeId", {
                  required: "فیلد اجباری است.",
                })}
              >
                <option></option>
                {tickeTypeResponse?.content &&
                  tickeTypeResponse.content.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.title}
                      </option>
                    );
                  })}
              </SDSelect>
              {formErrors.ticketTypeId?.message && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors.ticketTypeId.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="reservableQty" className="mb-2">
                قابل رزرو
              </SDLabel>
              <div className="mt-3">
                <RadioButton
                  groupName="reservable"
                  options={reservableOptions}
                  selectedOption={
                    selectedReservableOption
                      ? "reservable-active"
                      : "reservable-inactive"
                  }
                  onOptionChange={handleReservableOptionChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-5 pt-5 flex justify-start items-center">
            <SDButton
              color="primary"
              type="submit"
              className="w-full !bg-blue-900"
                disabled={editPending}
            >
              {editPending && <SDSpinner color="blue" />}
              ذخیره
            </SDButton>
          </div>
        </form>
      </div>
    </SDModal>
  );
};

export default EditTicketModal;
