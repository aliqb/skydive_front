import FlightTicketCard from "./FlightTicketCard";

export const FlightItem: React.FC = () => {
  return (
    <div className={`border-b border-gray-400 pb-5 mb-12 last:border-none`}>
      <h2 className="text-center font-semibold text-2xl ">شماره پرواز : 1</h2>
      <div className="flex flex-wrap">
        <FlightTicketCard className="xs:w-1/2 lg:w-1/3" />
        <FlightTicketCard className="xs:w-1/2 lg:w-1/3" />

        <FlightTicketCard className="xs:w-1/2 lg:w-1/3" />

        <FlightTicketCard className="xs:w-1/2 lg:w-1/3" />

      </div>
    </div>
  );
};

export default FlightItem;
