import React from 'react';

type UserType = 'همراه با مربی' | 'آزاد' | 'ویژه';

const Settings: React.FC = () => {
  const userTypes: UserType[] = ['همراه با مربی', 'آزاد', 'ویژه'];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-2">انواع کاربر</h2>
        <ul>
          {userTypes.map((userType, index) => (
            <li key={index} className="py-1 px-2 rounded-md bg-white mb-1">
              {userType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
