import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../../hooks/useApi';
import { BaseResponse } from '../../../models/shared.models';
import { userType, ticketType } from '../../../models/usermanagement.models';
import SDSpinner from '../../shared/Spinner';
import { SkyDiveEventTicketType } from '../../../models/skyDiveEvents.models';

type UserType = userType['title'];
type UserTicket = ticketType['title'];

interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

const UserTypeSettings: React.FC = () => {
  const { sendRequest, isPending } = useApi<null, BaseResponse<userType[]>>();
  const { sendRequest: sendPostRequest, isPending: isPendingPost } = useApi<
    AssignTicketTypes,
    BaseResponse<null>
  >();
  const { sendRequest: getTicketTypesRequest } = useApi<
    null,
    BaseResponse<SkyDiveEventTicketType[]>
  >();
  const [selectedUserTypes, setSelectedUserTypes] = useState<UserType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key in UserType]: UserTicket[];
  }>({});
  const [userTypes, setUserTypes] = useState<userType[]>([]);
  const [isOpen, setIsOpen] = useState<{ [key in UserType]: boolean }>({});
  const [allowedTicketTypes, setAllowedTicketTypes] = useState<{
    [key in UserType]: UserTicket[];
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
        {} as { [key in UserType]: UserTicket[] }
      );
      setAllowedTicketTypes(ticketTypesByUserType);
    });
  }, [getTicketTypesRequest]);

  useEffect(() => {
    sendRequest({ url: '/UserTypes' }, (response) => {
      if (response?.content.length > 0) {
        setUserTypes(response.content);

        const initialSelectedTickets: { [key in UserType]: UserTicket[] } = {};

        response?.content.forEach((userType) => {
          initialSelectedTickets[userType.title] =
            userType.allowedTicketTypes.map((ticketType) => ticketType.title) ||
            [];
        });

        setSelectedTickets(initialSelectedTickets);
      }
    });
  }, [sendRequest]);

  const isTicketAllowedForUserType = (
    userType: UserType,
    ticket: UserTicket
  ) => {
    const userTypeObj = userTypes.find((u) => u.title === userType);
    if (userTypeObj) {
      const ticketObj = userTypeObj.allowedTicketTypes.find(
        (t) => t.title === ticket
      );
      return Boolean(ticketObj);
    }
    return false;
  };

  const handleUserTypeClick = (userType: UserType) => {
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

    setIsOpen((prevState) => ({
      ...prevState,
      [userType]: !prevState[userType],
    }));
  };

  const handleAddTicket = (userType: UserType, ticket: UserTicket) => {
    const userTypeObj = userTypes.find((u) => u.title === userType);

    if (userTypeObj) {
      const ticketObj = userTypeObj.allowedTicketTypes.find(
        (t) => t.title === ticket
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

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <SDSpinner size={20} />
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {userTypes.map((userType) => (
          <li
            key={userType.title}
            className={`flex flex-col ${
              selectedUserTypes.includes(userType.title)
                ? 'bg-black-200'
                : 'bg-white'
            }`}
            style={{
              border: '1px solid gray',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
            }}
          >
            <button
              className={`p-4 text-lg font-bold w-full text-right flex items-center ${
                selectedUserTypes.includes(userType.title)
                  ? 'text-blue-600'
                  : ''
              }`}
              onClick={() => handleUserTypeClick(userType.title)}
              style={{
                transition: 'color 0.3s',
              }}
            >
              <div className="flex items-center">
                {isOpen[userType.title] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                )}
                <span>{userType.title}</span>
              </div>
            </button>
            {selectedUserTypes.includes(userType.title) && (
              <ul className="space-y-2 p-4">
                {Object.entries(allowedTicketTypes).map(
                  ([ticketTypeUserType]) => (
                    <li
                      key={ticketTypeUserType}
                      className={`flex items-center justify-between ${
                        selectedTickets[userType.title] &&
                        selectedTickets[userType.title].includes(
                          ticketTypeUserType
                        )
                          ? 'text-red-700'
                          : ''
                      }`}
                    >
                      <span className="text-md">{ticketTypeUserType}</span>
                      <div>
                        {selectedTickets[userType.title] &&
                        selectedTickets[userType.title].includes(
                          ticketTypeUserType
                        ) ? (
                          <button
                            className="px-2 py-1 rounded-md bg-red-200 ml-2 flex items-center"
                            onClick={() =>
                              handleRemoveTicket(
                                userType.title,
                                ticketTypeUserType
                              )
                            }
                          >
                            - حذف
                          </button>
                        ) : (
                          <button
                            className="px-2 py-1 rounded-md bg-green-200 ml-2 flex items-center"
                            onClick={() =>
                              handleAddTicket(
                                userType.title,
                                ticketTypeUserType
                              )
                            }
                          >
                            + افزودن
                          </button>
                        )}
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserTypeSettings;
