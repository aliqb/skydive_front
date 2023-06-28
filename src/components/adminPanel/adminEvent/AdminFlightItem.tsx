import { useState } from "react";
import { AdminFlightModel } from "../../../models/skyDiveEvents.models";

interface AdminFlightItemProps extends AdminFlightModel {
  withHeader?: boolean;
}

const AdminFlightItem: React.FC<AdminFlightItemProps> = ({
  withHeader = false,
  ...flight
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const chevronLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );

  const chevronDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
  return (
    <div className="mb-2 text-slate-700">
      <div>
        {withHeader && (
          <div className="flex font-semibold">
            <div className="w-10 min-w-[1.5rem]"></div>
            <p className="px-5 py-3 w-60 ">شماره پرواز</p>
            <p className="px-5 py-3 w-60 ">ظرفیت</p>
            <p className="px-5 py-3 w-40 ">غیر قابل رزرو</p>
          </div>
        )}
        <div className={`flex cursor-pointer group `}>
          <button
            onClick={() => setIsActive((prev) => !prev)}
            className={`${isActive && '!bg-gray-200'} w-10 flex items-center justify-end  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {isActive ? chevronDown : chevronLeft}
          </button>
          <p
            className={`${isActive && '!bg-gray-200'} px-5 py-3 w-60  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.flightNumber}
          </p>
          <p
            className={`${isActive && '!bg-gray-200'} px-5 py-3 w-60  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.capacity}
          </p>
          <p
            className={`${isActive && '!bg-gray-200'} px-5 py-3 w-40  group-hover:bg-gray-100 transition-all ease-linear duration-75`}
          >
            {flight.voidableQty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminFlightItem;
