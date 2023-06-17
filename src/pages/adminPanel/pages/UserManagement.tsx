import React from "react";
import Grid from "../../../components/shared/Grid";
import SDButton from "../../../components/shared/Button";
import SDDatepicker from "../../../components/shared/DatePicker";
import SDLabel from "../../../components/shared/Label";

const UserManagement: React.FC = () => {
  const students = [
    { کدکاربر: 1, name: "Kate", age: 25, favFruit: "🍏" },
    { کدکاربر: 2, name: "Tom", age: 23, favFruit: "🍌" },
    { کدکاربر: 3, name: "Ann", age: 26, favFruit: "🍊" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
    { کدکاربر: 4, name: "Jack", age: 21, favFruit: "🍒" },
  ];
  return (
    <>
      <div className="flex justify-between mt-12">
        <div>
          <SDButton color="success">+ جدید</SDButton>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <p>وضعیت :</p>
          </div>
          <div>
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer rtl:text-right"
            >
              <option selected>همه</option>
              <option value="US">در انتظار تایید</option>
              <option value="CA">در انتظار تکمیل</option>
              <option value="FR">فعال</option>
              <option value="DE">غیر فعال</option>
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <p> تاریخ :</p>
          </div>
          <div className="mr-5">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="از :"
            ></SDDatepicker>
          </div>
          <div className="mr-5">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="تا :"
            ></SDDatepicker>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Grid data={students} />
      </div>
    </>
  );
};

export default UserManagement;
