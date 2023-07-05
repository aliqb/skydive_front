import { useCallback, useState } from 'react';
import SDCard from '../../components/shared/Card';
import useAPi from '../../hooks/useApi';

import { BaseResponse } from '../../models/shared.models';
import { ColDef, GridGetData } from '../../components/shared/Grid/grid.types';
import Grid from '../../components/shared/Grid/Grid';
import PdfPrintButton from '../../components/shared/PdfPrintButton';
import { MyTransactions } from '../../models/myTransactions';

const MyTransactionsPage: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<MyTransactions[]>>();

  const [colDefs] = useState<ColDef<MyTransactions>[]>([
    {
      field: 'date',
      headerName: 'تاریخ پرداخت',
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
      cellRenderer: (item: MyTransactions) => {
        const displayText = item.type === 'Confirmed' ? 'تائید' : 'ابطال';
        return <span>{displayText}</span>;
      },
    },
    {
      field: 'invoiceNumber',
      headerName: 'شماره فاکتور',
    },
    {
      field: '',
      headerName: 'فاکتور',
      cellRenderer: (item: MyTransactions) => {
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

  const fetchTickets = useCallback<GridGetData<MyTransactions>>(
    (gridParams, setRows) => {
      sendRequest(
        {
          url: '/transactions',
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
          },
        },
        (response) => {
          setRows(response.content, response.total);
        }
      );
    },
    [sendRequest]
  );

  return (
    <SDCard>
      <h1 className="text-center font-bold text-xl py-5">تراکنش های من</h1>
      <div className="py-5 md:px-8">
        <Grid<MyTransactions>
          colDefs={colDefs}
          getData={fetchTickets}
          rowActions={null}
        />
      </div>
    </SDCard>
  );
};

export default MyTransactionsPage;
