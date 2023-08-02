import { useState } from "react";
import { DocumentItemModel } from "../../../models/account.models";
import SDDatepicker from "../../shared/DatePicker";
import SDLabel from "../../shared/Label";
import LabeledFileInput from "../../shared/LabeledFileInput";

interface AdminDocumentUploadItemProps {
  title: string;
  documentData: DocumentItemModel;
  validation: boolean;
  onChange: (documentData: DocumentItemModel) => void;
}
const AdminDocumentUploadItem: React.FC<AdminDocumentUploadItemProps> = ({
  title,
  documentData,
  validation,
  onChange,
}) => {
  const localDocumentData = { ...documentData };
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [expirationDate, setDocumnetExpireDate] = useState<string>("");
  function onFileUpload(id: string) {
    localDocumentData.fileId = id;
    setHasFile(true);
    onChange(localDocumentData);
  }

  function onFileRemove() {
    localDocumentData.fileId = "";
    setHasFile(false);
    onChange(localDocumentData);
  }

  function onDateChange(value: string) {
    localDocumentData.expirationDate = value;
    setDocumnetExpireDate(value);
    onChange(localDocumentData);
  }

  return (
    <div className="py-5  border-b border-slate-300 last:border-none">
      <p className="text-slate-700 text-lg font-semibold">{title}</p>
      <div className="pr-4 mt-3 flex items-center">
        <LabeledFileInput
          accepFiles="application/pdf,image/*"
          title={title}
          onUpload={onFileUpload}
          onRemove={onFileRemove}
        />
        {documentData.withDate && (
          <div className="relative mr-3 md:mr-12">
            <SDLabel className="whitespace-nowrap   !mb-0 bg-white text-sm -top-3 px-1 right-2  absolute ml-0">
              تاریخ انقضا
            </SDLabel>
            <SDDatepicker
              inputClass=" text-center !bg-white border-slate-500 !w-44"
              name="expireDate"
              onChange={onDateChange}
              required={true}
              manualInvalid={validation && hasFile && !expirationDate}
              value={expirationDate}
            ></SDDatepicker>
            {validation && hasFile && !expirationDate && (
              <p className="text-red-600 text-sm pr-2 mt-2">
                تاریخ انقضا برای این مدرک الزامی است.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocumentUploadItem;
