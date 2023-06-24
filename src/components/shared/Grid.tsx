import { Table } from "flowbite-react";
import React from "react";
import AdminGridActions from "../adminPanel/AdminGridActions";
interface GridProps {
  data: any[];
  columnsToShow: string[];
  fetchData?: () => void;
  onDoubleClick?: (data: any) => void;
}
interface HeaderTranslations {
  [key: string]: string;
}

const translateHeader = (header: string, translations: HeaderTranslations) => {
  return translations[header] || header;
};

const Grid: React.FC<GridProps> = ({
  data,
  columnsToShow,
  fetchData,
  onDoubleClick,
}) => {
  const headerTranslations: HeaderTranslations = {
    code: "کد کاربر",
    nationalCode: "کدملی",
    firstName: "نام ",
    lastName: "نام خانوادگی",
    userType: "نوع کاربر",
    phone: "موبایل",
    birthDate: "تاریخ تولد",
    username: "نام کاربری",
    email: "ایمیل",
    statusDisplay: "وضعیت",
    title: "نام",
    startDate: "شروع",
    endDate: "پایان",
    location: "محل رویداد",
    statusTitle: "وضعیت",
    voidableString: "قابل لغو",
    termsAndConditions: "قوانین و شرایط",
    cost: "بهای فروش",
    actions: "عملیات",
  };

  const onRowDobuleClisk = (item: any) => {
    console.log(item);
    if (onDoubleClick) {
      onDoubleClick(item);
    }
  };

  {
    return (
      <>
        <Table hoverable className="text-right">
          <Table.Head>
            {columnsToShow.map((column) => (
              <Table.HeadCell key={column}>
                {translateHeader(column, headerTranslations)}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((row, index) => (
              <Table.Row
                onDoubleClick={(event) => {
                  event.stopPropagation();
                  onRowDobuleClisk(row);
                }}
                className={`${onDoubleClick && '!cursor-pointer'} bg-white dark:border-gray-700 dark:bg-gray-800`}
                key={index}
              >
                {columnsToShow.map((column) => (
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    key={column}
                  >
                    {column === "cost" ? (
                      <a
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                        href={`cost/edit`}
                      >
                        ویرایش
                      </a>
                    ) : column === "termsAndConditions" ? (
                      <a
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                        href={`terms/edit`}
                      >
                        ویرایش
                      </a>
                    ) : column === "actions" && fetchData ? (
                      <AdminGridActions fetchData={fetchData} rowId={row.id} />
                    ) : (
                      row[column]
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
};
export default Grid;
