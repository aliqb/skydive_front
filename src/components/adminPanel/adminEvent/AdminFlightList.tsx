import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { AdminFlightOfDay } from "../../../models/skyDiveEvents.models";
import SDButton from "../../shared/Button";
import SDSpinner from "../../shared/Spinner";
import AddFlightModal from "./AddFlightModal";
import AdminFlightItem from "./AdminFlightItem";
import { useCallback, useEffect, useState } from "react";
import EditTicketModal from "./EditTicketModal";

// const temp = {
//   message: "بلیت های رویداد",
//   content: {
//     date: "1402/04/02",
//     flights: [
//       {
//         flightNumber: 1,
//         capacity: 34,
//         voidableQty: 1,
//         id: "7173de74-1036-45cb-99fa-82823826cfc0",
//         createdAt: "1402/03/30",
//         updatedAt: "1402/03/30",
//       },
//     ],
//     id: "d3f0c0d0-e15f-421c-a864-1b8df41dd0e5",
//     createdAt: "1402/03/28",
//     updatedAt: "1402/03/28",
//   },
//   total: 1,
// };

const AdminFlighList: React.FC<{ dayId: string; date: string }> = ({
  dayId,
  date,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  // const [temp, setTemp] = useState<boolean>(false);

  const {
    sendRequest,
    isPending,
    data: flightsResponse,
  } = useAPi<null, BaseResponse<AdminFlightOfDay>>();

  const fetchFlights = useCallback(
    (dayId: string) => {
      sendRequest({
        url: `/SkyDiveEvents/EventDayFlights/${dayId}`,
      });
    },
    [sendRequest]
  );

  function startAddFlight() {
    setShowAddModal(true);
  }

  function onCloseAddModa() {
    setShowAddModal(false);
  }

  useEffect(() => {
    fetchFlights(dayId);
  }, [dayId, fetchFlights]);
  return (
    <>
    {/* <button onClick={()=>setTemp(true)}>temp</button> */}
      {/* <EditTicketModal showModal={temp} onCloseModal={() => setTemp(false)} /> */}

      {showAddModal && (
        <AddFlightModal
          showModal={showAddModal}
          dayId={dayId}
          date={date}
          onCloseModal={onCloseAddModa}
        />
      )}
      <div className="min-h-[300px]">
        {isPending && (
          <div className="flex justify-center mt-8">
            <SDSpinner color="blue" size={28} />
          </div>
        )}
        {flightsResponse?.content && !isPending && (
          <>
            <div className="flex gap-2 ">
              <SDButton
                color="success"
                className="px-8"
                onClick={startAddFlight}
              >
                افزودن
              </SDButton>
              <SDButton color="failure" className="px-8">
                حذف
              </SDButton>
            </div>
            <div className="mt-8">
              {flightsResponse.content.flights.length ? (
                flightsResponse.content.flights.map((item, index) => {
                  return (
                    <AdminFlightItem
                      key={index}
                      withHeader={index === 0}
                      {...item}
                    />
                  );
                })
              ) : (
                <div className="mt-12 mr-5 text-slate-700">
                  هیچ پروازی ثبت نشده است.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminFlighList;
