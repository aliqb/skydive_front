import SDCard from "../shared/Card";
import { BsCheckCircleFill } from "react-icons/bs";
interface PaymentMethodProp {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onSelect: (id:string) => void;
  id: string;
}
const PaymentMethod: React.FC<PaymentMethodProp> = ({
  title,
  subtitle,
  icon,
  isActive = false,
  onSelect,
  id
}) => {
  function onClick() {
    onSelect(id);
  }
  return (
    <button className="block w-full" onClick={onClick}>
      <SDCard className={`${isActive ? 'border-green-600' : 'border-gray-300'} flex my-2 border  items-center`}>
        <div className="ml-8">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-lg mb-2">{title}</p>
          <p className="text-slate-600 text-right">{subtitle}</p>
        </div>
        <div className="mr-auto">
          {isActive ? (
            <BsCheckCircleFill size="2.5rem" color="green" />
          ) : (
            <div className="rounded-full w-10 h-10  border-gray-300 border-2 "></div>
          )}
        </div>
      </SDCard>
    </button>
  );
};
export default PaymentMethod;
