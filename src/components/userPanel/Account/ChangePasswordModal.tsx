import ResetPasswordOtpComponent from "../../auth/ResertPasswordOtpComponet";
import ResetPasswordFinalComponent from "../../auth/ResetPasswordFinalComponent";
import SDModal from "../../shared/Modal";
import { useEffect, useState } from "react";

const ChangePasswordModal: React.FC<{ phone: string; show: boolean,onClose:()=>void }> = ({
  phone,
  show,
  onClose
}) => {
  const [showModal, setShowModal] = useState<boolean>(show);
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  const [step, setStep] = useState<"otp" | "final">("otp");
  function onOtpConfirm() {
    setStep("final");
    return;
  }

  function resetModal() {
    setShowModal(false);
    setStep("otp");
    onClose()
  }
  return (
    <>
      <SDModal
        show={showModal}
        closeOnBackDrop={false}
        onClose={() => {
          setShowModal(false);
        }}
        containerClass="pt-0 px-0 pb-2"
      >
        <div className="border-b text-lg flex justify-between px-6 py-4 bg-primary-500 text-white rounded-t-md">
          <span>تغییر رمز عبور</span>
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
        <div className="pt-5">
          {step === "otp" && (
            <ResetPasswordOtpComponent
              phone={phone}
              onOtpConfirm={onOtpConfirm}
            />
          )}
          {step === "final" && (
            <ResetPasswordFinalComponent onResetPassword={resetModal} />
          )}
        </div>
      </SDModal>
    </>
  );
};
export default ChangePasswordModal;
