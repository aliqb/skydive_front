import React, { useState } from 'react';

type UserType = 'همراه با مربی' | 'آزاد' | 'ویژه';
type UserTicket = 'آزاد' | 'چارتر' | 'همراه با مربی' | 'ویژه';

const Settings: React.FC = () => {
  const [selectedUserTypes, setSelectedUserTypes] = useState<UserType[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<{
    [key in UserType]: UserTicket[];
  }>({
    'همراه با مربی': [],
    آزاد: [],
    ویژه: [],
  });

  const handleUserTypeClick = (userType: UserType) => {
    if (selectedUserTypes.includes(userType)) {
      setSelectedUserTypes(
        selectedUserTypes.filter((type) => type !== userType)
      );
    } else {
      setSelectedUserTypes([...selectedUserTypes, userType]);
    }
  };

  const handleAddTicket = (userType: UserType, ticket: UserTicket) => {
    setSelectedTickets((prevState) => {
      const updatedTickets = { ...prevState };
      updatedTickets[userType] = [...prevState[userType], ticket];
      return updatedTickets;
    });
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

  const userTypes: UserType[] = ['همراه با مربی', 'آزاد', 'ویژه'];

  const allowedTicketTypes: { [key in UserType]: UserTicket[] } = {
    'همراه با مربی': ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
    آزاد: ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
    ویژه: ['آزاد', 'چارتر', 'همراه با مربی', 'ویژه'],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">نوع کاربر</h2>
        <ul className="space-y-4">
          {userTypes.map((userType) => (
            <li
              key={userType}
              className={`flex flex-col ${
                selectedUserTypes.includes(userType)
                  ? 'bg-black-200 text-blue-600'
                  : 'bg-white'
              }`}
              style={{
                border: '1px solid gray',
                borderRadius: '0.5rem',
              }}
            >
              <button
                className={`p-4 text-lg font-bold w-full text-right ${
                  selectedUserTypes.includes(userType) ? 'text-blue' : ''
                }`}
                onClick={() => handleUserTypeClick(userType)}
              >
                {userType}
              </button>
              {selectedUserTypes.includes(userType) && (
                <ul className="space-y-2 p-4">
                  {allowedTicketTypes[userType].map((ticketType) => (
                    <li
                      key={ticketType}
                      className={`flex items-center ${
                        selectedTickets[userType]?.includes(ticketType)
                          ? 'text-blue-600'
                          : 'text-black'
                      }`}
                    >
                      <span
                        className={`px-2 ml-4 py-1 rounded-md ${
                          selectedTickets[userType]?.includes(ticketType)
                            ? 'bg-green-200'
                            : 'bg-white'
                        }`}
                      >
                        {ticketType}
                      </span>
                      {!selectedTickets[userType]?.includes(ticketType) && (
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
                      )}
                      {selectedTickets[userType]?.includes(ticketType) && (
                        <button
                          className={`px-2 py-1 rounded-md bg-red-200 ml-2 flex items-center ${
                            selectedTickets[userType]?.includes(ticketType)
                              ? 'text-black'
                              : ''
                          }`}
                          onClick={() =>
                            handleRemoveTicket(userType, ticketType)
                          }
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
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
