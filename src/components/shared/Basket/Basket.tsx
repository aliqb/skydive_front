import SDCard from "../Card";
import NumberWithSeperator from "../NumberWithSeperator";
import BasketTicketItem from "./BasketTicketItem";
import BookButton from "./‌BookButton";

const Basket: React.FC = () => {
  return (
    <SDCard className="border border-gray-200">
      <div className="text-center border-b border-gray-400 pb-5">
        <p className="text-xl font-semibold text-slate-600 mb-3">
          سبد خرید شما
        </p>
        <p className="text-green-500">بلیت‌های انتخاب شده: 4</p>
      </div>
      <div className=" px-3">
        <BasketTicketItem />
        <BasketTicketItem />
        <div className="border-b border-gray-200 py-4">
          <div className="flex justify-between px-1 mb-4">
            <p className="font-semibold">جمع:</p>
            <p>
              <NumberWithSeperator value={50000} />
              <span className="mr-1">ریال</span>
            </p>
          </div>
          <div className="flex justify-between px-1">
            <p className="font-semibold">مالیات:</p>
            <p>
              <NumberWithSeperator value={50000} />
              <span className="mr-1">ریال</span>
            </p>
          </div>
        </div>
        <div className="py-4">
          <div className="flex justify-between px-1 mb-4">
            <p className="font-semibold">قابل پرداخت:</p>
            <p>
              <NumberWithSeperator value={50000} />
              <span className="mr-1">ریال</span>
            </p>
          </div>
        </div>
        <BookButton />
      </div>
    </SDCard>
  );
};

export default Basket;
