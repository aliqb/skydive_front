import React, { useEffect, useState } from 'react';
import SDSpinner from '../../components/shared/Spinner';
import { UserMessages } from '../../models/messages.models';
import { BaseResponse } from '../../models/shared.models';
import useAPi from '../../hooks/useApi';
import MessagesItem from '../../components/userPanel/Messages/MessagesItem';
import SDCard from '../../components/shared/Card';

const Messages: React.FC = () => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<UserMessages[]>
  >();
  const fetchUserMessages = () => {
    sendRequest({
      url: '/UserMessages',
      params: {
        pageSize: 1000000000,
        pageIndex: 1,
      },
    });
  };

  useEffect(() => {
    fetchUserMessages();
  }, []);


  const loading = (
    <div className="flex justify-center pt-6 w-full">
      <SDSpinner size={20} />
    </div>
  );

  const body = (
    <>
      <div className="w-full lg:w-9/12">
        {data &&
          data.content.map((item, index) => {
            return <MessagesItem key={index} {...item} />;
          })}
      </div>
    </>
  );

  return (
    <SDCard className="border flex flex-col mb-6 px-12">
      <div>
        {isPending && loading}
        {data && !isPending && body}
      </div>
    </SDCard>
  );
};

export default Messages;
