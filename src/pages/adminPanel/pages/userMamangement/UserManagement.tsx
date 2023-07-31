import React, { useState, useCallback } from "react";
import Grid from "../../../../components/shared/Grid/Grid";
import SDButton from "../../../../components/shared/Button";
import SDDatepicker from "../../../../components/shared/DatePicker";
import useAPi from "../../../../hooks/useApi";
import {
  BaseResponse,
  UserStatusesPersianMap,
} from "../../../../models/shared.models";
import { Link, useNavigate } from "react-router-dom";
import { UserListItem } from "../../../../models/usermanagement.models";
import {
  ColDef,
  GridGetData,
} from "../../../../components/shared/Grid/grid.types";
import SDSelect from "../../../../components/shared/Select";
import SearchInput from "../../../../components/shared/SearchInput";

const UserManagement: React.FC = () => {
  const { sendRequest, errors } = useAPi<null, BaseResponse<UserListItem[]>>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [minDate, setMinDate] = useState<string>();
  const [maxDate, setMaxDate] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colDefs] = useState<ColDef<UserListItem>[]>([
    {
      field: "code",
      headerName: "کد",
      sortable: true,
    },
    {
      field: "nationalCode",
      headerName: "کد ملی",
      sortable: true,
    },
    {
      field: "firstName",
      headerName: "نام",
      sortable: true,
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      sortable: true,
    },
    {
      field: "userType",
      headerName: "نوع",
      sortable: true,
    },
    {
      field: "phone",
      headerName: "موبایل",
      sortable: true,
    },
    {
      field: "birthDate",
      headerName: "تاریخ تولد",
      sortable: true,
    },
    {
      field: "username",
      headerName: "نام کاربری",
      sortable: true,
    },
    {
      field: "email",
      headerName: "ایمیل",
      sortable: true,
    },
    {
      field: "statusDisplay",
      headerName: "وضعیت",
      sortable: true,
    },
  ]);
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const onSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  function goToDetail(user: UserListItem) {
    navigate(`${user.id}`);
  }

  function goToEdit(user: UserListItem) {
    navigate(`${user.id}/edit`);
  }

  const fetchUsers = useCallback<GridGetData<UserListItem>>(
    (gridParams, setRows) => {
      sendRequest(
        {
          url: "/Admin/GetUsers",
          params: {
            pagesize: gridParams.pageSize,
            pageindex: gridParams.pageIndex,
            userStatus: selectedValue,
            minDate: minDate,
            maxDate: maxDate,
            orderby: gridParams.sorts
              .map((item) => `${item.field} ${item.sort}`)
              .join(","),
            search: searchTerm,
          },
        },
        (response) => {
          const result = response.content;
          // setResult(result);
          setRows(result, response.total);
        }
      );
    },
    [sendRequest, selectedValue, minDate, maxDate, searchTerm]
  );

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     await sendRequest(
  //       {
  //         url: "/Admin/GetUsers",
  //         params: {
  //           pagesize: 10000,
  //           pageindex: 1,
  //           userStatus: selectedValue.toLowerCase(),
  //         },
  //       },
  //       (response) => {
  //         const result = response.content;
  //         setResult(result);
  //       }
  //     );
  //   };

  //   fetchUsers();
  // }, [selectedValue, sendRequest]);

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-3/4">
  //       <SDSpinner size={16} />
  //     </div>
  //   );
  // }

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }

  return (
    <>
      <div className="flex  mt-12 flex-wrap">
        <div className=" basis-full mb-4 xl:mb-0 xl:basis-1/12">
          <Link to="create" className="w-full">
            <SDButton color="success">+ جدید</SDButton>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between xl:basis-11/12 gap-4">
          <div className="flex flex-wrap">
            <div className="flex items-center justify-center pb-2 ml-8">
              <p className="pl-1 text-sm">وضعیت:</p>

              <div className="mr-1">
                <SDSelect
                  id="underline_select"
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
                </SDSelect>
              </div>
            </div>
            <div className="flex items-center justify-center pb-2">
              <p className="pl-1 text-sm">جستجو:</p>
              <div className="mr-1">
                <SearchInput
                  onSubmit={onSearchTermChange}
                  searchTerm={searchTerm}
                  placeholder="نام، نام خانوادگی، کد ملی"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap pb-2">
            <p className="pl-4 text-sm"> تاریخ ثبت نام: </p>

            <div className="flex">
              <SDDatepicker
                name="expireDate"
                required={true}
                placeholder="از :"
                onOpenPickNewDate={false}
                value={minDate}
                onChange={setMinDate}
              ></SDDatepicker>
              <SDDatepicker
                containerClassName="mr-1"
                name="expireDate"
                required={true}
                placeholder="تا :"
                onOpenPickNewDate={false}
                value={maxDate}
                onChange={setMaxDate}
              ></SDDatepicker>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Grid<UserListItem>
          // data={result}
          getData={fetchUsers}
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
