import { NavLink, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import SkyDiveEventList from "../../../components/skyDiveEvents/SkyDiveEventList";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventStatus } from "../../../models/skyDiveEvents.models";
import { useEffect } from "react";

export const SkyDiveEventsPage: React.FC = () => {
  const params = useParams();
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus>
  >();
  useEffect(() => {
    sendRequest({
      url: "/SkyDiveEventStatuses",
      params: {
        pageSize: 1000,
        pageIndex: 1,
      },
    });
  }, []);
  return (
    <SDCard className="!px-0">
      <nav className="flex border-b border-gray-200">
        <ul className="flex w-full">
          <li className="flex-grow text-center">
            <NavLink
              className={`${
                !params.id && "border-b-2 !border-primary-500 !text-primary-500"
              } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
              to={"/events/"}
            >
              test
            </NavLink>
          </li>
          <li className="flex-grow text-center">
            <NavLink
              className={(nav) =>
                `${
                  nav.isActive &&
                  "border-b-2 !border-primary-500 !text-primary-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`
              }
              to={"/events/5"}
            >
              test
            </NavLink>
          </li>
        </ul>
      </nav>
      <SkyDiveEventList id={params.id || ""} />
    </SDCard>
  );
};

export default SkyDiveEventsPage;
