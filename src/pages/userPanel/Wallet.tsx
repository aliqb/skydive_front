import React, { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { BaseResponse } from '../../models/shared.models';
import SDSpinner from '../../components/shared/Spinner';
import SDCard from '../../components/shared/Card';

interface WalletData {
  userId: string;
  balance: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const Wallet: React.FC = () => {
  const {
    sendRequest,
    isPending,
    data: walletData,
  } = useApi<null, BaseResponse<WalletData>>();

  const fetchWalletData = () => {
    sendRequest({
      url: '/wallets',
    });
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return (
    <SDCard className="flex items-center justify-center min-h-screen p-8 bg-red-500">
      {isPending ? (
        <div className="flex justify-center my-12">
          <SDSpinner size={20} />
        </div>
      ) : (
        <SDCard className="shadow rounded-lg w-1/2 mb-16 sm:w-full sm:max-w-screen-md">
          <h1 className="text-3xl font-bold mb-4">کیف پول کاربر</h1>

          <div className="flex items-center mb-4">
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
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>

            <span className="text-xl m-4 text-gray-600">موجودی :</span>
            <span className="text-lg text-gray-800 ml-2">
              {walletData?.content.balance}
            </span>
          </div>
        </SDCard>
      )}
    </SDCard>
  );
};

export default Wallet;
