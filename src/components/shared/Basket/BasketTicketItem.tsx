import { AggregatedTicket } from "../../../models/shared.models";
import NumberWithSeperator from "../NumberWithSeperator";
import AddOrRemoveTicket from "./AddorRemoveTicket";
interface BasketTicketItemProps extends AggregatedTicket {
  canEdit?: boolean;
}
const BasketTicketItem: React.FC<BasketTicketItemProps> = ({
  canEdit = true,...ticket
}) => {
  return (
    <div className="flex justify-between border-b border-gray-200 py-4 items-center text-center">
      <div>
        <p className="mb-5">شماره پرواز: {ticket.flightNumber}</p>
        <p>
          <NumberWithSeperator value={ticket.amount} />
          <span className="mr-1">ریال</span>
        </p>
      </div>
      <div>
        <p className="mb-5">بلیت {ticket.type}</p>
        {canEdit ? (
          <AddOrRemoveTicket
            aggretadTicket={ticket}
          />
        ) : (
          <span className="text-lg">0</span>
        )}
      </div>
    </div>
  );
};
export default BasketTicketItem;
