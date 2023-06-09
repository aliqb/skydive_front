import SDButton from "../../shared/Button";
import SDModal from "../../shared/Modal";
import DocumentItem from "./DocumentsItem";
import { useState } from "react"

const Documents: React.FC = () => {
    const [isSubmitted,setIsSubmitted] = useState<boolean>(false);
  function onDocumentChange() {
    return;
  }
  
  function onSubmit(){
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col items-center">
        <SDModal show={true}>
            test
        </SDModal>
      <div className="max-w-2xl mx-auto w-full">
        <p className="text-slate-500">
          جهت تکمیل ثبت نام مدارک زیر الزامی است.
        </p>
        <div className="mt-10">
          <DocumentItem
            title="کارت ملی"
            status=""
            onChange={onDocumentChange}
          ></DocumentItem>
          <DocumentItem
            title="صفحه آخر Log Book"
            status=""
            onChange={onDocumentChange}
          ></DocumentItem>
          <DocumentItem
            title="وکالتنامه محضری"
            status=""
            onChange={onDocumentChange}
            withDate={true}
            validation={isSubmitted}
          ></DocumentItem>
          <DocumentItem
            title="مدارک پزشکی"
            status=""
            onChange={onDocumentChange}
            withDate={true}
            validation={isSubmitted}
          ></DocumentItem>
        </div>
        <div className="flex justify-end">
          <SDButton
            color="primary"
            type="submit" 
            className="basis-full xs:basis-1/3 xs:max-w-[200px]" 
            onClick={onSubmit}
          >
            ذخیره
          </SDButton>
        </div>
      </div>
    </div>
  );
};
export default Documents;
