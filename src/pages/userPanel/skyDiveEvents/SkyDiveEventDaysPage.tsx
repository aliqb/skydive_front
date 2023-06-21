import { useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import SkyDiveEventDayItem from "../../../components/skyDiveEvents/SkyDiveEventDayItem";
import { useEffect } from "react";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import {
  SkyDiveEvent,
  SkyDiveEventDay,
} from "../../../models/skyDiveEvents.models";
import SDSpinner from "../../../components/shared/Spinner";

const SkyDiveEventDaysPage: React.FC = () => {
  const params = useParams();
  const {
    sendRequest: requestDetail,
    data: event,
    isPending: detailPending,
  } = useAPi<null, BaseResponse<SkyDiveEvent>>();
  const {
    sendRequest: requestDays,
    data: days,
    isPending: daysPending,
  } = useAPi<null, BaseResponse<SkyDiveEventDay[]>>();

  useEffect(() => {
    function getEvnetDetail(eventId: string) {
      requestDetail({
        url: `/SkyDiveEvents/${eventId}`,
      });
    }

    function getDays(eventId: string) {
      requestDays({
        url: `/SkyDiveEvents/EventDays/${eventId}`,
      });
    }

    const id = params.eventId;
    if (id) {
      getEvnetDetail(id);
      getDays(id);
    }
  }, [params, requestDays, requestDetail]);

  const mainBody = (
    <>
      <header className="flex flex-col items-center gap-3 mb-5">
        <h2 className="text-center font-bold text-lg">
          {event?.content.title}
        </h2>
        <div className="flex justify-between text-slate-600 gap-8">
          <p>{event?.content.duration}</p>
          <p>{event?.content.capacity} ظرفیت خالی</p>
        </div>
        <a className="text-blue-700 font-semibold">قوانین و شرایط</a>
      </header>
      <main className="w-full flex flex-wrap">
        {days &&
          days.content
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((item, index) => {
              return (
                <div key={index} className=" my-3 px-3 w-full md:w-1/2">
                  <SkyDiveEventDayItem  {...item} />
                </div>
              );
            })}
      </main>
    </>
  );

  return (
    <SDCard>
      {detailPending || daysPending ? (
        <div className="flex justify-center py-24">
          <SDSpinner size={28} />
        </div>
      ) : (
        mainBody
      )}
    </SDCard>
  );
};
export default SkyDiveEventDaysPage;
