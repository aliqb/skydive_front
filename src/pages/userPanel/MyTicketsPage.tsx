import { useCallback, useState } from "react";
import SDCard from "../../components/shared/Card";
import useAPi from "../../hooks/useApi";
import { UserTicket } from "../../models/tickets.models";
import { BaseResponse } from "../../models/shared.models";
import { ColDef, GridGetData } from "../../components/shared/Grid/grid.types";
import Grid from "../../components/shared/Grid/Grid";
import { Link } from "react-router-dom";
import PdfPrintButton from "../../components/shared/PdfPrintButton";
import { toast } from "react-toastify";

const MyTicketsPage: React.FC = () => {
  const {
    sendRequest,
  } = useAPi<null, BaseResponse<UserTicket[]>>();

  const [colDefs] = useState<ColDef<UserTicket>[]>([
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
      cellRenderer: (item: UserTicket) => {
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
      cellRenderer: (item: UserTicket) => {
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

  const {
    sendRequest: sendCancelRequest,
  } = useAPi<null, BaseResponse<null>>();

  const fetchTickets = useCallback<GridGetData<UserTicket>>(
    (gridParams, setRows) => {
      sendRequest(
        {
          url: "/reservations/myTickets",
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

  function onCancelTicket(ticket: UserTicket){
    sendCancelRequest({
      url: `/Reservations/CancellingTicketRequest/${ticket.id}`,
      method: 'put'
    },(reponse)=>{
      toast.success(reponse.message)
    },(error)=>{
      toast.error(error?.message)
    })
  }

  return (
    <SDCard>
      <h1 className="text-center font-bold text-xl py-5">بلیت‌های من</h1>
      <div className="py-5 md:px-8">
        <Grid<UserTicket>
          colDefs={colDefs}
          getData={fetchTickets}
          rowActions={{
            edit: false,
            remove: false,
            otherActions: [
              {
                icon: (
                  <div className="text-red-600 font-semibold">درخواست کنسل</div>
                ),
                onClick: onCancelTicket,
                descriptions: "",
                showField: "voidable",
              },
            ],
          }}
        />
      </div>
    </SDCard>
  );
};

export default MyTicketsPage;
