import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { BaseResponse } from '../../../models/shared.models';
import { userType } from '../../../models/usermanagement.models';
import SDSpinner from '../../shared/Spinner';
import UserTypesList from './UserTypesList';
import TicketTypesList from './TicketTypesList';
import { SkyDiveEventTicketType } from '../../../models/skyDiveEvents.models';

interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

const UserTypeSettings: React.FC = () => {
  const { sendRequest, isPending } = useApi<null, BaseResponse<userType[]>>();
  const { sendRequest: sendPostRequest } = useApi<
    AssignTicketTypes,
    BaseResponse<null>
  >();
  const { sendRequest: getTicketTypesRequest } = useApi<
    null,
    BaseResponse<SkyDiveEventTicketType[]>
  >();
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: string[];
  }>({});
  const [userTypes, setUserTypes] = useState<userType[]>([]);
  const [allowedTicketTypes, setAllowedTicketTypes] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    getTicketTypesRequest({ url: '/SkyDiveEventTicketType' }, (response) => {
      const ticketTypesByUserType = response.content.reduce(
        (acc, currentTicket) => {
          if (!acc[currentTicket.title]) {
            acc[currentTicket.title] = [];
          }
          acc[currentTicket.title].push(currentTicket.title);
          return acc;
        },
        {} as { [key: string]: string[] }
      );
      setAllowedTicketTypes(ticketTypesByUserType);
    });
  }, [getTicketTypesRequest]);

  useEffect(() => {
    sendRequest({ url: '/UserTypes' }, (response) => {
      if (response?.content.length > 0) {
        setUserTypes(response.content);

        const initialSelectedTickets: { [key: string]: string[] } = {};

        response?.content.forEach((userType) => {
          initialSelectedTickets[userType.title] =
            userType.allowedTicketTypes.map((ticketType) => ticketType.title) ||
            [];
        });

        setSelectedTickets(initialSelectedTickets);
      }
    });
  }, [sendRequest]);

  const handleUserTypeClick = (userType: string) => {
    if (selectedUserTypes.includes(userType)) {
      setSelectedUserTypes((prevSelectedUserTypes) =>
        prevSelectedUserTypes.filter((type) => type !== userType)
      );
    } else {
      setSelectedUserTypes((prevSelectedUserTypes) => [
        ...prevSelectedUserTypes,
        userType,
      ]);
    }
  };

  const handleAddTicket = (userType: userType, ticketTypeUserType: string) => {
    console.log('Adding ticket:', userType, ticketTypeUserType);

    const ticketObj = userType.allowedTicketTypes.find(
      (t) => t.title === ticketTypeUserType
    );
    if (ticketObj) {
      const assignTicketTypes: AssignTicketTypes = {
        userTypeId: userType.id,
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
  };

  const handleRemoveTicket = (userType: string, ticket: string) => {
    setSelectedTickets((prevState) => {
      const updatedTickets = { ...prevState };
      updatedTickets[userType] = prevState[userType].filter(
        (t) => t !== ticket
      );
      return updatedTickets;
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <SDSpinner size={20} />
      </div>
    );
  }

  return (
    <>
      <UserTypesList
        userTypes={userTypes}
        selectedUserTypes={selectedUserTypes}
        handleUserTypeClick={handleUserTypeClick}
      />
      {selectedUserTypes.map((selectedUserType) => {
        const userType = userTypes.find((u) => u.title === selectedUserType);
        if (userType) {
          return (
            <TicketTypesList
              key={selectedUserType}
              userType={userType}
              selectedTickets={selectedTickets}
              allowedTicketTypes={allowedTicketTypes}
              handleAddTicket={handleAddTicket}
              handleRemoveTicket={handleRemoveTicket}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default UserTypeSettings;
