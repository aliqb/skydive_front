import { useParams } from "react-router-dom";
import SDCard from "../../../../components/shared/Card";
import { useEffect, useState } from "react";
import useAPi from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared.models";
import { SkyDiveEvent, SkyDiveInlineEventDay } from "../../../../models/skyDiveEvents.models";
import AdminEventField from "../../../../components/adminPanel/adminEvent/AdminEventField";
import SDSpinner from "../../../../components/shared/Spinner";

const AdminFlightsPage: React.FC = () => {
  const params = useParams();
  const {
    sendRequest: requestDetail,
    isPending: detailPending,
  } = useAPi<null, BaseResponse<SkyDiveEvent>>();

  const [skyDiveEvent,setSkyDiveEvent] = useState<SkyDiveEvent>();
  const [days,setDays] = useState<SkyDiveInlineEventDay[]>()
  const [currentDayId,setCurrentDayId] = useState<string>();

  useEffect(() => {
    function getEvnetDetail(eventId: string) {
      requestDetail({
        url: `/SkyDiveEvents/${eventId}`,
      },(response)=>{
        setSkyDiveEvent(response.content);
        const sortedDays = response.content.days.sort((a,b)=>a.date.localeCompare(b.date));
        setDays(sortedDays);
        setCurrentDayId(sortedDays[0].id);
      });
    }
    getEvnetDetail(params.eventId as string);
  }, [params, requestDetail]);

  function changeCurrentDay(dayId: string) {
    setCurrentDayId(dayId);
  }

  return (
    <SDCard className="!p-0">
      <header className="text-slate-800">
        <div className="p-6 pb-4">
          <h2 className="text-center font-bold text-lg">پرواز‌های رویداد</h2>
          {detailPending && (
            <div className="flex justify-center my-8">
              <SDSpinner color="blue" size={28} />
            </div>
          )}
          {skyDiveEvent && !detailPending && (
            <>
              <div className="flex justify-between px-8 my-7 flex-wrap gap-6">
                <AdminEventField
                  title="کد"
                  value={skyDiveEvent.code}
                />
                <AdminEventField
                  title="نام"
                  value={skyDiveEvent.title}
                />
                <AdminEventField
                  title="شروع"
                  value={skyDiveEvent.startDate}
                />
                <AdminEventField
                  title="پایان"
                  value={skyDiveEvent.endDate}
                />
                <AdminEventField
                  title="محل رویداد"
                  value={skyDiveEvent.location}
                />
              </div>
            </>
          )}
        </div>
        <nav className="mt-8 flex border-b-2  border-gray-200 w-full">
          <ul className="flex w-full overflow-auto horizental-scrol">
            {days &&
              days
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex-grow text-center min-w-[100px]"
                    >
                      <a
                        className={`${
                          currentDayId === item.id &&
                          "border-b-2 !border-primary-500 !text-primary-500"
                        } cursor-pointer pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                        onClick={() => changeCurrentDay(item.id)}
                      >
                        {item.date}
                      </a>
                    </li>
                  );
                })}
          </ul>
        </nav>
      </header>
    </SDCard>
  );
};

export default AdminFlightsPage;
