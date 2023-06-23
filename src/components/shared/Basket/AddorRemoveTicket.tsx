import { useState } from "react";
import AddTicketModal from "./AddTicketModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addTicketToBasket } from "../../../store/basket";
import {
  AddingTicketItem,
  AggregatedTicket,
} from "../../../models/shared.models";
import SDSpinner from "../Spinner";
interface PlusMinusProps {
  aggretadTicket: AggregatedTicket;
}

const AddOrRemoveTicket: React.FC<PlusMinusProps> = ({ aggretadTicket }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const changingTicket = useAppSelector((state) => state.basket.changingTicket);

  function increase() {
    setIsAdding(true);
  }

  function decrease() {
    console.log();
  }

  function onSubmitAdd(userCode: string) {
    const ticket: AddingTicketItem = {
      flightLoadId: aggretadTicket.flightLoadId,
      ticketTypeId: aggretadTicket.ticketTypeId,
      userCode: userCode || null,
    };
    dispatch(addTicketToBasket(ticket));
    console.log(userCode);
  }

  return (
    <>
      <AddTicketModal
        show={isAdding}
        onClose={() => setIsAdding(false)}
        onSubmit={onSubmitAdd}
      ></AddTicketModal>
      <div className="flex gap-6 items-center">
        <button
          onClick={decrease}
          className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-pink-500 flex justify-center items-center"
        >
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
              d="M19.5 12h-15"
            />
          </svg>
        </button>
        <div className="text-lg">
          {/* <SDSpinner size={10}></SDSpinner> */}
          {changingTicket &&
          changingTicket.flightLoadId === aggretadTicket.flightLoadId &&
          changingTicket.ticketTypeId === aggretadTicket.ticketTypeId ? (
            <SDSpinner size={10}></SDSpinner>
          ) : (
            aggretadTicket?.ticketMembers?.length || 0
          )}
        </div>
        <button
          onClick={increase}
          className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-white bg-pink-500 flex justify-center items-center"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default AddOrRemoveTicket;
