import { useState } from "react";
import {
  AdminFlightModel,
  AdminTicketModel,
} from "../../../models/skyDiveEvents.models";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import AdminFlightTicketsGrid from "./AdminFlightTicketsGrid";
import SDSpinner from "../../shared/Spinner";

interface AdminFlightItemProps extends AdminFlightModel {
  withHeader?: boolean;
}

const AdminFlightItem: React.FC<AdminFlightItemProps> = ({
  withHeader = false,
  ...flight
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tickets, setTickets] = useState<AdminTicketModel[]>();
  const { sendRequest: getTicketRequest, isPending: ticketsPedning } = useAPi<
    null,
    BaseResponse<AdminTicketModel[]>
  >();

  function fetchTickets(flightId: string) {
    getTicketRequest(
      {
        url: `/SkyDiveEvents/Tickets/${flightId}`,
        params: {
          pageIndex: 1,
          pageSize: 1000,
        },
      },
      (response) => {
        setTickets(response.content);
      }
    );
  }

  function activate() {
    setIsActive(true);
    if (!tickets) {
      fetchTickets(flight.id);
    }
  }

  function deactivate() {
    setIsActive(false);
  }

  const activateButton = (
    <button
      onClick={activate}
      className=" w-10 flex items-center justify-end  group-hover:bg-gray-100 transition-all ease-linear duration-75"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );

  const deActivateButton = (
    <button
      onClick={deactivate}
      className="!bg-gray-200 w-10 flex items-center justify-end  group-hover:bg-gray-100 transition-all ease-linear duration-75"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
  return (
    <div className="mb-2 ">
      <div className="text-slate-700">
        {withHeader && (
          <div className="flex font-semibold">
            <div className="w-10 min-w-[1.5rem]"></div>
            <p className="px-5 py-3 w-60 ">شماره پرواز</p>
            <p className="px-5 py-3 w-60 ">ظرفیت</p>
            <p className="px-5 py-3 w-40 ">غیر قابل رزرو</p>
          </div>
        )}
        <div className={`flex cursor-pointer group `}>
          {isActive ? deActivateButton : activateButton}
          <p
            className={`${
              isActive && "!bg-gray-200"
            } px-5 py-3 w-60  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.flightNumber}
          </p>
          <p
            className={`${
              isActive && "!bg-gray-200"
            } px-5 py-3 w-60  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.capacity}
          </p>
          <p
            className={`${
              isActive && "!bg-gray-200"
            } px-5 py-3 w-40  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.voidableQty}
          </p>
        </div>
      </div>
      {isActive && (
        <div>
          {ticketsPedning && (
            <div className="flex  mt-8 mr-28">
              <SDSpinner color="blue" size={28} />
            </div>
          )}
          {tickets && !ticketsPedning && (
            <div className="p-5">
              <AdminFlightTicketsGrid
                tickets={tickets}
                onChange={() => fetchTickets(flight.id)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFlightItem;
