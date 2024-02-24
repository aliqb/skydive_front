import { useState, ChangeEvent, useEffect } from "react";
import PaymentMethod from "../../components/payment/PaymentMethod";
import Basket from "../../components/shared/Basket/Basket";
import SDCard from "../../components/shared/Card";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { toast } from "react-toastify";
import { basketActions } from "../../store/basket";
import { WalletData } from "../../models/wallet.models";

const PaymentPage: React.FC = () => {
  const [method, setMethod] = useState<string>("");
  const [acceptRules, setAcceptRules] = useState<boolean>(false);
  const eventId = useAppSelector(
    (state) => state.basket.basket?.skyDiveEventId
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [payPending, setPayPedning] = useState<boolean>(false);
  const [walletSubtitle, setWalletSubtitle] = useState<string>("");

  const { sendRequest: sendPayRequest } = useAPi<null, BaseResponse<null>>();
  const { sendRequest: sendCheckRequest } = useAPi<null, BaseResponse<null>>();
  const { sendRequest: getWalletRequest } = useAPi<
    null,
    BaseResponse<WalletData>
  >();

  useEffect(() => {
    getWalletRequest(
      {
        url: "wallets",
      },
      (response) => {
        const balanceString = response.content.balance.toLocaleString();
        setWalletSubtitle(balanceString + " ریال");
      }
    );
  }, [getWalletRequest]);

  function onSelectMethod(id: string) {
    setMethod(id);
  }

  function onChangeAcceptance(evenet: ChangeEvent<HTMLInputElement>) {
    setAcceptRules(!!evenet.target.value);
  }

  function goBack() {
    navigate(-1);
  }

  function onPay(methodId: string) {
    setPayPedning(true);
    sendCheckRequest(
      {
        url: "/ShoppingCarts/CheckTickets",
      },
      () => {
        payBasket(methodId);
      },
      (error) => {
        toast.error(error?.message);
        setPayPedning(false);
      }
    );
  }
  function payBasket(methodId: string) {
    if (methodId === "wallet") {
      payByWallet();
      return;
    }
    dumpPay();
  }

  function payByWallet() {
    sendPayRequest(
      {
        url: "/Reservations/SetAsPaidByWallet",
        method: "put",
      },
      onFinishPayment,
      (error) => {
        toast.error(error?.message);
        setPayPedning(true);
      }
    );
  }

  function dumpPay() {
    sendPayRequest(
      {
        url: "/Reservations/SetAsPaid",
        method: "put",
      },
      onFinishPayment,
      (error) => {
        toast.error(error?.message);
        setPayPedning(true);
      }
    );
  }

  function onFinishPayment(payResponse: BaseResponse<null>) {
    toast.success(payResponse.message);
    dispatch(basketActions.reset());
    setPayPedning(true);
    navigate("/tickets");
  }

  return (
    <div className="flex flex-wrap mt-1  pb-3 lg:px-20 xl:px-28 pt-4">
      <SDCard className="border border-gray-200 w-full lg:w-2/3">
        <p className="text-slate-600 font-semibold mb-5">روش پرداخت</p>
        <PaymentMethod
          title="پرداخت آنلاین"
          subtitle="سامان"
          icon={<FaWallet size="2.2rem" color="rgb(54 63 75)" />}
          id="saman"
          onSelect={onSelectMethod}
          isActive={method === "saman"}
        />
        <PaymentMethod
          title="استفاده از اعتبار کیف پول"
          subtitle={walletSubtitle}
          icon={<FaWallet size="2.2rem" color="rgb(54 63 75)" />}
          id="wallet"
          onSelect={onSelectMethod}
          isActive={method === "wallet"}
        />

        <div className="flex items-center mr-4 mt-4 ">
          <input
            id="red-radio"
            type="radio"
            value="accept"
            checked={acceptRules}
            onChange={onChangeAcceptance}
            name="colored-radio"
            className="w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="red-radio"
            className="mr-2  font-medium text-gray-900 dark:text-gray-300"
          >
            <Link
              to={`/events/${eventId}/terms`}
              target="_blank"
              className="inline-block ml-1 text-blue-600"
            >
              قوانین و شرایط
            </Link>
            را مطالعه کرده‌ام و می‌پذیرم.
          </label>
        </div>
        <div className="flex mt-10 text-slate-600">
          <button onClick={goBack} className="flex items-cetner m-auto">
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            بازگشت و ویرایش سبد خرید
          </button>
        </div>
      </SDCard>
      <aside className="relative w-full pt-4 lg:pt-0 lg:w-1/3">
        <div className="lg:px-3">
          <Basket
            inPayment={true}
            canPay={!!method && acceptRules}
            isPaying={payPending}
            onPayClick={() => onPay(method)}
          />
        </div>
      </aside>
    </div>
  );
};

export default PaymentPage;
