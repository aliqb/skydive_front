import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { BaseResponse } from '../../../models/shared.models';
import { userType as UserTypeModel } from '../../../models/usermanagement.models';
import SDSpinner from '../../shared/Spinner';
import UserTypesList from './UserTypesList';
import { SkyDiveEventTicketType } from '../../../models/skyDiveEvents.models';

interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

const UserTypeSettings: React.FC = () => {
  const { sendRequest, isPending } = useApi<
    null,
    BaseResponse<UserTypeModel[]>
  >();
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
  const [userTypes, setUserTypes] = useState<UserTypeModel[]>([]);
  const [allowedTicketTypes, setAllowedTicketTypes] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    getTicketTypesRequest({ url: '/SkyDiveEventTicketType' }, (response) => {
      const ticketTypesByUserType = response.content.reduce(
        (acc, currentTicket) => {
          return {
            ...acc,
            [currentTicket.title]: [currentTicket.title],
          };
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
        setSelectedTickets(
          response.content.reduce((acc, userType) => {
            return {
              ...acc,
              [userType.title]: userType.allowedTicketTypes.map(
                (ticketType) => ticketType.title
              ),
            };
          }, {})
        );
      }
    });
  }, [sendRequest]);

  const handleUserTypeClick = (userType: string) => {
    setSelectedUserTypes((prevSelectedUserTypes) => {
      const newSelectedUserTypes = [...prevSelectedUserTypes];
      const userTypeIndex = newSelectedUserTypes.indexOf(userType);
      if (userTypeIndex !== -1) {
        newSelectedUserTypes.splice(userTypeIndex, 1);
      } else {
        newSelectedUserTypes.push(userType);
      }
      return newSelectedUserTypes;
    });
  };

  const handleAddTicket = (userType: string, ticketTypeUserType: string) => {
    const assignTicketTypes: AssignTicketTypes = {
      userTypeId: userType,
      ticketTypes: [ticketTypeUserType],
    };

    sendPostRequest(
      {
        url: '/UserTypes/AssignTicketType',
        method: 'post',
        data: assignTicketTypes,
      },
      (response) => {
        setSelectedTickets((prevState) => {
          return {
            ...prevState,
            [userType]: [...prevState[userType], ticketTypeUserType],
          };
        });
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
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
    <UserTypesList
      userTypes={userTypes}
      selectedUserTypes={selectedUserTypes}
      handleUserTypeClick={handleUserTypeClick}
      allowedTicketTypes={allowedTicketTypes}
      handleAddTicket={handleAddTicket}
      handleRemoveTicket={handleRemoveTicket}
      selectedTickets={selectedTickets}
    />
  );
};

export default UserTypeSettings;
