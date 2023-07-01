import { useCallback, useEffect, useState } from "react";
import useAPi from "../../hooks/useApi";
import { JumpRecord } from "../../models/jumps.models";
import { BaseResponse } from "../../models/shared.models";
import { ColDef } from "../../components/shared/Grid/grid.types";
import SDCard from "../../components/shared/Card";
import SDSpinner from "../../components/shared/Spinner";
import Grid from "../../components/shared/Grid/Grid";
import SDButton from "../../components/shared/Button";
import JumpRecordModal from "../../components/userPanel/JumpRecordModal";

const JumpRecordsPage: React.FC = () => {
  const {
    sendRequest,
    isPending,
    data: recordsResponse,
  } = useAPi<null, BaseResponse<JumpRecord[]>>();

  const [colDefs] = useState<ColDef<JumpRecord>[]>([
    {
      field: "date",
      headerName: "تاریخ",
    },
    {
      field: "location",
      headerName: "محل پرواز",
    },
    {
      field: "equipments",
      headerName: "تجهیزات",
    },
    {
      field: "planeType",
      headerName: "نوع هواپیما",
    },
    {
      field: "height",
      headerName: "ارتفاع",
      cellRenderer: (item: JumpRecord) => `${item.height}m`,
    },
    {
      field: "time",
      headerName: "مدت",
      cellRenderer: (item: JumpRecord) => {
        const [hour, minutes] = item.time.split(":");
        return [hour, minutes].join(":");
      },
    },
    {
      field: "description",
      headerName: "توضیحات",
    },
    {
      field: "confirmed",
      headerName: "وضعیت",
      cellRenderer: (item: JumpRecord) =>
        item.confirmed ? "تأیید شده" : "تأیید نشده",
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);

  function openModal(){
    setShowModal(true);
  }

  function onCloseModal(submitted: boolean) {
    if (submitted) {
      fetchRecords();
    }
    setShowModal(false);
  }

  const fetchRecords = useCallback(() => {
    sendRequest({
      url: "/jumpRecords",
      params: {
        pageSize: 10000,
        pageIndex: 1,
      },
    });
  }, [sendRequest]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return (
    <>
      <JumpRecordModal showModal={showModal} onClose={onCloseModal} />
      <SDCard>
        <h1 className="text-center font-bold text-xl py-5">سوابق پرش</h1>
        <div className="py-5 md:px-8">
          {isPending && (
            <div className="flex justify-center mt-8">
              <SDSpinner size={28} />
            </div>
          )}
          {recordsResponse?.content && !isPending && (
            <>
              <div className="mb-2">
                <SDButton color="primary" onClick={openModal}>+ جدید</SDButton>
              </div>
              <Grid<JumpRecord>
                colDefs={colDefs}
                data={recordsResponse.content}
                rowActions={null}
              />
            </>
          )}
        </div>
      </SDCard>
    </>
  );
};

export default JumpRecordsPage;
