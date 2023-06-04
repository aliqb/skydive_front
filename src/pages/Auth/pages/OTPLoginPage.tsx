import BackButton from "../../../components/shared/BackButton";
import {  useEffect } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";
import OTPBox from "../../../components/auth/OTPBox";

const OTPLoginPage: React.FC = () => {
  const enteredUsername = useAppSelector((state) => state.auth.enteredUsername);

  const navigate = useNavigate();
  useEffect(() => {
    if (!enteredUsername) {
      navigate("/auth");
    }
  }, [enteredUsername, navigate]);

  function onFinish(code: string): void {
    console.log('finish',code);
  }

  function onOTPRefresh(){
    console.log('refresh')
  }


  return (
    <section className="w-full">
      <BackButton />
      <form className="p-8 pt-4 border-b">
        <OTPBox condLength={6} onFinish={onFinish} phone="09374949025" durationSeconds={60} onRefresh={onOTPRefresh} />
      </form>
      <Link
        to="../password"
        className="flex items-center w-full h-full px-8 py-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 ml-2"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
            clipRule="evenodd"
          />
        </svg>

        <p>ورود با رمز عبور</p>
      </Link>
    </section>
  );
};

export default OTPLoginPage;
