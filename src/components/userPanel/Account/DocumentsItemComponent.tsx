import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { DocumnetStatus } from "../../../models/account.models";
import { UserDocumentsFieldType, accoutnActions } from "../../../store/account";
import SDDatepicker from "../../shared/DatePicker";
import SDLabel from "../../shared/Label";
import LabeledFileInput from "../../shared/LabeledFileInput";
import UserDocumentStatusLabel from "../../shared/UserDocumentStatusLabel";
import DocumentsItemErrorsComponent from "./DocumentsItemErrorsComponent";
import { useState } from "react";

interface DocumentItemProps {
  field: UserDocumentsFieldType;
  title: string;
  validation?: boolean;
}

const DocumentItemComponent: React.FC<DocumentItemProps> = ({
  title,
  validation,
  field,
}) => {
  const documentData = useAppSelector((state) => state.account[field]);
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  function onFileUpload(id: string) {
    setIsUploading(true);
    dispatch(accoutnActions.setDocumnetFile({ field: field, fileId: id }));
  }

  function onFileRemove() {
    setIsUploading(false);
    dispatch(accoutnActions.setDocumnetFile({ field: field, fileId: "" }));
  }

  function onDateChange(value: string) {
    dispatch(
      accoutnActions.setDocumnetExpireDate({ field: field, date: value })
    );
  }

  return (
    <div className="flex justify-between mb-10 items-center flex-wrap">
      <div className=" basis-1/3  xs:basis-1/2 md:basis-1/3">
        <p className="text-slate-500 ">
          {title}
          {(!documentData?.fileId ||
            (documentData.withDate && !documentData?.expirationDate)) && (
            <span className="text-red-600 mr-1">*</span>
          )}
        </p>
        {documentData.withDate && (
          <div className="relative pt-5">
            <SDLabel className="absolute bg-white text-sm top-2 px-1 right-2">
              تاریخ انقضا
            </SDLabel>
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              onChange={onDateChange}
              required={true}
              manualInvalid={
                validation &&
                (!documentData?.fileId ||
                  (documentData.withDate && !documentData?.expirationDate))
              }
              value={documentData?.expirationDate || ""}
            ></SDDatepicker>
          </div>
        )}
        {validation && documentData && (
          <DocumentsItemErrorsComponent documentData={documentData} />
          // <p className="text-red-600 text-sm pr-2 mt-2">
          //   تاریخ انقضا برای این مدرک الزامی است.
          // </p>
        )}
      </div>
      <div>
        <LabeledFileInput
          accepFiles="application/pdf,image/*"
          title={title}
          onUpload={onFileUpload}
          onRemove={onFileRemove}
          disabled={documentData.status === DocumnetStatus.PENDING}
        />
      </div>
      <UserDocumentStatusLabel
        status={documentData?.status || ""}
        display={documentData?.statusDisplay || ""}
        isUploading={isUploading}
      ></UserDocumentStatusLabel>
    </div>
  );
};

export default DocumentItemComponent;
