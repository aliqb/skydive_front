import React from 'react';
import { userType } from '../../../models/usermanagement.models';

const UserTypesList: React.FC<{
  userTypes: userType[];
  selectedUserTypes: string[];
  handleUserTypeClick: (userType: string) => void;
  isOpen: { [key: string]: boolean };
}> = ({ userTypes, selectedUserTypes, handleUserTypeClick, isOpen }) => (
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
            selectedUserTypes.includes(userType.title) ? 'text-blue-600' : ''
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
      </li>
    ))}
  </ul>
);

export default UserTypesList;
