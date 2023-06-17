import SDButton from "../../shared/Button";
import { useEffect, useState } from "react";
import DocumentItemComponent from "./DocumentsItemComponent";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import {
  DocumentsList,
} from "../../../models/account.models";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { UserDocumentsFields, accoutnActions } from "../../../store/account";
import SDSpinner from "../../shared/Spinner";

interface DocumentsProp {
  onSubmit: () => Promise<void>;
}

const Documents: React.FC<DocumentsProp> = (props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { sendRequest: getDcouments } = useAPi<
    null,
    BaseResponse<DocumentsList>
  >();
  const [isPending, setIsPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  async function onSubmit() {
    setIsPending(true);
    setIsSubmitted(true);
    await props.onSubmit();
    setIsPending(false)
  }

  useEffect(() => {
    getDcouments(
      {
        url: "/Users/GetUserDocument",
      },
      (response) => {
        dispatch(accoutnActions.setDocuments(response.content));
      }
    );
  }, []);

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
            />
            <DocumentItemComponent
              field={UserDocumentsFields.logBookDocument}
              title="صفحه آخر Log Book"
            />
            <DocumentItemComponent
              field={UserDocumentsFields.attorneyDocument}
              title="وکالتنامه محضری"
              withDate={true}
              validation={isSubmitted}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.medicalDocument}
              title="مدارک پزشکی"
              withDate={true}
              validation={isSubmitted}
            />
          </div>
          <div className="flex justify-end">
            <SDButton
              color="primary"
              type="submit"
              className="basis-full xs:basis-1/3 xs:max-w-[200px]"
              onClick={onSubmit}
              disabled={isPending}
            >
              {isPending && <SDSpinner />}
              ذخیره
            </SDButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Documents;
