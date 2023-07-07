import React, { useState } from 'react';
import { UserMessage } from '../../../models/messages.models';
import useApi from '../../../hooks/useApi';
import { BaseResponse } from '../../../models/shared.models';
import SDCard from '../../shared/Card';
import { toast } from 'react-toastify';
import SDSpinner from '../../shared/Spinner';
import SDButton from '../../shared/Button';

const MessagesItem: React.FC<UserMessage> = (props) => {
  const { sendRequest, isPending } = useApi<null, BaseResponse<null>>();

  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const [isRead, setIsRead] = useState(props.visited);

  const maxLength = 80;

  const handleMoreClick = () => {
    setIsFullTextShown(true);
  };

  const displayedText = isFullTextShown
    ? props.text
    : `${props.text.substring(0, maxLength)}...`;

  const shouldShowMoreButton =
    !isFullTextShown && props.text.length > maxLength;

  const textClass = isRead ? 'text-black-400' : 'text-blue-400';

  const markAsRead = () => {
    sendRequest(
      {
        url: `/UserMessages/${props.id}`,
        method: 'put',
      },
      (response) => {
        toast.success(response.message);
        setIsRead(true);
      }
    );
  };

  return (
    <SDCard className='mb-2 !border'>
      <div
        className={`flex gap-11 items-center   pb-6 ${
          isRead ? 'read' : 'unread'
        }`}
      >
        <div className="hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-w-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>
        <div className="flex flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="flex mb-5 items-center">
              <p className="text-green-400 text-sm">در {props.createdAt}</p>
            </div>
            <div className="flex mb-5 items-center">
              <p className="text-black-400 font-bold">{props.title}</p>
            </div>
            <div className="flex mb-5 items-center">
              <p className={textClass}>{displayedText}</p>
              {shouldShowMoreButton && (
                <button onClick={handleMoreClick} className="text-blue-500">
                  بیشتر
                </button>
              )}
            </div>
            {!isRead && (
              <div className="flex items-center ">
                <SDButton
                  onClick={markAsRead}
                  className="read-button hover:bg-gray-200 transition-colors duration-300 bg-orange-400 text-white rounded ml-4 text-sm"
                  style={{ backgroundColor: 'rgb(245, 158, 11)' }}
                  disabled={isPending}
                >
                  <span className="flex items-center">
                    {isPending && <SDSpinner />}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline-block mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    علامت‌گذاری به عنوان خوانده شده
                  </span>
                </SDButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </SDCard>
  );
};

export default MessagesItem;
