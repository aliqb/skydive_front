import { NavLink, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import FlightItem from "../../../components/skyDiveEvents/FlightItem";

const SkyDiveEventFlightsPage: React.FC = () => {
  const params = useParams();
  return (
    <SDCard className="px-0 pt-0">
      <header className="flex flex-col items-center sticky top-0 bg-white pt-5">
        <h2 className="text-center font-bold text-lg">رویداد زیبا کنار</h2>
        <nav className="mt-8 flex border-b-2  border-gray-200 w-full">
          <ul className="flex w-full overflow-auto horizental-scrol">
            <li className="flex-grow text-center min-w-[100px]">
              <NavLink
                className={`${
                  !params.id &&
                  "border-b-2 !border-primary-500 !text-primary-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                to={""}
              >
                1400/01/02
              </NavLink>
            </li>
            <li className="flex-grow text-center min-w-[100px]">
              <NavLink
                className={`${
                  !params.id &&
                  "border-b-2 !border-primary-500 !text-primary-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                to={""}
              >
                1400/01/02
              </NavLink>
            </li>
            <li className="flex-grow text-center min-w-[100px]">
              <NavLink
                className={`${
                  !params.id &&
                  "border-b-2 !border-primary-500 !text-primary-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                to={""}
              >
                1400/01/02
              </NavLink>
            </li>
            {/* {data.content.map((status, index) => (
            <li key={index} className="flex-grow text-center">
              <NavLink
                className={(nav) =>
                  `${
                    nav.isActive &&
                    "border-b-2 !border-primary-500 !text-primary-500"
                  } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`
                }
                to={`/events/${status.id}`}
              >
                {status.title}
              </NavLink>
            </li>
          ))} */}
          </ul>
        </nav>
      </header>
      <div className="px-8 pt-8">
        <p className="text-green-500 font-semibold mb-6 text-lg">
          بلیت‌های موجود 1 خرداد : 11
        </p>
        <FlightItem />
        <FlightItem />
        <FlightItem />

        <FlightItem />
      </div>
    </SDCard>
  );
};

export default SkyDiveEventFlightsPage;
