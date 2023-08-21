// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import  Editor from "ckeditor5-custom-build/src/ckeditor";
import {
  AddTermAndConditionsRequest,
  SkyDiveEvent,
} from "../../../models/skyDiveEvents.models";
import SDModal from "../../shared/Modal";
import SDEditor from "../../shared/Editor";
import { useEffect, useState, FormEvent } from "react";
import SDButton from "../../shared/Button";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
import SDSpinner from "../../shared/Spinner";
// import * as ClassicEditor from "../../../assets/ckEditor/build/ckeditor.js"

interface TermsAndConditionsModalProps {
  skyDiveEvent: SkyDiveEvent;
  showModal: boolean;
  onCloseModal: (submitted: boolean) => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  skyDiveEvent,
  showModal,
  onCloseModal,
}) => {
  const resetModal = (submitted: boolean) => {
    onCloseModal(submitted);
  };

  const [content, setContent] = useState<string>("");
  const { sendRequest, isPending } = useAPi<
    AddTermAndConditionsRequest,
    BaseResponse<null>
  >();

  useEffect(() => {
    setContent(skyDiveEvent.termsAndConditions);
  }, [skyDiveEvent]);

  function onChangeContent(data: string) {
    setContent(data);
  }

  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    sendRequest(
      {
        method: 'put',
        url: `/SkyDiveEvents/ConditionsAndTerms/${skyDiveEvent.id}`,
        data: {
          conditionsAndTerms: content,
        },
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
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 border-none !w-[900px]"
    >
      <div className="border-b  text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md ">
        <span>قوانین و شرایط رویداد</span>
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
      <div className="max-h-[80vh] overflow-auto">
        <div className="flex flex-col gap-3 my-5 items-center text-slate-700 text-center w-full ">
          <div className="flex gap-6">
            <p className="font-semibold">رویداد</p>
            <p>{skyDiveEvent.title}</p>
          </div>
        </div>
        <form className=" overflow-auto" onSubmit={onSubmit}>
          <div className="p-3">
            {/* <CKEditor editor={Editor as any}></CKEditor> */}
            <SDEditor data={content} onChange={onChangeContent} />
          </div>
          <div className="w-full px-5 py-5 flex justify-center items-center">
            <SDButton
              color="primary2"
              type="submit"
              className="w-96"
              disabled={isPending}
            >
              {isPending && <SDSpinner color="blue" />}
              ذخیره
            </SDButton>
          </div>
        </form>
      </div>
    </SDModal>
  );
};

export default TermsAndConditionsModal;
