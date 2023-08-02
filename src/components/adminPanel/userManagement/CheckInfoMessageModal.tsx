import SDButton from "../../shared/Button";
import SDModal from "../../shared/Modal";
import { useState } from "react";
import SDSpinner from "../../shared/Spinner";
import SDLabel from "../../shared/Label";
import SDTextArea from "../../shared/TextArea";
import useAPi from "../../../hooks/useApi";
import { CheckUserInfoRequest } from "../../../models/usermanagement.models";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
interface CheckInfoMessageModalProps {
  onCloseModal: (submitted: boolean) => void;
  userId: string;
  confirm?: boolean;
  showModal: boolean;
}
const CheckInfoMessageModal: React.FC<CheckInfoMessageModalProps> = ({
  onCloseModal,
  userId,
  confirm = false,
  showModal,
}) => {
  const title = confirm ? "پیام تأیید اطلاعات" : "پیام عدم تأیید اطلاعات";
  const [message, setMessage] = useState<string>("");
  const { sendRequest: sendCheckRequest, isPending } = useAPi<
    CheckUserInfoRequest,
    BaseResponse<null>
  >();

  const onMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMessage(event.target.value);
  };

  function resetModal(submitted: boolean) {
    setMessage('');
    onCloseModal(submitted);
  }
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    checkInfo(userId, confirm, message)
  }

  function checkInfo(id: string, confirm: boolean,message: string) {
    sendCheckRequest(
      {
        url: "/Admin/CheckUserPersonalInformation",
        data: {
          id: id,
          isConfirmed: confirm,
          message: message
        },
        method: "put",
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
  return (
    <div>
      <SDModal
        show={showModal}
        onClose={() => resetModal(false)}
        containerClass="!p-0 lg:!w-[480px]"
      >
        <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
          {title}
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
        <form onSubmit={onSubmit} className="max-h-[80vh] overflow-auto">
          <div className="px-6 py-6">
            <div className=" w-full">
                <SDLabel htmlFor="message" className="mb-2">
                  پیام
                </SDLabel>
                <SDTextArea
                  id="message"
                  value={message}
                  onChange={onMessageChange}
                  rows={6}
                />

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
              ارسال
            </SDButton>
          </div>
        </form>
      </SDModal>
    </div>
  );
};


export default CheckInfoMessageModal;