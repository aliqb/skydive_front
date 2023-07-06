import React, { useEffect } from 'react';
import { FaWallet } from 'react-icons/fa';
import useApi from '../../hooks/useApi';
import { BaseResponse } from '../../models/shared.models';
import SDSpinner from '../../components/shared/Spinner';

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
    <div className="flex items-center justify-center h-screen">
      {isPending ? (
        <div className="flex justify-center my-12">
          <SDSpinner size={20} />
        </div>
      ) : (
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4">کیف پول کاربر</h2>
          <div className="flex items-center mb-4">
            <FaWallet className="text-gray-500 mr-2 text-2xl" />
            <span className="text-gray-600">User ID:</span>
            <span className="text-gray-800 ml-2">
              {walletData?.content.userId}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaWallet className="text-gray-500 mr-2 text-2xl" />
            <span className="text-gray-600">Balance:</span>
            <span className="text-gray-800 ml-2">
              {walletData?.content.balance}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <FaWallet className="text-gray-500 mr-2 text-2xl" />
            <span className="text-gray-600">ID:</span>
            <span className="text-gray-800 ml-2">{walletData?.content.id}</span>
          </div>
          <div className="flex items-center mt-4">
            <FaWallet className="text-gray-500 mr-2 text-2xl" />
            <span className="text-gray-600">Total:</span>
            <span className="text-gray-800 ml-2">{walletData?.total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
