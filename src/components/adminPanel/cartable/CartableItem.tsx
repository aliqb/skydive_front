import { Link, useNavigate } from "react-router-dom";
import { CartableMessage, CartableRequestTypes } from "../../../models/cartable.models";

const CartableItem: React.FC<CartableMessage> = (props) => {
  const navigate = useNavigate();
  const onClickTitle : React.MouseEventHandler<HTMLButtonElement> = ()=>{
    if(props.requestType === CartableRequestTypes.USER_INFORMATION_CONFIRM){
      navigate(`/admin/users/${props.applicantId}/documents`)
    }
  }
  return (
    <div className="flex gap-11 items-center border-b py-8 last:border-none">
      <div className="hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-w-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
      <div>
        <div className="flex mb-5 items-center">
          <button className="font-bold text-lg ml-6" onClick={onClickTitle}>
            {props.requestTypeDisplay}
          </button>
          <p className="text-green-400 text-sm">در {props.createdAt}</p>
        </div>
        <div className="flex gap-6 flex-wrap md:gap-12 text-slate-600">
          <p>درخواست کننده: {props.applicantName} </p>
          <p>کد کاربری: {props.applicantCode}</p>
          <p>نوع کاربر: {props.applicantTypeDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default CartableItem;
