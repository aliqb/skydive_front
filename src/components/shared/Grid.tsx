import { Table } from "flowbite-react";
import React from "react";
interface GridProps {
  data: Record<string, any>[];
  columnsToShow: string[];
}
interface HeaderTranslations {
  [key: string]: string;
}

const translateHeader = (header: string, translations: HeaderTranslations) => {
  return translations[header] || header;
};

const Grid: React.FC<GridProps> = ({ data, columnsToShow }) => {
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
    // Add more translations as needed
  };
  {
    return (
      <Table hoverable>
        <Table.Head>
          {columnsToShow.map((column) => (
            <Table.HeadCell key={column}>
              {translateHeader(column, headerTranslations)}
            </Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">ویرایش</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row, index) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={index}
            >
              {columnsToShow.map((column) => (
                <Table.Cell
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                  key={column}
                >
                  {row[column]}
                </Table.Cell>
              ))}
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  href="/tables"
                >
                  <p>ویرایش</p>
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
};
export default Grid;
