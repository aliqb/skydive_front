import { NavLink, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventDay } from "../../../models/skyDiveEvents.models";
import { useEffect, useState } from "react";
import FlightList from "../../../components/skyDiveEvents/FlightList";

const SkyDiveEventFlightsPage: React.FC = () => {
  const params = useParams();
  const [currentDayId, setCurrentDayId] = useState<string>("");
  const { sendRequest: requestDays } = useAPi<
    null,
    BaseResponse<SkyDiveEventDay[]>
  >();

  const [days, setDays] = useState<SkyDiveEventDay[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  useEffect(() => {
    function getDays(eventId: string) {
      requestDays(
        {
          url: `/SkyDiveEvents/EventDays/${eventId}`,
        },
        (response) => {
          const sortedDays = response.content.sort((a, b) =>
            a.date.localeCompare(b.date)
          );
          setEventTitle(response.message);
          setDays(sortedDays);
          setCurrentDayId(sortedDays[0].id);
        }
      );
    }
    if (params.eventId) {
      getDays(params.eventId);
    }
  }, [params, requestDays]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const threshold = 50; // Adjust this value according to your needs

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      if (isNearBottom) {
        // User has scrolled near the end of the page
        // setNextDay();
        console.log("Reached near the end of the page!");
        // Perform any additional actions here
      }
    };

    // Attach the scroll event listener to the scroll container
    document.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function setNextDay() {
    setCurrentDayId(prevId=>{
      const currentIndex = days.findIndex((item) => item.id === prevId);
      if (currentIndex === days.length - 1) return prevId;
      const nextDay = days[currentIndex + 1];
      return nextDay.id
    })
  }

  function changeCurrentDay(dayId: string) {
    setCurrentDayId(dayId);
  }

  return (
    <SDCard className="px-0 pt-0">
      <header className="flex flex-col items-center sticky top-0 bg-white pt-5">
        <h2 className="text-center font-bold text-lg">{eventTitle}</h2>
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
      <div className="px-8 pt-8">
        <FlightList dayId={currentDayId} />
      </div>
    </SDCard>
  );
};

export default SkyDiveEventFlightsPage;
