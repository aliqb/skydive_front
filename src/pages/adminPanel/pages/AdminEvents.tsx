import React, { useEffect, useState } from 'react';
import Grid from '../../../components/shared/Grid';
import SDButton from '../../../components/shared/Button';
import SDDatepicker from '../../../components/shared/DatePicker';
import useAPi from '../../../hooks/useApi';
import {
  NewEvent,
  SkyDiveEventStatus,
  SkyDiveEvent,
} from '../../../models/skyDiveEvents.models';
import { BaseResponse } from '../../../models/shared.models';
import SDSpinner from '../../../components/shared/Spinner';
import AdminNewEvent from '../../../components/adminPanel/AdminNewEvent';

const AdminEvents: React.FC = () => {
  const { sendRequest, errors, isPending } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();
  const { sendRequest: eventStatusSendRequest, data: eventStatusData } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus[]>
  >();
  const { sendRequest: lastCodeSendRequest, data: lastCode } = useAPi<
    null,
    BaseResponse<string>
  >();
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [processedData, setProcessedData] = useState<SkyDiveEvent[]>([]);

  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const fetchEvents = () => {
    try {
      sendRequest(
        {
          url: '/SkyDiveEvents',
          params: {
            pagesize: 10,
            pageindex: 1,
            Statusid: selectedValue.toLowerCase(),
          },
        },
        (response) => {
          const processedData =
            response.content.map((item) => {
              const voidableString = item.voidable ? 'هست' : 'نیست';
              return { ...item, voidableString };
            }) || [];
          setProcessedData(processedData);
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [selectedValue]);

  useEffect(() => {
    const fetchEventStatuses = () => {
      try {
        eventStatusSendRequest({
          url: '/SkyDiveEventStatuses',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEventStatuses();
  }, []);

  useEffect(() => {
    const fetchLastCode = () => {
      try {
        lastCodeSendRequest({
          url: '/SkyDiveEvents/GetLastCode',
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLastCode();
  }, []);

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
          <SDButton color="success" onClick={handleButtonClick}>
            + جدید
          </SDButton>
        </div>

        <AdminNewEvent
          eventStatusData={eventStatusData}
          lastCode={lastCode?.content || ''}
          showModal={showModal}
          onOpenModal={handleButtonClick}
          onCloseModal={handleCloseModal}
          fetchData={fetchEvents}
        />

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
              {eventStatusData?.content.map((status, index) => (
                <option key={index} value={status.id} className="text-right">
                  {status.title}
                </option>
              ))}
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
          data={processedData}
          columnsToShow={[
            'code',
            'title',
            'startDate',
            'endDate',
            'location',
            'statusTitle',
            'voidableString',
            'termsAndConditions',
            'cost',
            'actions',
          ]}
          fetchData={fetchEvents}
        />
      </div>
    </>
  );
};

export default AdminEvents;
