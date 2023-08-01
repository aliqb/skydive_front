import { useCallback, useState, useRef } from "react";
import useAPi from "../../../../../hooks/useApi";
import {
  DocumentItem,
  DocumentItemRow,
  DocumentsList,
  DocumnetStatus,
} from "../../../../../models/account.models";
import { BaseResponse } from "../../../../../models/shared.models";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { fetchUserDetail } from "../../../../../store/usermanagement";
import Grid from "../../../../../components/shared/Grid/Grid";
import {
  ColDef,
  GridGetData,
  GridRef,
} from "../../../../../components/shared/Grid/grid.types";
import UserDocumentStatusLabel from "../../../../../components/shared/UserDocumentStatusLabel";
import { sortDate } from "../../../../../utils/shared";
import { toast } from "react-toastify";
import FileViewButton from "../../../../../components/shared/FileViewButtom";

const AdminUserDocument: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: "عنوان",
      field: "title",
    },
    {
      headerName: "تاریخ بارگذاری",
      field: "createdAt",
    },
    {
      headerName: "تاریخ انقضا",
      field: "expirationDate",
    },
    {
      headerName: "وضعیت",
      field: "statusDisplay",
      cellRenderer: (item) => {
        return (
          <UserDocumentStatusLabel
            status={item.status || ""}
            display={item.statusDisplay || ""}
            isUploading={false}
          ></UserDocumentStatusLabel>
        );
      },
    },
    {
      headerName: "",
      field: "",
      cellRenderer: (item: DocumentItemRow) => {
        return <FileViewButton fileId={item.fileId} alt={item.title} />;
      },
    },
  ]);
  const gridRef = useRef<GridRef>(null);
  const { sendRequest } = useAPi<
    null,
    BaseResponse<DocumentsList>
  >();

  const { sendRequest: checkRequest } = useAPi<null, BaseResponse<null>>();

  const mapDocumentsToRows = useCallback(
    (documents: DocumentItem[], title: string) => {
      const rows: DocumentItemRow[] = documents.map((item) => {
        return {
          ...item,
          title,
          isPending: item.status === DocumnetStatus.PENDING,
        };
      });
      return rows;
    },
    []
  );

  const getDocuments = useCallback<GridGetData<DocumentItemRow>>(
    (_gridParams, setRows) => {
      const userId = params.userId;
      sendRequest(
        {
          url: "/Users/GetUserDocument",
          params: {
            userId: userId,
          },
        },
        (response) => {
          const documents = response.content;
          const nationalCardDocuments: DocumentItem[] =
            documents.nationalCardDocuments || [];
          const logBookDocument: DocumentItem[] =
            documents.logBookDocuments || [];
          const attorneyDocument: DocumentItem[] =
            documents.attorneyDocuments || [];
          const medicalDocument: DocumentItem[] =
            documents.medicalDocuments || [];
          const rows = [
            ...mapDocumentsToRows(nationalCardDocuments, "کارت ملی"),
            ...mapDocumentsToRows(logBookDocument, "لاگ بوک"),
            ...mapDocumentsToRows(attorneyDocument, "وکالت‌نامه محضری"),
            ...mapDocumentsToRows(medicalDocument, "مدارک پزشکی"),
          ];
          setRows(sortDate<DocumentItemRow>(rows, "createdAt"));
          const allApproved = rows.every(
            (row) => DocumnetStatus.CONFIRMED === row.status
          );
          if (allApproved) {
            dispatch(fetchUserDetail(userId as string));
          }
        }
      );
    },
    [sendRequest, dispatch, mapDocumentsToRows, params]
  );

  const checkDocument = useCallback(
    (id: string, approve: boolean) => {
      checkRequest(
        {
          url: `/Admin/CheckUserDocument/${id}/${approve}`,
          method: "put",
        },
        (response) => {
          toast.success(response.message);
          gridRef.current?.refresh();
        },
        (error) => {
          toast.error(error?.message || "");
        }
      );
    },
    [checkRequest]
  );

  // useEffect(() => {
  //   getDocuments(params.userId as string);
  // }, [params.userId, getDocuments]);
  return (
    <div className="py-16 px-12">
      <Grid<DocumentItem>
        colDefs={colDefs}
        getData={getDocuments}
        pageSize={null}
        ref={gridRef}
        rowActions={{
          remove: true,
          edit: false,
          otherActions: [
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              descriptions: "تأیید",
              onClick: (item) => {
                checkDocument(item.id as string, true);
              },
              showField: "isPending",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              ),
              descriptions: "عدم تأیید",
              onClick: (item) => {
                checkDocument(item.id as string, false);
              },
              showField: "isPending",
            },
          ],
        }}
      />
    </div>
  );
};

export default AdminUserDocument;
