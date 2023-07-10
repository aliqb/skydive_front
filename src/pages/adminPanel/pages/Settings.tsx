import React, { useState, useEffect } from 'react';
import useApi from '../../../hooks/useApi';
import { userType, ticketType } from '../../../models/usermanagement.models';
import { BaseResponse } from '../../../models/shared.models';
import SDSpinner from '../../../components/shared/Spinner';
import SDCard from '../../../components/shared/Card';
import { toast } from 'react-toastify';

type UserType = userType['title'];
type UserTicket = ticketType['title'];

interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

const Settings: React.FC = () => {
  const { sendRequest, isPending } = useApi<null, BaseResponse<userType[]>>();
  const { sendRequest: sendPostRequest, isPending: inPendingPost } = useApi<
    AssignTicketTypes,
    BaseResponse<null>
  >();
  const [selectedUserTypes, setSelectedUserTypes] = useState<UserType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key in UserType]: UserTicket[];
  }>({
    'همراه با مربی': [],
    آزاد: [],
    ویژه: [],
  });
  const [userTypes, setUserTypes] = useState<userType[]>([]);
  const [isOpen, setIsOpen] = useState<{ [key in UserType]: boolean }>({
    'همراه با مربی': false,
    آزاد: false,
    ویژه: false,
  });

  useEffect(() => {
    sendRequest(
      {
        url: '/UserTypes',
      },
      (response) => {
        if (response?.content.length > 0) {
          setUserTypes(response.content);

          const initialSelectedTickets: {
            [key in UserType]: UserTicket[];
          } = {
            'همراه با مربی': [],
            آزاد: [],
            ویژه: [],
          };

          response?.content.forEach((userType) => {
            initialSelectedTickets[userType.title] =
              userType.allowedTicketTypes.map(
                (ticketType) => ticketType.title
              ) || [];
          });

          setSelectedTickets(initialSelectedTickets);
        }
      }
    );
  }, [sendRequest]);

  const handleUserTypeClick = (userType: UserType) => {
    if (selectedUserTypes.includes(userType)) {
      setSelectedUserTypes(
        selectedUserTypes.filter((type) => type !== userType)
      );
    } else {
      setSelectedUserTypes([...selectedUserTypes, userType]);
    }

    setIsOpen((prevState) => ({
      ...prevState,
      [userType]: !prevState[userType],
    }));
  };

  const handleAddTicket = (userType: UserType, ticket: UserTicket) => {
    const userTypeObj = userTypes.find((u) => u.title === userType);

    if (userTypeObj) {
      const ticketObj = userTypeObj.allowedTicketTypes.find(
        (ticketType) => ticketType.title === ticket
      );

      if (ticketObj) {
        const assignTicketTypes: AssignTicketTypes = {
          userTypeId: userTypeObj.id,
          ticketTypes: [ticketObj.id],
        };

        sendPostRequest(
          {
            url: '/UserTypes/AssignTicketType',
            method: 'post',
            data: assignTicketTypes,
          },
          (response) => {
            toast.success(response.message);
          },
          (error) => {
            toast.error(error?.message);
          }
        );
      }
    }
  };

  const handleRemoveTicket = (userType: UserType, ticket: UserTicket) => {
    setSelectedTickets((prevState) => {
      const updatedTickets = { ...prevState };
      updatedTickets[userType] = prevState[userType].filter(
        (t) => t !== ticket
      );
      return updatedTickets;
    });
  };

  const allowedTicketTypes: { [key in UserType]: UserTicket[] } = {
    'همراه با مربی': ['همراه با مربی', 'آزاد', 'چارتر', 'ویژه'],
    آزاد: ['همراه با مربی', 'آزاد', 'چارتر', 'ویژه'],
    ویژه: ['همراه با مربی', 'آزاد', 'چارتر', 'ویژه'],
  };

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <SDSpinner size={20} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      <section className="w-full lg:w-1/2 p-2">
        <SettingsSectionCard title="تنظیمات عمومی">
          <GeneralSettings />
        </SettingsSectionCard>
      </section>
      <section className="w-full lg:w-1/2 p-2">
        <SettingsSectionCard title="انواع کاربر و بلیت‌های مجاز">
          <UserTypeSettings />
        </SettingsSectionCard>
      </section>
    </div>
  );
};

export default Settings;
