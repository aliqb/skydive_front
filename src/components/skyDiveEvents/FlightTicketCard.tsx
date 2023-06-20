import { Ticket } from "../../models/skyDiveEvents.models";
import NumberWithSeperator from "../shared/NumberWithSeperator";
import PlusMinus from "../shared/PlusMinus";

interface FlightTicketCardProps extends Ticket {
  className?: string;
}

const FlightTicketCard: React.FC<FlightTicketCardProps> = (props) => {
  function onIncrease(value: number) {
    console.log(value);
  }

  function onDecrease(value: number) {
    console.log(value);
  }

  return (
    <div
      className={`${
        props.className || ""
      } flex flex-col justify-center items-center  font-semibold w-full py-8 text-lg`}
    >
      <p className="mb-1 text-slate-600">بلیت‌ {props.ticketType}</p>
      <p className="mb-5 text-slate-600">مبلغ <NumberWithSeperator value={props.amount} /> ریال</p>
      <p className="mb-6 text-green-500">بلیت‌های موجود : {props.qty}</p>
      <PlusMinus onIncrease={onIncrease} onDecrease={onDecrease} />
    </div>
  );
};

export default FlightTicketCard;
