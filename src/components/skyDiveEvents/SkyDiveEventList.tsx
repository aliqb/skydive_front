import { useEffect } from "react";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { SkyDiveEvent } from "../../models/skyDiveEvents.models";
import SkyDiveEventCard from "./SkyDiveEventCard";
import SDSpinner from "../shared/Spinner";
import ReactPaginate from "react-paginate";

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
  }, [props.id, sendRequest]);

  if (isPending) {
    return (
      <div className="flex justify-center py-24">
        <SDSpinner size={28} />
      </div>
    );
  }

  const handlePageClick = (event: { selected: number }) => {
    console.log(event);
  };

  return (
    data && (
      <div>
        <div className="p-6 flex flex-wrap ">
          {data.content.map((item, index) => (
            <div
              key={index}
              className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <SkyDiveEventCard {...item} />
            </div>
          ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={20}
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex gap-5 border justify-center"
          nextClassName="flex items-center"
          previousClassName="flex items-center"
          pageLinkClassName="p-1 block hover:text-primary-400"
          breakClassName="p-1 block hover:text-primary-400"
          activeClassName="text-primary-500"
          pageClassName="text-base "
        />
      </div>
    )
  );
};

export default SkyDiveEventList;
