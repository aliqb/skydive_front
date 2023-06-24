import { useCallback, useEffect } from "react";
import AdminUserDocumentItem from "../../../../../components/adminPanel/userManagement/AdminUserDocumentItem";
import useAPi from "../../../../../hooks/useApi";
import { DocumentsList } from "../../../../../models/account.models";
import { BaseResponse } from "../../../../../models/shared.models";
import { useParams } from "react-router-dom";
import SDSpinner from "../../../../../components/shared/Spinner";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { fetchUserDetail } from "../../../../../store/usermanagement";

const AdminUserDocument: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<DocumentsList>
  >();

  function onChangeDocument() {
    dispatch(fetchUserDetail(params.userId as string));
    getDocuments(params.userId as string);
  }

  const getDocuments = useCallback(
    (userId: string) => {
      sendRequest({
        url: "/Users/GetUserDocument",
        params: {
          userId: userId,
        },
      });
    },
    [sendRequest]
  );

  useEffect(() => {
    getDocuments(params.userId as string);
  }, [params.userId, getDocuments]);
  return (
    <div className="p-10 flex justify-around flex-wrap ">
      {isPending && <SDSpinner size={20} color="blue"></SDSpinner>}
      {data && !isPending && (
        <>
          <AdminUserDocumentItem
            title="کارت ملی"
            documentData={data.content.nationalCardDocument}
            withDate={false}
            onChange={onChangeDocument}
          />
          <AdminUserDocumentItem
            title="لاگ بوک"
            documentData={data.content.logBookDocument}
            onChange={onChangeDocument}
          />
          <AdminUserDocumentItem
            title="وکالت‌نامه محضری"
            documentData={data.content.attorneyDocument}
            onChange={onChangeDocument}
            withDate={true}
          />
          <AdminUserDocumentItem
            title="مدارک پزشکی"
            documentData={data.content.medicalDocument}
            onChange={onChangeDocument}
          />
        </>
      )}
    </div>
  );
};

export default AdminUserDocument;
