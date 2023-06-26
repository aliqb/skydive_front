import { Table } from 'flowbite-react';
import React, { useState } from 'react';
import AdminGridActions from '../adminPanel/AdminGridActions';
import CostModal from '../adminPanel/CostModal';
interface GridProps {
  data: Record<string, any>[];
  columnsToShow: string[];
  fetchData: () => void;
}
interface HeaderTranslations {
  [key: string]: string;
}
const translateHeader = (header: string, translations: HeaderTranslations) => {
  return translations[header] || header;
};

const Grid: React.FC<GridProps> = ({ data, columnsToShow, fetchData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState('');

  const headerTranslations: HeaderTranslations = {
    code: 'کد کاربر',
    nationalCode: 'کدملی',
    firstName: 'نام ',
    lastName: 'نام خانوادگی',
    userType: 'نوع کاربر',
    phone: 'موبایل',
    birthDate: 'تاریخ تولد',
    username: 'نام کاربری',
    email: 'ایمیل',
    statusDisplay: 'وضعیت',
    title: 'نام',
    startDate: 'شروع',
    endDate: 'پایان',
    location: 'محل رویداد',
    statusTitle: 'وضعیت',
    voidableString: 'قابل لغو',
    termsAndConditions: 'قوانین و شرایط',
    cost: 'بهای فروش',
    actions: 'عملیات',
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
            {columnsToShow.map((column) => (
              <Table.HeadCell key={column}>
                {translateHeader(column, headerTranslations)}
              </Table.HeadCell>
            ))}
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
                    {column === 'cost' ? (
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
                    )}{' '}
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
