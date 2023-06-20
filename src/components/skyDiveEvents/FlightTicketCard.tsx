import PlusMinus from "../shared/PlusMinus";

interface FlightTicketCardProps{
    className?: string;
}

const FlightTicketCard: React.FC<FlightTicketCardProps> = (props) => {

    function onIncrease(value:number){
        console.log(value);

    }

    function onDecrease(value:number){
        console.log(value);
        
    }

  return <div className={`${props.className || ''} flex flex-col justify-center items-center  font-semibold w-full py-8 text-lg`}>
    <p className="mb-1 text-slate-600">بلیت‌ آزاد</p>
    <p className="mb-5 text-slate-600">
        مبلغ 200,000,000 ریال
    </p>
    <p className="mb-5 text-green-500"  >بلیت‌های موجود : 2</p>
    <PlusMinus onIncrease={onIncrease} onDecrease={onDecrease} />
  </div>;
};

export default FlightTicketCard;
