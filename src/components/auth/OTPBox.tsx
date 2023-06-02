import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import Timer from "../shared/Timer";
interface OTPInputProp {
  condLength: number;
  durationSeconds: number;
  onFinish(code: string): void;
  onRefresh():void;
}

const OTPBox: React.FC<OTPInputProp> = (props) => {
  const [code, setCode] = useState<string>("");
  const [canRefresh, setCanRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (code.length === props.condLength) {
      props.onFinish(code);
    }
  }, [code, props]);

  function renderInput(props: any) {
    return (
      <input
        {...props}
        className={`ltr text-2xl !w-1/6 !max-w-[3rem] h-14 border-gray-300 focus:border-blue-500 placeholder:text-right  bg-gray-50 border  text-gray-900  rounded-md focus:ring-blue-500  block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
      />
    );
  }

  function handleChange(value: string) {
    console.log(value);
    setCode(value);
  }

  function onTimerEnd(){
    console.log('timer end')
    setCanRefresh(true)
  }

  function handleRefresh(){
    setCode('');
    props.onRefresh();
    setCanRefresh(false);
  }

  return (
    <div className="flex flex-col items-center">
      <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={props.condLength}
        renderSeparator={<span className="p-1"></span>}
        renderInput={renderInput}
        containerStyle="ltr justify-center w-full mb-3"
      />
      <div className="text-sm">
        { canRefresh ? 
            <button type="button" onClick={handleRefresh}>ارسال مجدد</button>
        :
         <Timer durationSeconds={props.durationSeconds} onEnd={onTimerEnd} />}
      </div>
    </div>
  );
};

export default OTPBox;
