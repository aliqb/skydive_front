import { useLocation, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventDay } from "../../../models/skyDiveEvents.models";
import { useEffect, useState } from "react";
import FlightList from "../../../components/skyDiveEvents/FlightList";
import Basket from "../../../components/shared/Basket/Basket";
import BookButton from "../../../components/shared/Basket/‌BookButton";

const SkyDiveEventFlightsPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [currentDayId, setCurrentDayId] = useState<string>("");
  const { sendRequest: requestDays } = useAPi<
    null,
    BaseResponse<SkyDiveEventDay[]>
  >();

  const [days, setDays] = useState<SkyDiveEventDay[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [inTop, setInTop] = useState<boolean>(true);
  useEffect(() => {
    function getDays(eventId: string, currentDayId: string) {
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
          setCurrentDayId(currentDayId);
        }
      );
    }
    if (params.eventId) {
      getDays(params.eventId, location.state.dayId);
    }
  }, [params, requestDays, location]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const headerHeight = 60;
      if (scrollTop > headerHeight) {
        setInTop(false);
      }
      if (scrollTop < headerHeight) {
        setInTop(true);
      }
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

  // function setNextDay() {
  //   setCurrentDayId(prevId=>{
  //     const currentIndex = days.findIndex((item) => item.id === prevId);
  //     if (currentIndex === days.length - 1) return prevId;
  //     const nextDay = days[currentIndex + 1];
  //     return nextDay.id
  //   })
  // }

  function changeCurrentDay(dayId: string) {
    setCurrentDayId(dayId);
  }

  return (
    <div className="flex relative mt-1 px-5">
      <SDCard className="px-0 pt-0 w-full lg:w-[65vw] border border-gray-200 relative">
        <header className="flex flex-col items-center sticky top-[60px] bg-white pt-5 rounded-t-lg">
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
        <div className="px-5 fixed w-full right-0 -bottom-1 flex justify-center top-shadow py-5 bg-white lg:hidden lg:shadow-none">
          <BookButton />
        </div>
      </SDCard>
      <aside className="hidden lg:block  relative">
        <div
          className={`${
            inTop ? "top-[64px]" : "top-[64px]"
          } px-3   w-[33vw] sticky  left-0 transition-all ease-linear`}
        >
          <Basket />
        </div>
      </aside>
    </div>
  );
};

export default SkyDiveEventFlightsPage;
