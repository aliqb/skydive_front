import { useCallback, useRef, useState } from "react";
import useAPi from "../../../../../hooks/useApi";
import { JumpRecord } from "../../../../../models/jumps.models";
import { BaseResponse } from "../../../../../models/shared.models";
import {
  ColDef,
  GridGetData,
  GridParams,
  GridRef,
} from "../../../../../components/shared/Grid/grid.types";
import Grid from "../../../../../components/shared/Grid/Grid";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SDButton from '../../../../../components/shared/Button';
import JumpRecordModal from '../../../../../components/userPanel/JumpRecordModal';

const AdminJumpRecoreds: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<JumpRecord[]>>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { sendRequest: sendApproveRequest } = useAPi<
    null,
    BaseResponse<null>
  >();

  const [colDefs] = useState<ColDef<JumpRecord>[]>([
    {
      field: 'date',
      headerName: 'تاریخ',
    },
    {
      field: 'location',
      headerName: 'محل پرواز',
    },
    {
      field: 'equipments',
      headerName: 'تجهیزات',
    },
    {
      field: 'planeType',
      headerName: 'نوع هواپیما',
    },
    {
      field: 'height',
      headerName: 'ارتفاع',
      cellRenderer: (item: JumpRecord) => `${item.height}m`,
    },
    {
      field: 'time',
      headerName: 'مدت',
      cellRenderer: (item: JumpRecord) => {
        const [hour, minutes] = item.time.split(':');
        return [hour, minutes].join(':');
      },
    },
    {
      field: 'description',
      headerName: 'توضیحات',
    },
    {
      field: 'confirmed',
      headerName: 'وضعیت',
      cellRenderer: (item: JumpRecord) =>
        item.confirmed ? 'تأیید شده' : 'تأیید نشده',
    },
  ]);
  const gridRef = useRef<GridRef>(null);

  const params = useParams();

  const fetchRecords = useCallback<GridGetData<JumpRecord>>(
    (gridParams: GridParams, setRows, fail) => {
      sendRequest(
        {
          url: '/jumpRecords',
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
            userId: params.userId,
          },
        },
        (reponse) => {
          setRows(reponse.content, reponse.total);
        },
        (error) => fail(error)
      );
    },
    [sendRequest, params]
  );

  function approveRecord(item: JumpRecord) {
    sendApproveRequest(
      {
        url: `/JumpRecords/ConfirmJumpRecord/${item.id}/true`,
        method: 'put',
      },
      (response) => {
        toast.success(response.message);
        gridRef.current?.refresh();
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }
  function openModal() {
    setShowModal(true);
    console.log('Hello');
  }
  function onCloseModal(submitted: boolean) {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setShowModal(false);
  }

  return (
    <>
      <JumpRecordModal
        showModal={showModal}
        onClose={onCloseModal}
        adminStyling={true}
      />

      <div className="py-16 px-12">
        <div className="mb-2">
          <SDButton color="success" onClick={openModal}>
            + جدید
          </SDButton>
        </div>
        <Grid<JumpRecord>
          colDefs={colDefs}
          getData={fetchRecords}
          rowActions={{
            edit: false,
            remove: false,
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
                descriptions: 'تأیید',
                onClick: approveRecord,
                showField: '!confirmed',
              },
            ],
          }}
          ref={gridRef}
        />
      </div>
    </>
  );
};

export default AdminJumpRecoreds;
