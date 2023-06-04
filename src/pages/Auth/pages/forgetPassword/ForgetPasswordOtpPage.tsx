import { useNavigate } from "react-router-dom";
import OTPBox from "../../../../components/auth/OTPBox";
import BackButton from "../../../../components/shared/BackButton";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { useEffect } from 'react'

const ForgetPasswordOtpPage: React.FC = () => {
  const phone = useAppSelector((state) => state.auth.enteredPhone);
  const navigate = useNavigate();
  useEffect(() => {
    if (!phone) {
      navigate("/auth/forget-password");
    }
  }, [phone, navigate]);
  function onFinish(code: string): void {
    console.log("finish", code);
    navigate('/auth/forget-password/change')
  }

  function onOTPRefresh() {
    console.log("refresh");
  }

  return (
    <section className="w-full">
      <BackButton />
      <form className="p-8 pt-4 border-b">
        <OTPBox
          condLength={6}
          onFinish={onFinish}
          phone={phone}
          durationSeconds={60}
          onRefresh={onOTPRefresh}
        />
      </form>
    </section>
  );
};

export default ForgetPasswordOtpPage;
