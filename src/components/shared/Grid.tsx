import { Table } from 'flowbite-react';
import React from 'react';
import StatusIndicator from './StatusIndicator';
import useAPi from '../../hooks/useApi';
import { BaseResponse } from '../../models/shared.models';
import { toast } from 'react-toastify';
import useConfirm from '../../hooks/useConfirm';
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
  const { sendRequest, errors, isPending } = useAPi<BaseResponse<string>>();

  const [ConfirmModal, confirmation] = useConfirm(
    ' رویداد شما حذف خواهد شد. آیا مطمئن هستید؟ ',
    'حذف کردن رویداد'
  );
  const handleEditOnClick = () => {
    console.log('edited');
  };
  const handleMoreOnClick = () => {
    console.log('More clicked');
  };

  const handleDeleteOnClick = (id: string) => {
    confirmation().then((confirmed) => {
      if (confirmed) {
        sendRequest(
          {
            url: `/SkyDiveEvents/${id}`,
            method: 'delete',
          },
          (response) => {
            console.log('Response:', response);
            toast.success(response.message);
            fetchData();
          },
          (error) => {
            console.log('Error:', error);
            toast.error(error?.message);
          }
        );
      }
    });
  };

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
  {
    return (
      <>
        <ConfirmModal />

        <Table hoverable className="text-right">
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
                    {column === 'cost' ? (
                      <a
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                        href={`cost/edit`}
                      >
                        ویرایش
                      </a>
                    ) : column === 'termsAndConditions' ? (
                      <a
                        className="font-medium text-cyan-600 dark:text-cyan-500"
                        href={`terms/edit`}
                      >
                        ویرایش
                      </a>
                    ) : column === 'actions' ? (
                      <div className="flex items-center">
                        <button onClick={handleEditOnClick}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-cyan-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                        <button onClick={handleMoreOnClick} className="mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5  text-cyan-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteOnClick(row.id)}
                          className="mr-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      row[column]
                    )}
                  </Table.Cell>
                ))}
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
};
export default Grid;
