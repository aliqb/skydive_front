import React, { useEffect, useState, useCallback, useRef } from "react";
import Grid from "../../../../components/shared/Grid/Grid";
import SDButton from "../../../../components/shared/Button";
import SDDatepicker from "../../../../components/shared/DatePicker";
import useAPi from "../../../../hooks/useApi";
import {
  NewEvent,
  SkyDiveEventStatus,
  SkyDiveEvent,
} from "../../../../models/skyDiveEvents.models";
import { BaseResponse } from "../../../../models/shared.models";
import AdminEventModal from "../../../../components/adminPanel/adminEvent/AdminEventModal";
import { ColDef, GridGetData, GridRef } from "../../../../components/shared/Grid/grid.types";
import StatusIndicator from "../../../../components/shared/StatusIndicator";
import { BiToggleLeft } from "react-icons/bi";
import { BsAirplaneEngines } from "react-icons/bs";
import useConfirm from "../../../../hooks/useConfirm";
import { toast } from "react-toastify";
import CostModal from "../../../../components/adminPanel/adminEvent/CostModal";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "../../../../components/adminPanel/adminEvent/TermsAndConditionsModal";

const AdminEvents: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndtDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SkyDiveEvent>();
  const [costTargetEvent, setCostTargetEvent] = useState<SkyDiveEvent>();
  const [termsTartgetEvent, setTermsTargetEvent] = useState<SkyDiveEvent>();
  const gridRef = useRef<GridRef>(null);
  const navigate = useNavigate();

  const { sendRequest, errors } = useAPi<
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

  const { sendRequest: publishRequest } = useAPi<null, BaseResponse<null>>();

  const [ConfirmModal, confirmation] = useConfirm(
    " رویداد شما حذف خواهد شد. آیا مطمئن هستید؟ ",
    "حذف کردن رویداد"
  );

  const handleCloseEntryModal = (submitted: boolean) => {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setEditingEvent(undefined);
    setCostTargetEvent(undefined);
    setShowModal(false);
  };

  const handleCloseTermsModal = (submitted: boolean) => {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setTermsTargetEvent(undefined);
  };

  const onCreate = () => {
    setShowModal(true);
  };

  const onEdit = (item: SkyDiveEvent) => {
    setEditingEvent(item);
    setShowModal(true);
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
      onClick: (item: SkyDiveEvent) => {
        setTermsTargetEvent(item);
      },
      template: "ویرایش",
    },
    {
      field: "",
      headerName: "بهای فروش",
      onClick: (item) => {
        setCostTargetEvent(item);
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
  ]);

  const fetchEvents = useCallback<GridGetData<SkyDiveEvent>>(
    (gridParams,setRows) => {
      sendRequest(
        {
          url: "/SkyDiveEvents",
          params: {
            pagesize: gridParams.pageSize,
            pageindex: gridParams.pageIndex,
            Statusid: selectedValue,
            start: startDate,
            end: endDate,
          },
        },
        (response) => {
          const processedData =
            response.content.map((item) => {
              const voidableString = item.voidable ? "هست" : "نیست";
              return { ...item, voidableString };
            }) || [];
          setRows(processedData, response.total)
        }
      );
    },
    [sendRequest, selectedValue, startDate, endDate]
  );

  const onRemove = async (item: SkyDiveEvent) => {
    const confirm = await confirmation();
    if (confirm) {
      sendDeleteRequest(
        {
          url: `/SkyDiveEvents/${item.id}`,
          method: "delete",
        },
        (response) => {
          toast.success(response.message);
          gridRef.current?.refresh();
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  };

  const onPublishEvent = (item: SkyDiveEvent) => {
    publishRequest(
      {
        url: `/SkyDiveEvents/PublishEvent/${item.id}`,
        method: "put",
      },
      (response) => {
        toast.success(response.message);
        gridRef.current?.refresh();
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  };


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


  if (errors) {
    return <div>Error: {errors.message}</div>;
  }

  return (
    <>
      <ConfirmModal />
      <AdminEventModal
        eventStatusData={eventStatusData?.content}
        lastCode={lastCode?.content || ""}
        showModal={showModal}
        onCloseModal={handleCloseEntryModal}
        eventData={editingEvent}
      />
      {costTargetEvent && (
        <CostModal
          onCloseModal={() => setCostTargetEvent(undefined)}
          rowId={costTargetEvent.id}
          showModal={!!costTargetEvent.id}
        />
      )}
      {termsTartgetEvent && (
        <TermsAndConditionsModal
          showModal={!!termsTartgetEvent}
          skyDiveEvent={termsTartgetEvent}
          onCloseModal={handleCloseTermsModal}
        />
      )}
      <div className="flex justify-between gap-3 flex-wrap">
        <div className="flex gap-6 ">
          <SDButton color="success" onClick={onCreate}>
            + جدید
          </SDButton>
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
        </div>

        <div className="flex items-center pl-2">
          <div>
            <p> تاریخ :</p>
          </div>
          <div className="mr-5">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="از :"
              value={startDate}
              onChange={setStartDate}
              onOpenPickNewDate={false}
            ></SDDatepicker>
          </div>
          <div className="mr-1">
            <SDDatepicker
              inputClass=" !xs:w-40 text-center !bg-white border-slate-500"
              name="expireDate"
              required={true}
              placeholder="تا :"
              value={endDate}
              onChange={setEndtDate}
              onOpenPickNewDate={false}
            ></SDDatepicker>
          </div>
          {/* <SDButton className="w-10 h-full mr-1" color="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </SDButton> */}
        </div>
      </div>
      <div className="mt-6">
        <Grid<SkyDiveEvent>
          getData={fetchEvents}
          colDefs={colDefs}
          onEditRow={onEdit}
          ref={gridRef}
          onRemoveRow={onRemove}
          rowActions={{
            edit: true,
            remove: true,
            otherActions: [
              {
                icon: <BiToggleLeft size="1.5rem" color="#e02424" />,
                descriptions: "فعال کردن",
                showField:'!isActive',
                // disableField: '!isActive',
                onClick: onPublishEvent,
              },
            ],
            moreActions: [
              {
                icon: <BsAirplaneEngines size="1.5rem" />,
                descriptions: "پروازها",
                onClick: (item) => {
                  navigate(`${item.id}/flights`);
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
