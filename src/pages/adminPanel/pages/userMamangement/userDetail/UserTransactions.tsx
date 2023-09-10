import { useState, useCallback, useRef } from 'react';
import {
  ColDef,
  GridGetData,
  GridRef,
} from '../../../../../components/shared/Grid/grid.types';
import PdfPrintButton from '../../../../../components/shared/PdfPrintButton';
import useAPi from '../../../../../hooks/useApi';
import { BaseResponse } from '../../../../../models/shared.models';
import { UserTransaction } from '../../../../../models/transactions.models';
import Grid from '../../../../../components/shared/Grid/Grid';
import { useParams } from 'react-router-dom';
import useConfirm from '../../../../../hooks/useConfirm';
import { toast } from 'react-toastify';

const UserTransactions: React.FC = () => {
  const params = useParams();
  const { sendRequest } = useAPi<null, BaseResponse<UserTransaction[]>>();
  const gridRef = useRef<GridRef>(null);
  const [DeleteConfirmModal, deleteConfirmation] = useConfirm(
    ' این تراکنش حذف خواهد شد. آیا مطمئن هستید؟ ',
    'حذف کردن تراکنش'
  );
  const { sendRequest: sendRemoveRequest } = useAPi<null, BaseResponse<null>>();

  const [colDefs] = useState<ColDef<UserTransaction>[]>([
    {
      field: 'date',
      headerName: 'تاریخ پرداخت',
      sortable: true,
    },
    {
      field: 'ticketNumber',
      headerName: 'شماره بلیت',
    },
    {
      field: 'eventName',
      headerName: 'نام رویداد',
    },
    {
      field: 'paymentInformation',
      headerName: 'اطلاعات پرداخت',
    },
    {
      field: 'amount',
      headerName: 'مبلغ',
    },
    {
      field: 'type',
      headerName: 'نوع',
      cellRenderer: (item: UserTransaction) => {
        const displayText = item.type === 'Confirmed' ? 'تأیید' : 'ابطال';
        return <span>{displayText}</span>;
      },
    },
    {
      field: 'invoiceNumber',
      headerName: 'شماره فاکتور',
      cellRenderer: (item: UserTransaction) => {
        if (String(item.paymentInformation) === 'شارژ کیف پول') {
          return null;
        }
        return item.invoiceNumber;
      },
    },
    {
      field: '',
      headerName: 'فاکتور',
      cellRenderer: (item: UserTransaction) => {
        if (String(item.paymentInformation) === 'شارژ کیف پول') {
          return null;
        }
        return (
          <PdfPrintButton
            pdfUrl={`${import.meta.env.VITE_BASE_API_URL}/transactions/Print/${
              item.id
            }`}
            fileName={`فاکتور ${item.ticketNumber}`}
          />
        );
      },
    },
  ]);
  async function onRemoveUserTransactions(item: UserTransaction) {
    const confirm = await deleteConfirmation();
    if (!confirm) {
      return;
    }
    sendRemoveRequest(
      {
        url: `/JumpRecords/${item.id}`,
        method: 'delete',
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

  const fetchTickets = useCallback<GridGetData<UserTransaction>>(
    (gridParams, setRows, fail) => {
      sendRequest(
        {
          url: `/transactions/GetUserTransactions/${params.userId}`,
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
          },
        },
        (response) => {
          setRows(response.content, response.total);
        },
        (error) => fail(error)
      );
    },
    [sendRequest, params]
  );
  return (
    <>
      <DeleteConfirmModal />

      <div className="py-16 px-12">
        <Grid<UserTransaction>
          colDefs={colDefs}
          onRemoveRow={onRemoveUserTransactions}
          getData={fetchTickets}
          rowActions={{ remove: true }}
        />
      </div>
    </>
  );
};

export default UserTransactions;
