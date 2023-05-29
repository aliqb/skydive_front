import { Button } from "flowbite-react";

export default function Login() {
  return (
    <form>
      <div className="flex w-full gap-1">
        <div className="relative w-full mb-6">
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
            id="input-group-1"
            className="ltr placeholder:text-right w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-40"
            placeholder="ایمیل با موبایل یا نام کاربری"
          />
          <div className="absolute left-0 h-10 top-0.5 py-1 pl-3 w-32">
            <div className="bg-gray-300 h-4/5 top-0.5 absolute -right-6 w-px"></div>
            <a>فراموش کردید؟</a>
          </div>
        </div>
        <div>
          <Button color="success" className="rounded-sm">
            ورود
          </Button>
          {/* <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">ورود</button> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p>حساب کاربری ندارید؟ ثبت نام کنید: </p>
        <Button color="success" className="rounded-sm">
          ایجاد حساب کاربری
        </Button>
      </div>
    </form>
  );
}
