import { useForm } from "react-hook-form";
import SDModal from "../../shared/Modal";
import { EditTicketRuest } from "../../../models/skyDiveEvents.models";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDSelect from "../../shared/Select";
import RadioButton from "../../shared/RadioButton";
import {useState} from 'react';

interface EditTicketModal {
  showModal: boolean;
  onCloseModal: (submitted: boolean) => void;
}

const EditTicketModal: React.FC<EditTicketModal> = ({
  showModal,
  onCloseModal,
}) => {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    reset,
  } = useForm<EditTicketRuest>({
    mode: "onTouched",
  });

  const [selectedReservableOption, setSelectedReservableOption] = useState(false);


  const reservableOptions = [
    { value: "reservable-active", label: "فعال" },
    { value: "reservable-inactive", label: "غیر فعال" },
  ];

  function handleReservableOptionChange (value: string) {
    setSelectedReservableOption(value === "reservable-active");
  }

  function resetModal(submitted: boolean) {
    // reset();
    onCloseModal(submitted);
  }

  function onSubmit(data: EditTicketRuest) {
    console.log(data);
  }

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
            <p>54654</p>
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
                    selectedReservableOption ? "reservable-active" : "reservable-inactive"
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
              //   disabled={sendDataIsPending}
            >
              {/* {sendDataIsPending && <SDSpinner />} */}
              ذخیره
            </SDButton>
          </div>
        </form>
      </div>
    </SDModal>
  );
};

export default EditTicketModal;
