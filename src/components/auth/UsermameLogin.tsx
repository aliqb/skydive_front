import { Button } from "flowbite-react";
import { FormEvent, useRef, useState } from "react";
interface UsernameLoginProps {
  onUserNameSubmit: (username: string) => void;
  username?: string;
}
const UsernameLogin: React.FC<UsernameLoginProps> = (props) => {
  const [username, setUsername] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false);
  function onChangeUsername(event: FormEvent){
    const input :string = (event.target as HTMLInputElement).value
    setUsername(input)
  }
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true)
    if(!username){
      return
    }
    props.onUserNameSubmit(username);
  }
  return (
    <form onSubmit={onSubmit} className="p-8">
      <h1 className="mb-6 text-lg font-semibold">ورود</h1>
      <div className="flex w-full gap-1">
        <div className="relative w-full mb-0">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 fill-gray-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={username}
            onInput={onChangeUsername}
            id="input-group-1"
            className={`${submitted && !username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} ltr placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-40`}
            placeholder="نام کاربری"
            
          />
          <div className="absolute left-0 h-10 top-0.5 py-1 pl-3 w-32">
            <div className="bg-gray-300 h-4/5 top-0.5 absolute -right-6 w-px"></div>
            <a>فراموش کردید؟</a>
          </div>
        </div>
        <div>
          <Button type="submit" color="success" className="rounded-sm">
            ورود
          </Button>
        </div>
      </div>
      {submitted && !username && <p className="text-red-600 text-sm pr-2">لطفا نام کاربری خود را وارد کنید.</p>}
      <div className="flex items-center gap-2 mt-6  ">
        <p>حساب کاربری ندارید؟ ثبت نام کنید: </p>
        <Button color="success" className="rounded-sm">
          ایجاد حساب کاربری
        </Button>
      </div>
    </form>
  );
};

export default UsernameLogin;
