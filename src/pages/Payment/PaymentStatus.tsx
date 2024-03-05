import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SDCard from "../../components/shared/Card";
import SDButton from "../../components/shared/Button";
import Logo from "../../components/shared/Logo";
import { BaseResponse } from "../../models/shared.models";
import useAPi from "../../hooks/useApi";
import { toast } from "react-toastify";
import { getAuthDataFromLocal } from "../../utils/authUtils";

const PaymentStatus: React.FC = () => {
  const location = useLocation();
  const [trackingCode, setTrackingCode] = useState("");
  const { sendRequest: sendVerifyRequest, isPending } = useAPi<
    null,
    BaseResponse<null>
  >();

  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("Status");
  const authority = searchParams.get("Authority");
  const authData = getAuthDataFromLocal();
  console.log(trackingCode);

  useEffect(() => {
    sendVerifyRequest(
      {
        url: `/ShoppingCarts/verify?authority=${authority}`,
        method: "put",
        headers: {
          Authorization: `Bearer ${authData?.authToken}`,
        },
      },
      (response) => {
        console.log(response);
        setTrackingCode(response.message);
      },
      (error) => {
        toast.error(error?.message);
      },
    );
  }, [authData?.authToken, authority]);

  return (
    <>
      <SDCard className="click-none flex h-screen flex-col items-center justify-center">
        <Logo className="mb-8 w-52" />

        {status === "OK" ? (
          <>
            <h1 className="pointer-events-none  text-2xl">
              پرداخت با موفقیت انجام گرفت !
            </h1>
            <h4 className="pointer-events-none">کد رهگیری : {trackingCode}</h4>
          </>
        ) : (
          <h1 className="pointer-events-none">پرداخت ناموفق بود!</h1>
        )}
        <SDButton color="primary" className="mt-10 !h-10 font-extrabold">
          بازگشت به سامانه
        </SDButton>
      </SDCard>
    </>
  );
};

export default PaymentStatus;
