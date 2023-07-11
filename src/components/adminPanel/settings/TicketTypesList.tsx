// TicketTypesList component
import React from 'react';
import { userType } from '../../../models/usermanagement.models';

const TicketTypesList: React.FC<{
  userType: userType;
  selectedTickets: string[];
  allowedTicketTypes: { [key: string]: string[] };
  handleAddTicket: (userType: userType, ticketTypeUserType: string) => void;
  handleRemoveTicket: (userType: string, ticket: string) => void;
}> = ({
  userType,
  selectedTickets,
  allowedTicketTypes,
  handleAddTicket,
  handleRemoveTicket,
}) => {
  const isSelectedTicket = (ticketType: string) =>
    selectedTickets.includes(ticketType);

  return (
    <ul className="space-y-2 p-4">
      {Object.entries(allowedTicketTypes).map(([ticketTypeUserType]) => {
        const isSelected = isSelectedTicket(ticketTypeUserType);

        return (
          <li
            key={ticketTypeUserType}
            className={`flex items-center justify-between ${
              isSelected ? 'text-red-700' : ''
            }`}
          >
            <span className="text-md">{ticketTypeUserType}</span>
            <div className="flex-grow flex">
              {isSelected ? (
                <button
                  className="px-2 py-1 rounded-md bg-red-200 ml-2 flex items-center flex-grow-0 mr-2"
                  onClick={() =>
                    handleRemoveTicket(userType.title, ticketTypeUserType)
                  }
                >
                  - حذف
                </button>
              ) : (
                <button
                  className="px-2 py-1 rounded-md bg-green-200 ml-2 flex items-center flex-grow-0  mr-2"
                  onClick={() => handleAddTicket(userType, ticketTypeUserType)}
                >
                  + افزودن
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TicketTypesList;
