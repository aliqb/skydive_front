import SDButton from "../../shared/Button";
import {  useState } from "react";
import DocumentItemComponent from "./DocumentsItemComponent";
import { UserDocumentsFields } from "../../../store/account";
import SDSpinner from "../../shared/Spinner";

interface DocumentsProp {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  disableAll: boolean;
}

const Documents: React.FC<DocumentsProp> = (props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);



  async function onSubmit() {
    setIsSubmitted(true);
    await props.onSubmit();
  }



  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-slate-500">
            جهت تکمیل ثبت نام مدارک زیر الزامی است.
          </p>
          <div className="mt-10">
            <DocumentItemComponent
              field={UserDocumentsFields.nationalCardDocument}
              title="کارت ملی"
              validation={isSubmitted}
              disable={props.disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.logBookDocument}
              title="صفحه آخر Log Book"
              validation={isSubmitted}
              disable={props.disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.attorneyDocument}
              title="وکالتنامه محضری"
              validation={isSubmitted}
              disable={props.disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.medicalDocument}
              title="مدارک پزشکی"
              validation={isSubmitted}
              disable={props.disableAll}
            />
          </div>
          <div className="flex justify-center">
            <SDButton
              color="success"
              type="submit"
              className="basis-full xs:basis-1/2"
              onClick={onSubmit}
              disabled={props.isPending || props.disableAll}
            >
              {props.isPending && <SDSpinner />}
              ذخیره
            </SDButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Documents;
