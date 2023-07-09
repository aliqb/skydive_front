import { useState, useCallback } from "react";
import {
  ColDef,
  GridGetData,
} from "../../../../../components/shared/Grid/grid.types";
import PdfPrintButton from "../../../../../components/shared/PdfPrintButton";
import useAPi from "../../../../../hooks/useApi";
import { BaseResponse } from "../../../../../models/shared.models";
import { UserTransaction } from "../../../../../models/transactions.models";
import Grid from "../../../../../components/shared/Grid/Grid";
import { useParams } from "react-router-dom";

const UserTransactions: React.FC = () => {
  const params = useParams();
  const { sendRequest } = useAPi<null, BaseResponse<UserTransaction[]>>();

  const [colDefs] = useState<ColDef<UserTransaction>[]>([
    {
      field: "date",
      headerName: "تاریخ پرداخت",
    },
    {
      field: "ticketNumber",
      headerName: "شماره بلیت",
    },
    {
      field: "eventName",
      headerName: "نام رویداد",
    },
    {
      field: "paymentInformation",
      headerName: "اطلاعات پرداخت",
    },
    {
      field: "amount",
      headerName: "مبلغ",
    },
    {
      field: "type",
      headerName: "نوع",
      cellRenderer: (item: UserTransaction) => {
        const displayText = item.type === "Confirmed" ? "تائید" : "ابطال";
        return <span>{displayText}</span>;
      },
    },
    {
      field: "invoiceNumber",
      headerName: "شماره فاکتور",
    },
    {
      field: "",
      headerName: "فاکتور",
      cellRenderer: (item: UserTransaction) => {
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

  const fetchTickets = useCallback<GridGetData<UserTransaction>>(
    (gridParams, setRows) => {
      sendRequest(
        {
          url: `/transactions/GetUserTransactions/${params.userId}`,
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex
          },
        },
        (response) => {
          setRows(response.content, response.total);
        }
      );
    },
    [sendRequest,params]
  );
  return (
    <div className="py-16 px-12">
      <Grid<UserTransaction>
        colDefs={colDefs}
        getData={fetchTickets}
        rowActions={null}
      />
    </div>
  );
};

export default UserTransactions;
