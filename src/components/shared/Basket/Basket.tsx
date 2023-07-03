import { useAppSelector } from "../../../hooks/reduxHooks";
import useBasketTickets from "../../../hooks/useBasketTickets";
import SDButton from "../Button";
import SDCard from "../Card";
import NumberWithSeperator from "../NumberWithSeperator";
import SDSpinner from "../Spinner";
import BasketTicketItem from "./BasketTicketItem";
import BookButton from "./‌BookButton";
interface BasketProps {
  inPayment?: boolean;
  canPay?: boolean;
  onPayClick?: () => void;
}
const Basket: React.FC<BasketProps> = ({
  inPayment = false,
  canPay = true,
  onPayClick,
}) => {
  const basketState = useAppSelector((state) => state.basket);
  const { aggregatedTickets } = useBasketTickets();

  const emptyMessage = (
    <p className="text-center mt-5">سبد خرید شما خالی است.</p>
  );

  const body = (
    <>
      {basketState.basket?.items.length ? (
        <div className=" px-3">
          {aggregatedTickets
            .slice()
            .sort((a, b) => {
              return a.flightNumber - b.flightNumber;
            })
            .map((item, index) => {
              return (
                <BasketTicketItem key={index} {...item} canEdit={!inPayment} />
              );
            })}

          <div className="border-b border-gray-200 py-4">
            <div className="flex justify-between px-1 mb-4">
              <p className="font-semibold">جمع:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.totalAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
            <div className="flex justify-between px-1">
              <p className="font-semibold">مالیات:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.taxAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
          </div>
          <div className="py-4">
            <div className="flex justify-between px-1 mb-4">
              <p className="font-semibold">قابل پرداخت:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.payableAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
          </div>
          {inPayment ? (
            <div className="fixed -bottom-1 bg-white w-full right-0 p-3 pb-4   top-shadow  px-6 flex justify-between items-center lg:static lg:shadow-none lg:p-0">
              <SDButton
                disabled={!canPay}
                color="success"
                className="w-40 lg:w-full max-w-md"
                type="button"
                onClick={onPayClick}
              >
                پرداخت
              </SDButton>
              <div className="text-centers font-semibold lg:hidden">
                <p className=" mb-3">قابل پرداخت:</p>
                <p>
                  <NumberWithSeperator
                    value={basketState.basket?.payableAmount || 0}
                  />
                  <span className="mr-1">ریال</span>
                </p>
              </div>
            </div>
          ) : (
            <BookButton />
          )}
        </div>
      ) : (
         emptyMessage 
      )}
    </>
  );

  const errorMessage = <p className="text-center mt-5">{basketState.error}</p>;

  const laodingContainer = (
    <div className="flex justify-center pt-6">
      <SDSpinner size={20} />
    </div>
  );

  return (
    <SDCard
      className={`${
        inPayment && "mb-10"
      } mb-0 border border-gray-200 text-black`}
    >
      <div className="text-center border-b border-gray-400 pb-5">
        <p className="text-xl font-semibold text-slate-600 mb-3">
          سبد خرید شما
        </p>
        {basketState.basket && basketState.basket.items.length > 0 && (
          <p className="text-green-500">
            بلیت‌های انتخاب شده: {basketState.basket.ticketsCount}
          </p>
        )}
      </div>
      {basketState.loading && laodingContainer}
      {basketState.error && errorMessage}
      {basketState.basket && !basketState.loading && body}
      {!basketState.basket && !basketState.loading && emptyMessage}
    </SDCard>
  );
};

export default Basket;
