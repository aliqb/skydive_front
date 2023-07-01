import React, { useState } from 'react';

type UserType = 'همراه با مربی' | 'آزاد' | 'ویژه';
type UserTicket = 'آزاد' | 'چارتر' | 'همراه با مربی' | 'ویژه';

const Settings: React.FC = () => {
  const [selectedUserTypes, setSelectedUserTypes] = useState<UserType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key in UserType]: UserTicket[];
  }>({});

  const handleUserTypeClick = (userType: UserType) => {
    if (selectedUserTypes.includes(userType)) {
      setSelectedUserTypes(
        selectedUserTypes.filter((type) => type !== userType)
      );
      setSelectedTickets((prevState) => {
        const newState = { ...prevState };
        delete newState[userType];
        return newState;
      });
    } else {
      setSelectedUserTypes([...selectedUserTypes, userType]);
      setSelectedTickets((prevState) => ({ ...prevState, [userType]: [] }));
    }
  };

  const handleAddTicket = (userType: UserType, ticket: UserTicket) => {
    setSelectedTickets((prevState) => ({
      ...prevState,
      [userType]: [...prevState[userType], ticket],
    }));
  };

  const handleRemoveTicket = (userType: UserType, ticket: UserTicket) => {
    setSelectedTickets((prevState) => ({
      ...prevState,
      [userType]: prevState[userType].filter((t) => t !== ticket),
    }));
  };

  const userTypes: UserType[] = ['همراه با مربی', 'آزاد', 'ویژه'];

  const allowedTicketTypes: { [key in UserType]: UserTicket[] } = {
    'همراه با مربی': ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
    آزاد: ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
    ویژه: ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
  };

  // const getUserTickets = (userType: UserType): UserTicket[] => {
  //   return selectedTickets[userType] || [];
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-2">نوع کاربر</h2>
        <ul>
          {userTypes.map((userType) => (
            <li
              key={userType}
              className={`py-1 px-2 rounded-md mb-1 cursor-pointer ${
                selectedUserTypes.includes(userType)
                  ? 'bg-blue-200'
                  : 'bg-white'
              }`}
              onClick={() => handleUserTypeClick(userType)}
            >
              {userType}
            </li>
          ))}
        </ul>
      </div>
      {selectedUserTypes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">نوع بلیت مرتبط</h3>
          {selectedUserTypes.map((userType) => (
            <div key={userType} className="mb-4">
              <h4 className="font-bold mb-2">{userType}</h4>
              <ul>
                {allowedTicketTypes[userType].map((ticketType) => (
                  <li key={ticketType} className="mb-2 flex items-center">
                    <span
                      className={`px-2 ml-4 py-1 rounded-md ${
                        selectedTickets[userType]?.includes(ticketType)
                          ? 'bg-green-200'
                          : 'bg-white'
                      }`}
                    >
                      {ticketType}
                    </span>
                    <button
                      className="px-2 py-1 rounded-md bg-green-200 ml-2 flex items-center"
                      onClick={() => handleAddTicket(userType, ticketType)}
                    >
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <span className="ml-2">افزودن</span>
                    </button>
                    {selectedTickets[userType]?.includes(ticketType) && (
                      <button
                        className="px-2 py-1 rounded-md bg-red-200 ml-2 flex items-center"
                        onClick={() => handleRemoveTicket(userType, ticketType)}
                      >
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
                            d="M19.5 12h-15"
                          />
                        </svg>
                        <span className="ml-2">حذف</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
