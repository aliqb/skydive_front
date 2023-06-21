import NumberWithSeperator from "../NumberWithSeperator";
import PlusMinus from "../PlusMinus";

const BasketTicketItem: React.FC = () => {
  function onIncrease(value: number) {
    console.log(value);
  }

  function onDecrease(value: number) {
    console.log(value);
  }
  return (
    <div className="flex justify-between border-b border-gray-200 py-4 items-center text-center">
      <div>
        <p className="mb-5">شماره پرواز: 1</p>
        <p>
          <NumberWithSeperator value={2000000} />
          <span className="mr-1">ریال</span>
        </p>
      </div>
      <div>
        <p className="mb-5">بلیت آزاد</p>
        <PlusMinus value={0} onIncrease={onIncrease} onDecrease={onDecrease} />
      </div>
    </div>
  );
};
export default BasketTicketItem;
