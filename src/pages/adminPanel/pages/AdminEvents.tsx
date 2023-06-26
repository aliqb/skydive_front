import React, { useEffect, useState, useCallback } from "react";
import Grid from "../../../components/shared/Grid/Grid";
import SDButton from "../../../components/shared/Button";
import SDDatepicker from "../../../components/shared/DatePicker";
import useAPi from "../../../hooks/useApi";
import {
  NewEvent,
  SkyDiveEventStatus,
  SkyDiveEvent,
} from "../../../models/skyDiveEvents.models";
import { BaseResponse } from "../../../models/shared.models";
import SDSpinner from "../../../components/shared/Spinner";
import AdminEventModal from "../../../components/adminPanel/AdminEventModal";
import { ColDef } from "../../../components/shared/Grid/grid.types";
import StatusIndicator from "../../../components/shared/StatusIndicator";
import { BiToggleLeft } from "react-icons/bi";
import { BsAirplaneEngines } from "react-icons/bs";
import useConfirm from "../../../hooks/useConfirm";
import { toast } from "react-toastify";

const AdminEvents: React.FC = () => {
  const { sendRequest, errors, isPending } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();

  const { sendRequest: sendDeleteRequest } = useAPi<
    null,
    BaseResponse<string>
  >();

  const { sendRequest: eventStatusSendRequest, data: eventStatusData } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus[]>
  >();
  const { sendRequest: lastCodeSendRequest, data: lastCode } = useAPi<
    null,
    BaseResponse<string>
  >();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<SkyDiveEvent>();
  const [processedData, setProcessedData] = useState<SkyDiveEvent[]>([]);

  const [ConfirmModal, confirmation] = useConfirm(
    " رویداد شما حذف خواهد شد. آیا مطمئن هستید؟ ",
    "حذف کردن رویداد"
  );

  const handleCloseModal = (submitted: boolean) => {
    if (submitted) {
      fetchEvents(selectedValue);
    }
    setCurrentEvent(undefined);
    setShowModal(false);
  };

  const onCreate = () => {
    setShowModal(true);
  };

  const onEdit = (item: SkyDiveEvent) => {
    setCurrentEvent(item);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  const [colDefs] = useState<ColDef<SkyDiveEvent>[]>([
    {
      field: "code",
      headerName: "کد",
    },
    {
      field: "title",
      headerName: "عنوان",
    },

    {
      field: "startDate",
      headerName: "تاریخ شروع",
    },

    {
      field: "endDate",
      headerName: "تاریخ پایان",
    },
    {
      field: "location",
      headerName: "محل رویداد",
    },
    {
      field: "statusTitle",
      headerName: "وضعیت",
    },
    {
      field: "voidableString",
      headerName: "قابل لغو",
    },
    {
      field: "",
      headerName: "قوانین و شرایط",
      onClick: (item) => {
        console.log(item);
      },
      template: "ویرایش",
    },
    {
      field: "",
      headerName: "بهای فروش",
      onClick: (item) => {
        console.log(item);
      },
      template: "ویرایش",
    },
    {
      field: "",
      headerName: "",
      cellRenderer: (item) => (
        <StatusIndicator isActive={item.isActive}></StatusIndicator>
      ),
    },
    // {
    //   field: 'termsAndConditions',
    //   headerName: 'کد',
    // },
    // {
    //   field: 'cost',
    //   headerName: 'کد',
    // },
    // {
    //   field: 'code',
    //   headerName: 'کد',
    // },
  ]);

  const fetchEvents = useCallback(
    (selectedStatus: string) => {
      sendRequest(
        {
          url: "/SkyDiveEvents",
          params: {
            pagesize: 10,
            pageindex: 1,
            Statusid: selectedStatus,
          },
        },
        (response) => {
          const processedData =
            response.content.map((item) => {
              const voidableString = item.voidable ? "هست" : "نیست";
              return { ...item, voidableString };
            }) || [];
          setProcessedData(processedData);
        }
      );
    },
    [sendRequest]
  );

  const onRemove = async (item: SkyDiveEvent) => {
    const confirm = await  confirmation();
    if (confirm) {
      sendDeleteRequest({
        url: `/SkyDiveEvents/${item.id}`,
        method: "delete",
      },(response)=>{
        toast.success(response.message);
        fetchEvents(selectedValue);
      },(error)=>{
        toast.error(error?.message)
      });
    }
  };

  useEffect(() => {
    fetchEvents(selectedValue);
  }, [selectedValue, sendRequest, fetchEvents]);

  useEffect(() => {
    const fetchEventStatuses = () => {
      try {
        eventStatusSendRequest({
          url: "/SkyDiveEventStatuses",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventStatuses();
  }, [eventStatusSendRequest]);

  useEffect(() => {
    const fetchLastCode = () => {
      try {
        lastCodeSendRequest({
          url: "/SkyDiveEvents/GetLastCode",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLastCode();
  }, [lastCodeSendRequest]);

  useEffect(() => {
    if (currentEvent) {
      setShowModal(true);
    }
  }, [currentEvent]);

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
      <ConfirmModal />
      <div className="flex justify-between mt-12">
        <div>
          <SDButton color="success" onClick={onCreate}>
            + جدید
          </SDButton>
        </div>

        <AdminEventModal
          eventStatusData={eventStatusData?.content}
          lastCode={lastCode?.content || ""}
          showModal={showModal}
          onCloseModal={handleCloseModal}
          eventData={currentEvent}
        />

        {/* <AdminEventModal
          eventStatusData={eventStatusData?.content}
          lastCode={lastCode?.content || ""}
          showModal={showModal}
          onOpenModal={handleButtonClick}
          onCloseModal={handleCloseModal}
        /> */}

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
        <Grid<SkyDiveEvent>
          data={processedData}
          colDefs={colDefs}
          onEditRow={onEdit}
          onRemoveRow={onRemove}
          rowActions={{
            edit: true,
            remove: true,
            otherActions: [
              {
                icon: <BiToggleLeft size="1.5rem" color="#e02424" />,
                descriptions: "فعال کردن",
                // showField:'isActive',
                // disableField: '!isActive',
                onClick: (item) => {
                  console.log(item);
                },
              },
            ],
            moreActions: [
              {
                icon: <BsAirplaneEngines size="1.5rem" />,
                descriptions: "پروازها",
                onClick: (item) => {
                  console.log(item);
                },
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default AdminEvents;
