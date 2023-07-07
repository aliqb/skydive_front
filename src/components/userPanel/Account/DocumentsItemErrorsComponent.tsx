import {  DocumentItemModel } from "../../../models/account.models";

interface DocumentsItemErrorsComponentProps {
  documentData: DocumentItemModel;
}

const DocumentsItemErrorsComponent: React.FC<
  DocumentsItemErrorsComponentProps
> = ({ documentData }) => {
  if (!documentData.fileId) {
    return (
      <p className="text-red-600 text-sm pr-2 mt-2">
        بارگذاری این مدرک الزامی است..
      </p>
    );
  }
  if (documentData.withDate && !documentData.expirationDate) {
    <p className="text-red-600 text-sm pr-2 mt-2">
      تاریخ انقضا برای این مدرک الزامی است.
    </p>;
  }
  return (<></>)
};

export default DocumentsItemErrorsComponent;
