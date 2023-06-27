import React, { useEffect, useState } from "react";
import Grid from "../../../../components/shared/Grid/Grid";
import SDButton from "../../../../components/shared/Button";
import SDDatepicker from "../../../../components/shared/DatePicker";
import useAPi from "../../../../hooks/useApi";
import {
  BaseResponse,
  UserStatusesPersianMap,
} from "../../../../models/shared.models";
import SDSpinner from "../../../../components/shared/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserListItem } from "../../../../models/usermanagement.models";
import { ColDef } from "../../../../components/shared/Grid/grid.types";

const UserManagement: React.FC = () => {
  const { sendRequest, errors, isPending } = useAPi<
    null,
    BaseResponse<UserListItem[]>
  >();
  const [result, setResult] = useState<UserListItem[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [colDefs] = useState<ColDef<UserListItem>[]>([
    {
      field: "code",
      headerName: "کد",
    },
    {
      field: "nationalCode",
      headerName: "کد ملی",
    },
    {
      field: "firstName",
      headerName: "نام",
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
    },
    {
      field: "userType",
      headerName: "نوع",
    },
    {
      field: "phone",
      headerName: "موبایل",
    },
    {
      field: "birthDate",
      headerName: "تاریخ تولد",
    },
    {
      field: "username",
      headerName: "نام کاربری",
    },
    {
      field: "email",
      headerName: "ایمیل",
    },
    {
      field: "statusDisplay",
      headerName: "وضعیت",
    },
  ]);
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  function goToDetail(user: UserListItem) {
    navigate(`${user.id}`);
  }

  function goToEdit(user: UserListItem) {
    navigate(`${user.id}/edit`);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      await sendRequest(
        {
          url: "/Admin/GetUsers",
          params: {
            pagesize: 10000,
            pageindex: 1,
            userStatus: selectedValue.toLowerCase(),
          },
        },
        (response) => {
          const result = response.content;
          setResult(result);
        }
      );
    };

    fetchUsers();
  }, [selectedValue, sendRequest]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-3/4">
        <SDSpinner size={16} />
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
          <Link to="create">
            <SDButton color="success">+ جدید</SDButton>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <p>وضعیت :</p>
          </div>
          <div className="mr-5">
            <select
              id="underline_select"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option value="">همه</option>
              {Array.from(UserStatusesPersianMap.entries()).map(
                ([key, value]) => (
                  <option key={key} value={key} className="text-right">
                    {value}
                  </option>
                )
              )}
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
        <Grid<UserListItem>
          data={result}
          onDoubleClick={goToDetail}
          colDefs={colDefs}
          rowActions={{ edit: true, remove: false }}
          onEditRow={goToEdit}
        />
      </div>
    </>
  );
};

export default UserManagement;
