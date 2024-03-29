import { useCallback, useState, useRef } from "react";
import useAPi from "../../hooks/useApi";
import { JumpRecord } from "../../models/jumps.models";
import { BaseResponse } from "../../models/shared.models";
import {
  ColDef,
  GridGetData,
  GridParams,
  GridRef,
} from "../../components/shared/Grid/grid.types";
import SDCard from "../../components/shared/Card";
import Grid from "../../components/shared/Grid/Grid";
import SDButton from "../../components/shared/Button";
import JumpRecordModal from "../../components/userPanel/JumpRecordModal";

const JumpRecordsPage: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<JumpRecord[]>>();

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
  const gridRef = useRef<GridRef>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  function openModal() {
    setShowModal(true);
  }

  function onCloseModal(submitted: boolean) {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setShowModal(false);
  }

  const fetchRecords = useCallback<GridGetData<JumpRecord>>(
    (gridParams: GridParams, setRows, fail) => {
      sendRequest(
        {
          url: "/jumpRecords",
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
          },
        },
        (reponse) => {
          setRows(reponse.content, reponse.total);
        },
        (error) => fail(error)
      );
    },

    [sendRequest]
  );

  return (
    <>
      <JumpRecordModal showModal={showModal} onClose={onCloseModal} />
      <SDCard>
        <h1 className="text-center font-bold text-xl py-5">سوابق پرش</h1>
        <div className="py-5 md:px-8">
          <>
            <div className="mb-2">
              <SDButton color="primary" onClick={openModal}>
                + جدید
              </SDButton>
            </div>
            <Grid<JumpRecord>
              colDefs={colDefs}
              getData={fetchRecords}
              rowActions={null}
              ref={gridRef}
            />
          </>
        </div>
      </SDCard>
    </>
  );
};

export default JumpRecordsPage;
