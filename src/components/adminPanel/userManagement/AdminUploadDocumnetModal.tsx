import {
  DocumentItemModel,
  DocumentsUplodModel,
} from "../../../models/account.models";
import SDButton from "../../shared/Button";
import SDModal from "../../shared/Modal";
import { useState } from "react";
import AdminDocumentUploadItem from "./AdminDocumentUploadItem";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
import SDSpinner from "../../shared/Spinner";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface AdminUploadDocumnetModalProps {
  onCloseModal: (submitted: boolean) => void;
  showModal: boolean;
  userId: string;
}
const AdminUploadDocumnetModal: React.FC<AdminUploadDocumnetModalProps> = ({
  onCloseModal,
  showModal,
  userId,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [anyChange, setAnyChange] = useState<boolean>(false);
  const medicalDocumentsValidityDuration = useAppSelector(
    (state) =>
      state.generalSettings.generalSettings?.medicalDocumentsValidityDuration
  );
  const attorneyDocumentsValidityDuration = useAppSelector(
    (state) =>
      state.generalSettings.generalSettings?.attorneyDocumentsValidityDuration
  );
  const [nationalCardDocumentModel, setNationalCardDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
    });

  const [logBookDocumenttModel, setLogBookDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
    });

  const [attorneyDocumentModel, setAttorneyDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
      withDate: true,
    });

  const [medicalDocumentModel, setMedicalDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
      withDate: true,
    });

  const { sendRequest, isPending } = useAPi<
    DocumentsUplodModel,
    BaseResponse<string>
  >();

  function handleChangeDocument(
    doc: DocumentItemModel,
    setter: React.Dispatch<React.SetStateAction<DocumentItemModel>>
  ) {
    if(!anyChange && doc.fileId){
      setAnyChange(true);
    }
    setter(doc);
  }

  function resetModal(submitted: boolean) {
    setSubmitted(false);
    onCloseModal(submitted);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (
      (attorneyDocumentModel.validationMessage) ||
      (medicalDocumentModel.validationMessage)
    ) {
      return;
    }
    sendRequest(
      {
        url: `/Admin/UploadDocument/${userId}`,
        data: {
          nationalCardDocument: nationalCardDocumentModel.fileId
            ? { fileId: nationalCardDocumentModel.fileId }
            : undefined,
          logBookDocument: logBookDocumenttModel.fileId
            ? { fileId: logBookDocumenttModel.fileId }
            : undefined,
          attorneyDocument: attorneyDocumentModel.fileId
            ? {
                fileId: attorneyDocumentModel.fileId,
                expirationDate: attorneyDocumentModel.expirationDate,
              }
            : undefined,
          medicalDocument: medicalDocumentModel.fileId
            ? {
                fileId: medicalDocumentModel.fileId,
                expirationDate: medicalDocumentModel.expirationDate,
              }
            : undefined,
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
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 lg:!w-[480px]"
    >
      <div className="border-b text-lg flex justify-between px-6 py-4 bg-blue-900 text-white rounded-t-md">
        بارگذاری مدارک
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
          <AdminDocumentUploadItem
            title="کارت ملی"
            documentData={nationalCardDocumentModel}
            validation={submitted}
            onChange={(item) => {
              handleChangeDocument(item, setNationalCardDocumentModel);
            }}
          />
          <AdminDocumentUploadItem
            title="صفحه آخر Log Book"
            documentData={logBookDocumenttModel}
            validation={submitted}
            onChange={(item) => {
              handleChangeDocument(item, setLogBookDocumentModel);
            }}
          />
          <AdminDocumentUploadItem
            title="وکالت‌نامه محضری"
            documentData={attorneyDocumentModel}
            validation={submitted}
            onChange={(item) => {
              handleChangeDocument(item, setAttorneyDocumentModel);
            }}
            minExpireDay={attorneyDocumentsValidityDuration}
          />
          <AdminDocumentUploadItem
            title="مدارک پزشکی"
            documentData={medicalDocumentModel}
            validation={submitted}
            onChange={(item) => {
              handleChangeDocument(item, setMedicalDocumentModel);
            }}
            minExpireDay={medicalDocumentsValidityDuration}
          />
        </div>
        <div className="w-full px-5 pb-6 flex justify-start items-center">
          <SDButton
            color="primary"
            type="submit"
            className="w-full !bg-blue-900"
            disabled={isPending || !anyChange}
          >
            {isPending && <SDSpinner />}
            ذخیره
          </SDButton>
        </div>
      </form>
    </SDModal>
  );
};

export default AdminUploadDocumnetModal;
