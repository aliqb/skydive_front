import { useCallback, useEffect, useState } from "react";
import SDCard from "../../components/shared/Card";
import useAPi from "../../hooks/useApi";
import { MyTicket } from "../../models/myTickets.models";
import { BaseResponse } from "../../models/shared.models";
import { ColDef } from "../../components/shared/Grid/grid.types";
import SDSpinner from "../../components/shared/Spinner";
import Grid from "../../components/shared/Grid/Grid";
import { Link } from "react-router-dom";
import PdfPrintButton from "../../components/shared/PdfPrintButton";

const MyTicketsPage: React.FC = () => {
  const {
    sendRequest,
    isPending,
    data: myTicketsResponse,
  } = useAPi<null, BaseResponse<MyTicket[]>>();

  const [colDefs] = useState<ColDef<MyTicket>[]>([
    {
      field: "ticketNumber",
      headerName: "شماره بلیت",
    },
    {
      field: "date",
      headerName: "تاریخ رویداد",
    },
    {
      field: "flightNumber",
      headerName: "شماره پرواز",
    },
    {
      field: "eventLocation",
      headerName: "محل رویداد",
    },
    {
      field: "ticketType",
      headerName: "نوع بلیت",
    },
    {
      field: "",
      headerName: "قوانین و شرایط",
      cellRenderer: (item: MyTicket) => {
        return (
          <Link
            to={`/events/${item.skyDiveEventId}/terms`}
            target="_blank"
            className="text-cyan-600"
          >
            مشاهده
          </Link>
        );
      },
    },
    {
      field: "",
      headerName: "تصویر بلیت",
      cellRenderer: (item: MyTicket) => {
        return (
          <PdfPrintButton
            pdfUrl={`${
              import.meta.env.VITE_BASE_API_URL
            }/Reservations/PrintTicket/${item.id}`}
            fileName={`بلیت ${item.ticketNumber}`}
          />
        );
      },
      //   template: "چاپ",
      //   onClick: (item: MyTicket) => {
      //     console.log(item);
      //   },
    },
  ]);

  const fetchTickets = useCallback(() => {
    sendRequest({
      url: "/reservations/myTickets",
      params: {
        pageSize: 10000,
        pageIndex: 1,
      },
    });
  }, [sendRequest]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <SDCard>
      <h1 className="text-center font-bold text-xl py-5">بلیت‌های من</h1>
      <div className="py-5 md:px-8">
        {isPending && (
          <div className="flex justify-center mt-8">
            <SDSpinner size={28} />
          </div>
        )}
        {myTicketsResponse?.content && !isPending && (
          <Grid<MyTicket>
            colDefs={colDefs}
            data={myTicketsResponse.content}
            rowActions={{
              edit: false,
              remove: false,
              otherActions: [
                {
                  icon: (
                    <div className="text-red-600 font-semibold">
                      درخواست کنسل
                    </div>
                  ),
                  onClick: (item: MyTicket) => console.log(item),
                  descriptions: "",
                  showField: "voidable",
                },
              ],
            }}
          />
        )}
      </div>
    </SDCard>
  );
};

export default MyTicketsPage;
