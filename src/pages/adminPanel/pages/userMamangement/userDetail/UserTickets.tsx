import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ColDef,
  GridGetData,
} from "../../../../../components/shared/Grid/grid.types";
import PdfPrintButton from "../../../../../components/shared/PdfPrintButton";
import useAPi from "../../../../../hooks/useApi";
import {
  TicketStatuses,
  TicketStatusesPersianMap,
  UserTicket,
} from "../../../../../models/myTickets.models";
import { BaseResponse } from "../../../../../models/shared.models";
import Grid from "../../../../../components/shared/Grid/Grid";

const UserTickets: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<UserTicket[]>>();
  const params = useParams();
  const [selectedStatuces, setSelectedStatuces] = useState<
    (typeof TicketStatuses)[keyof typeof TicketStatuses][]
  >([]);
  const [colDefs] = useState<ColDef<UserTicket>[]>([
    {
      field: "skyDiveEventNumber",
      headerName: "شماره رویداد",
    },
    {
      field: "eventLocation",
      headerName: "محل رویداد",
    },
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
      field: "ticketType",
      headerName: "نوع بلیت",
    },
    {
      field: "ticketStatusDisplay",
      headerName: "وضعیت",
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

  const fetchTickets = useCallback<GridGetData<UserTicket>>(
    (gridParams, setRows) => {
      sendRequest(
        {
          url: `/Reservations/UserTickets/${params.userId}`,
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
            statuses: selectedStatuces.join('|')
          },
        },
        (response) => {
          setRows(response.content, response.total);
        }
      );
    },
    [sendRequest, params,selectedStatuces]
  );

  const onChangeSelectedStatuces: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedStatuces((prev) => {
        const statuces = [...prev];
        statuces.push(value);
        return statuces;
      });
    } else {
      setSelectedStatuces((prev) => {
        return prev.filter((item) => item !== value);
      });
    }
  };

  return (
    <div className="py-16 px-12">
      <div className="flex gap-8 mb-1">
        {Array.from(TicketStatusesPersianMap.entries()).map(([key, value]) => {
          return (
            <div key={key} className="flex items-center mb-4">
              <input
                id={key}
                type="checkbox"
                value={key}
                onChange={onChangeSelectedStatuces}
                className="ml-2 w-5 h-5 text-cyan-500 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={key}
                className="ml-2  font-medium text-slate-600 dark:text-gray-300"
              >
                {value}
              </label>
            </div>
          );
        })}
      </div>
      <Grid<UserTicket>
        colDefs={colDefs}
        getData={fetchTickets}
        rowActions={{
          edit: false,
          remove: false,
          //   otherActions: [
          //     {
          //       icon: (
          //         <div className="text-red-600 font-semibold">درخواست کنسل</div>
          //       ),
          //       onClick: (item: UserTicket) => console.log(item),
          //       descriptions: "",
          //       showField: "voidable",
          //     },
          //   ],
        }}
      />
    </div>
  );
};

export default UserTickets;
