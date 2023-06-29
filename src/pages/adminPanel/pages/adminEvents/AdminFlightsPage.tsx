import { useParams } from "react-router-dom";
import SDCard from "../../../../components/shared/Card";
import { useEffect, useState } from "react";
import useAPi from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared.models";
import {
  SkyDiveEvent,
  SkyDiveInlineEventDay,
} from "../../../../models/skyDiveEvents.models";
import AdminEventField from "../../../../components/adminPanel/adminEvent/AdminEventField";
import SDSpinner from "../../../../components/shared/Spinner";
import AdminFlighList from "../../../../components/adminPanel/adminEvent/AdminFlightList";
const temp: BaseResponse<SkyDiveEvent> = {
  message: "اطلاعات رویداد.",
  content: {
    code: "003",
    title: "رویداد زیبا کنار",
    location: "زیا کنار",
    image: "8bdf841c-55fd-4b01-8eee-7a3a086c5278",
    startDate: "1402/05/01",
    endDate: "1402/05/02",
    capacity: 0,
    subjecToVAT: true,
    isActive: false,
    voidable: true,
    termsAndConditions: "",
    statusTitle: "آماده رزرو",
    duration: "1 مرداد تا 2 مرداد",
    days: [
      {
        date: "1402/4/2",
        id: "d31c45e5-15bd-42d3-b359-9fbd6ea3e7fb",
      },
      {
        date: "1402/4/3",
        id: "47575ec5-d297-4959-99de-c7268abe4933",
      },
      {
        date: "1402/4/1",
        id: "b363c239-c79c-43a4-851d-ef6cbe5d6cab",
      },
    ],
    id: "9e36ea89-2c91-48ae-aacd-2a8dae9960fc",
    createdAt: "1402/03/28",
    updatedAt: "1402/03/28",
  },
  total: 0,
};
const AdminFlightsPage: React.FC = () => {
  const params = useParams();
  const { sendRequest: requestDetail, isPending: detailPending } = useAPi<
    null,
    BaseResponse<SkyDiveEvent>
  >();

  const [skyDiveEvent, setSkyDiveEvent] = useState<SkyDiveEvent>();
  const [days, setDays] = useState<SkyDiveInlineEventDay[]>();
  const [currentDay, setCurrentDay] = useState<SkyDiveInlineEventDay>();

  useEffect(() => {
    function getEvnetDetail(eventId: string) {
      // //////////temp
      // setSkyDiveEvent(temp.content);
      // const sortedDays = temp.content.days.sort((a, b) =>
      //   a.date.localeCompare(b.date)
      // );
      // setDays(sortedDays);
      // setCurrentDay(sortedDays[0]);
      // //////////temp
        requestDetail(
          {
            url: `/SkyDiveEvents/${eventId}`,
          },
          (response) => {
            setSkyDiveEvent(response.content);
            const sortedDays = response.content.days.sort((a, b) =>
              a.date.localeCompare(b.date)
            );
            setDays(sortedDays);
            setCurrentDay(sortedDays[0]);
          }
        );
    }
    getEvnetDetail(params.eventId as string);
  }, [params, requestDetail]);

  function changeCurrentDay(day: SkyDiveInlineEventDay) {
    setCurrentDay(day);
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
                <AdminEventField title="کد" value={skyDiveEvent.code} />
                <AdminEventField title="نام" value={skyDiveEvent.title} />
                <AdminEventField title="شروع" value={skyDiveEvent.startDate} />
                <AdminEventField title="پایان" value={skyDiveEvent.endDate} />
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
                          currentDay?.id === item.id &&
                          "border-b-2 !border-blue-500 !text-blue-500"
                        } cursor-pointer pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                        onClick={() => changeCurrentDay(item)}
                      >
                        {item.date}
                      </a>
                    </li>
                  );
                })}
          </ul>
        </nav>
      </header>
      <main className="p-6">
        {currentDay && <AdminFlighList dayId={currentDay.id} date={currentDay.date} />}
        
      </main>
    </SDCard>
  );
};

export default AdminFlightsPage;
