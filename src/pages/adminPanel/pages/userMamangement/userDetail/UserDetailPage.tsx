import { NavLink, Outlet } from "react-router-dom";
import SDButton from "../../../../../components/shared/Button";
import SDCard from "../../../../../components/shared/Card";

const UserDetailPage: React.FC = () => {
  return (
    <SDCard className="px-0">
      <div className="px-2 xs:px-8 mb-10">
        <div className="flex gap-3">
          <SDButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            ویرایش
          </SDButton>
          <SDButton color="failure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            حذف
          </SDButton>
        </div>
        <main className=" mt-10 text-slate-800">
          <div className="flex flex-wrap justify-between">
            <div className="flex lg:pl-12 w-full md:w-1/2   lg:w-5/12">
              <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto md:min-w-max">
                <p className="pb-6">نام</p>
                <p className="pb-6">نام خانوادگی</p>
                <p className="pb-6">نوع حساب کاربری</p>
                <p className="pb-6">کد ملی</p>
                <p className="pb-6">تاریخ تولد</p>
                <p className="pb-6">محل اقامت</p>
                <p className="pb-6">آدرس</p>
              </div>
              <div className=" flex flex-col w-1/2 text-center md:text-right">
                <p className="pb-6">علی</p>
                <p className="pb-6"> خانوادگی</p>
                <p className="pb-6">آزاد</p>
                <p className="pb-6">0022601244</p>
                <p className="pb-6">1378/07/099</p>
                <p className="pb-6">تهران</p>
                <p className="pb-6">
                  صادقیه، کوچه فلان، نبش کوچه فلان، کوچه ی فلان، پ26،واخد اول
                </p>
              </div>
            </div>
            <div className="flex md:pl-12 w-full md:w-1/2  lg:w-5/12">
              <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto  md:min-w-max">
                <p className="pb-6">کد کابر</p>
                <p className="pb-6">نام کاربری</p>
                <p className="pb-6">رمز عبور</p>
                <p className="pb-6">ایمیل</p>
                <p className="pb-6">شماره موبایل</p>
                <p className="pb-6">قد</p>
                <p className="pb-6">وزن</p>
              </div>
              <div className=" flex flex-col w-1/2 text-center md:text-right">
                <p className="pb-6">علی</p>
                <p className="pb-6"> خانوادگی</p>
                <p className="pb-6">آزاد</p>
                <p className="pb-6">0022601244</p>
                <p className="pb-6">1378/07/099</p>
                <p className="pb-6">تهران</p>
              </div>
            </div>
            {/* <div className="flex w-full md:w-1/2 lg:w-5/12">
              <div className="font-semibold flex flex-col gap-6 pl-6 ml-6 border-l w-48 md:min-w-max">
                <p>کد کاربر</p>
                <p>نام کاربری</p>
                <p>رمز عبور</p>
                <p>ایمیل</p>
                <p>شماره موبایل</p>
                <p>قد</p>
                <p>وزن</p>
              </div>
              <div className=" flex flex-col gap-6">
                <p>علی</p>
                <p> خانوادگی</p>
                <p>آزاد</p>
                <p>0022601244</p>
                <p>1378/07/099</p>
                <p>تهران</p>
                <p>50</p>
              </div>
            </div> */}
          </div>
          <div className="mt-10">
            <h6 className="font-bold text-lg">اطلاعات تماس اضطراری</h6>
            <div className="pt-5 flex flex-wrap justify-between">
              <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
                <p className="font-semibold ml-12">نام</p>
                <p>محمد</p>
              </div>
              <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
                <p className="font-semibold ml-12">مبایل</p>
                <p>091255646548</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <nav className="flex border-b border-blue-400">
        <ul className="flex w-full">
          <li className="flex-grow text-center">
            <NavLink
              className={(nav) =>
                `${
                  !nav.isActive && "border-b-2 !border-blue-500 !text-blue-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-blue-600 hover:border-blue-300  transition-all ease-linear duration-75`
              }
              to={""}
            >
              بلیت‌ها
            </NavLink>
          </li>
          <li className="flex-grow text-center">
            <NavLink
              className={(nav) =>
                `${
                  nav.isActive && "border-b-2 !border-blue-500 !text-blue-500"
                } pb-4 block hover:border-b-2 text-gray-500 hover:text-blue-400 hover:border-blue-300  transition-all ease-linear duration-75`
              }
              to="documents"
            >
              مدارک
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </SDCard>
  );
};
export default UserDetailPage;
