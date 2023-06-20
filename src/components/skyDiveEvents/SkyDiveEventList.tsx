import { useEffect } from "react";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { SkyDiveEvent } from "../../models/skyDiveEvents.models";
import SkyDiveEventCard from "./SkyDiveEventCard";
import SDSpinner from "../shared/Spinner";

interface SkyDiveEventListProps {
  id: string;
}

const SkyDiveEventList: React.FC<SkyDiveEventListProps> = (props) => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<SkyDiveEvent[]>
  >();

  useEffect(() => {
    sendRequest({
      url: "/SkyDiveEvents",
      params: {
        statusId: props.id,
        pageIndex: 1,
        pageSize: 100000,
      },
    });
  }, [props.id,sendRequest]);

  if (isPending) {
    return (
      <div className="flex justify-center py-24">
        <SDSpinner size={28} />
      </div>
    );
  }

  return (
    data && (
      <div className="p-6 flex flex-wrap ">
        {data.content.map((item, index) => (
          <div key={index} className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <SkyDiveEventCard {...item} />
          </div>
        ))}
      </div>
    )
  );
};

export default SkyDiveEventList;
