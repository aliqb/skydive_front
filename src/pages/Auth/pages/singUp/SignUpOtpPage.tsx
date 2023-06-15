import { useNavigate } from "react-router-dom";
import OTPBox from "../../../../components/auth/OTPBox";
import BackButton from "../../../../components/shared/BackButton";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useEffect } from 'react'
import useAPi, { axiosIntance } from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared";
import { AuthData } from "../../../../models/auth";
import { authActions } from "../../../../store/auth";

const SignUpPasswordOtpPage: React.FC = () => {
  const phone = useAppSelector((state) => state.auth.enteredPhone);
  const dispatch = useAppDispatch();
  const {sendRequest, isPending,errors} = useAPi<{phone:string, code: string},BaseResponse<AuthData>>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!phone) {
      navigate("/auth/signup");
    }
  }, [phone, navigate]);
  function onFinish(code: string): void {
    console.log("finish", code);
    sendRequest({
        url: '/Users/OtpRegisterConfirmation',
        method:'post',
        data: {
            phone: phone,
            code: code
        }
    },(response)=>{
        dispatch(authActions.setToken(response.content))
        navigate('/auth/signup/personal')
    })
  }

  function onOTPRefresh() {
    return axiosIntance.post('/Users/OtpRequest',{phone:phone})
  }

  return (
    <section className="w-full">
      <form className="p-8 pt-4 border-b">
        <OTPBox
          condLength={6}
          onFinish={onFinish}
          phone={phone}
          durationSeconds={60}
          onRefresh={onOTPRefresh}
        />
      {errors && (
        <p className="text-red-600 text-sm pr-2 mt-2 text-center">{errors.message}</p>
      )}
      </form>
    </section>
  );
};

export default SignUpPasswordOtpPage;