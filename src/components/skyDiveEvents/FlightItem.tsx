import { AdminFlightModel } from "../../models/skyDiveEvents.models";
import FlightTicketCard from "./FlightTicketCard";

export const FlightItem: React.FC<AdminFlightModel> = (props) => {
  return (
    <div className={`border-b border-gray-400 pb-5 mb-12 last:border-none`}>
      <h2 className="text-center font-semibold text-2xl ">
        شماره پرواز : {props.flightNumber}
      </h2>
      <div className="flex flex-wrap">
        {props.tickets
          .sort((a, b) => a.ticketType.localeCompare(b.ticketType))
          .map((ticket, index) => (
            <FlightTicketCard {...ticket} key={index} className="xs:w-1/2 lg:w-1/3" flightLoadId={props.flightId} />
          ))}
      </div>
    </div>
  );
};

export default FlightItem;
