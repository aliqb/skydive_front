import React from 'react';
import SDSpinner from '../../components/shared/Spinner';
import MessagesItem from '../../components/userPanel/Messages/MessagesItem';
import SDCard from '../../components/shared/Card';
import { useAppSelector } from '../../hooks/reduxHooks';

const Messages: React.FC = () => {

  const messagesState = useAppSelector(state=>state.messages);

  const loading = (
    <div className="flex justify-center pt-6 w-full">
      <SDSpinner size={20} />
    </div>
  );

  const body = (
    <>
      <div className="w-full lg:w-9/12">
        {
          messagesState.messages.map((item, index) => {
            return <MessagesItem key={index} {...item} />;
          })}
      </div>
    </>
  );

  return (
    <SDCard className="border flex flex-col mb-6 px-12 !border-red">
      <div className='flex justify-center'>
        {messagesState.isLoading && loading}
        {messagesState.messages.length > 0 && !messagesState.isLoading && body}
      </div>
    </SDCard>
  );
};

export default Messages;
