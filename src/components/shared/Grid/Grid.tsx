import { Table } from 'flowbite-react';
import React, { useState } from 'react';
import AdminGridActions from '../../adminPanel/AdminGridActions';
import CostModal from '../../adminPanel/CostModal';
import { ColDef } from './grid.types';
interface GridProps {
  data: any[];
  colDefs: ColDef[];
  fetchData?: () => void;
  onDoubleClick?: (data: any) => void;
}
interface HeaderTranslations {
  [key: string]: string;
}
const translateHeader = (header: string, translations: HeaderTranslations) => {
  return translations[header] || header;
};

const Grid: React.FC<GridProps> = ({ data, colDefs: colDefs, fetchData,onDoubleClick }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');

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
  const handleOnOpenModal = (id?: string) => {
    setSelectedRowId(id || '');
    setOpenModal(true);
  };
  const handleOnCloseModal = () => {
    setOpenModal(false);
  };
  {
    return (
      <>
        {openModal && (
          <CostModal
            showModal={openModal}
            onOpenModal={handleOnOpenModal}
            onCloseModal={handleOnCloseModal}
            fetchData={fetchData}
            rowId={selectedRowId}
          />
        )}

        <Table hoverable className="text-right">
          <Table.Head>
            {colDefs.map((column,index) => (
              <Table.HeadCell key={index}>
                {column.headerName}
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
                {colDefs.map((column,index) => (
                  <Table.Cell
                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    key={index}
                  >
                    {
                      row[column.field]
                    }
                    {/* {column === 'cost' ? (
                      <button
                        type="button"
                        onClick={() => handleOnOpenModal(row.id)}
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                      >
                        ویرایش
                      </button>
                    ) : column === 'termsAndConditions' ? (
                      <a
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                        href={`terms/edit`}
                      >
                        ویرایش
                      </a>
                    ) : column === 'actions' ? (
                      <AdminGridActions
                        fetchData={fetchData}
                        rowId={row.id}
                        isActive={row.isActive}
                      />
                    ) : (
                      row[column]
                    )}{' '} */}
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
