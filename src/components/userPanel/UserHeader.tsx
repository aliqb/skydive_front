import { useAppSelector } from "../../hooks/reduxHooks";
import { authActions } from "../../store/auth";
import SDDropdown, { DropDownItem } from "../shared/Dropdown";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Basket from "../shared/Basket/Basket";
import {  useLocation, useNavigate } from "react-router-dom";
import { MouseEventHandler, useEffect, useState } from "react";

const UserHeader: React.FC = () => {
  const name = useAppSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartIsInBody, setCartIsInBody] = useState<boolean>(false);
  const [showBasket, setShowBasket] = useState<boolean>(false);

  const goToPayment : MouseEventHandler = (event)=>{
    event.stopPropagation();
    setShowBasket(false);
    navigate('/payment');
  }

  useEffect(() => {
    if (
      location.pathname.includes("flights") ||
      location.pathname.includes("payment")
    ) {
      setCartIsInBody(true);
    }
  }, [location]);
  // const navigate = use
  const dropdownItems: DropDownItem[] = [
    {
      title: "حساب کاربری",
      href: "/account",
      icon: (
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      title: "خروج",
      mode: "Button",
      onClick: logOut,
      icon: (
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      ),
    },
  ];

  function logOut() {
    dispatch(authActions.logOut());
  }
  return (
    <>
      <div className="bg-primary-500 h-[60px] flex items-center fixed w-full top-0 z-20">
        <div className="mr-auto ml-12 flex text-white">
          <button
            onMouseEnter={() => setShowBasket(true)}
            onMouseLeave={() => setShowBasket(false)}
            onClick={goToPayment}
            className="ml-1"
          >
            <FaShoppingCart size="1.5rem" />
            {!cartIsInBody && showBasket && (
              <div
                
                className="hidden  md:block absolute max-h-screen overflow-auto rounded-t-lg top-[50px] left-36 z-20 w-96"
              >
                <Basket />
              </div>
            )}
          </button>
          <SDDropdown items={dropdownItems}>
            <span>{name}</span>
          </SDDropdown>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
