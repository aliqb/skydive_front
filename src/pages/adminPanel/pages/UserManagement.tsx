import React, { useEffect, useState } from "react";
import Grid from "../../../components/shared/Grid";
import SDButton from "../../../components/shared/Button";
import SDDatepicker from "../../../components/shared/DatePicker";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import SDSpinner from "../../../components/shared/Spinner";

const UserManagement: React.FC = () => {
  const { sendRequest, errors, isPending } = useAPi<null, BaseResponse<any>>();
  const [result, setResult] = useState([]);
  useEffect(() => {
    sendRequest(
      {
        url: "/Admin/GetUsers",
        params: { pagesize: 10, pageindex: 1 },
      },
      (response) => {
        const result = response.content;
        console.log(result);
        setResult(result);
      }
    );
  }, []);
  if (isPending) {
    return (
      <div>
        <SDSpinner size={3} />
      </div>
    );
  }
  if (errors) {
    return <div>Error: {errors.message}</div>;
  }
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
        <Grid
          data={result}
          columnsToShow={[
            "code",
            "nationalCode",
            "firstName",
            "lastName",
            "userType",
            "phone",
            "birthDate",
            "username",
            "email",
            "statusDisplay",
          ]}
        />
      </div>
    </>
  );
};

export default UserManagement;
