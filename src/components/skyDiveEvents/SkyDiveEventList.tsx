import SkyDiveEventCard from "./SkyDiveEventCard";

interface SkyDiveEventListProps {
  id: string;
}

const SkyDiveEventList: React.FC<SkyDiveEventListProps> = () => {
  return (
    <div className="p-6 flex flex-wrap">
      <div className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SkyDiveEventCard />
      </div>

      <div className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SkyDiveEventCard />
      </div>
      <div className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SkyDiveEventCard />
      </div>
      <div className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SkyDiveEventCard />
      </div>
    </div >
  );
};

export default SkyDiveEventList;
