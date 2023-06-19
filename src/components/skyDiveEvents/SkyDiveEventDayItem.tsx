const SkyDiveEventDayItem: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-between items-center border-gray-300 shadow-sm border rounded-lg w-full  py-3 px-6 ">
      <p className="w-full text-center my-3 xs:w-auto font-semibold">
        1400/01/01
      </p>
      <p className="w-full text-center my-3 xs:w-auto text-slate-600">
        6 پرواز
      </p>
      <p className="w-full text-center my-3 xs:w-auto text-slate-600">
        11 ظرفیت خالی
      </p>
      <p className="w-full text-center my-3 xs:w-auto text-green-500">
        بلیت‌های شما : 0
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="hidden w-full xs:w-auto xs:block  h-6 stroke-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className=" w-full xs:w-auto xs:hidden  h-6 stroke-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default SkyDiveEventDayItem;
