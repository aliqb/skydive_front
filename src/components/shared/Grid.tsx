import { Table } from "flowbite-react";
import React from "react";
interface GridProps {
  data: Record<string, any>[];
}

const Grid: React.FC<GridProps> = ({ data }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  {
    return (
      <Table hoverable>
        <Table.Head>
          {columns.map((column) => (
            <Table.HeadCell key={column}>{column}</Table.HeadCell>
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
              {columns.map((column) => (
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
