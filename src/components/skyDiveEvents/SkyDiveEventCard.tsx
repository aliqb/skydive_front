import { Link } from "react-router-dom";
import SDCard from "../shared/Card";
import { SkyDiveEvent } from "../../models/skyDiveEvents.models";

const SkyDiveEventCard: React.FC<SkyDiveEvent> = (props) => {
  // const notReservable = 
  return (
    <Link
      to={`/events/${props.id}/days`}
      className={!props.reservable ? 'pointer-events-none' : ''}
    >
      <SDCard className="!p-0 border-gray-200 border ">
        <div className="w-full aspect-[2] relative">
          <img
            src={`${import.meta.env.VITE_BASE_API_URL}/file/${props.image}`}
            alt={props.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <span className="absolute bottom-2 left-2 bg-primary-100 shadow px-3 py-0.5 rounded-xl text-sm">
            {props.statusTitle}
          </span>
        </div>
        <div className={`${!props.reservable ? 'opacity-70': ''} py-4 px-4`}>
          <p className="font-bold text-lg">{props.title}</p>
          <div className="flex justify-between mt-2 text-slate-600 flex-wrap">
            <p className="my-1">{props.duration}</p>
            <p className="my-1">{props.capacity} ظرفیت خالی</p>
          </div>
        </div>
      </SDCard>
    </Link>
  );
};

export default SkyDiveEventCard;
