import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SDCard from '../../../../../components/shared/Card';
import SDTextInput from '../../../../../components/shared/TextInput';
import SDButton from '../../../../../components/shared/Button';
import { BaseResponse } from '../../../../../models/shared.models';
import useAPi from '../../../../../hooks/useApi';
import { useParams } from 'react-router-dom';
import SDSpinner from '../../../../../components/shared/Spinner';

interface WalletData {
  userId: string;
  balance: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface chargeWalletData {
  userId: string | undefined;
  amount: number;
}

const AdminUserWallet: React.FC = () => {
  const params = useParams();

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const {
    sendRequest,
    isPending,
    data: walletData,
  } = useAPi<null, BaseResponse<WalletData>>();
  const { sendRequest: sendChargeRequest, isPending: isPendingChargeWallet } =
    useAPi<null, BaseResponse<null>>();
  const fetchWalletData = () => {
    sendRequest({
      url: `/wallets/UserWallet/${params.userId}`,
    });
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handlePayment = () => {
    if (paymentAmount > 0) {
      const data: chargeWalletData = {
        userId: params.userId,
        amount: paymentAmount,
      };

      sendChargeRequest(
        {
          url: '/wallets',
          method: 'put',
          data: data,
        },
        (response) => {
          toast.success(response.message);
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <SDSpinner size={20} color="blue" />
      </div>
    );
  }

  return (
    <SDCard className="flex items-center justify-center p-8 bg-red-500">
      <SDCard className="shadow rounded-lg w-1/2 sm:w-full sm:max-w-screen-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          شارژ کیف پول کاربر
        </h1>

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
            {walletData?.content ? walletData.content.balance : ''}
          </span>
        </div>
        <div className="flex items-center justify-center w-full space-x-4">
          <h1 className="text-center ml-5 w-1/4">شارژ کیف پول</h1>
          <SDTextInput
            numeric={true}
            id="minutes"
            placeholder="مبلغ مورد نظر را وارد کنید"
            className="ltr text-center placeholder:!text-center"
            value={paymentAmount}
            onChange={(event) =>
              setPaymentAmount(parseInt(event.target.value, 10))
            }
          />
          <SDButton
            type="submit"
            color="success"
            onClick={handlePayment}
            disabled={isPendingChargeWallet}
          >
            {isPendingChargeWallet && <SDSpinner size={5} />}
            پرداخت
          </SDButton>
        </div>
      </SDCard>
    </SDCard>
  );
};

export default AdminUserWallet;
