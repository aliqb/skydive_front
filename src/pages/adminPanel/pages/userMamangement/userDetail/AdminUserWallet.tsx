import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import SDCard from '../../../../../components/shared/Card';
import SDTextInput from '../../../../../components/shared/TextInput';
import SDButton from '../../../../../components/shared/Button';
import { BaseResponse } from '../../../../../models/shared.models';
import useApi from '../../../../../hooks/useApi';
import { useParams } from 'react-router-dom';
import SDSpinner from '../../../../../components/shared/Spinner';
import {
  ChargeWalletData,
  WalletData,
} from '../../../../../models/wallet.models';
import NumberWithSeperator from '../../../../../components/shared/NumberWithSeperator';
import useConfirm from '../../../../../hooks/useConfirm';

const AdminUserWallet: React.FC = () => {
  const params = useParams();

  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [ConfirmModal, confirmation] = useConfirm(
    `آیا از شارژ کیف پول به مبلغ ${paymentAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ریال مطمئن هستید ؟     `,
    'شارژ کیف پول'
  );
  const {
    sendRequest,
    isPending,
    data: walletData,
  } = useApi<null, BaseResponse<WalletData>>();

  const { sendRequest: sendChargeRequest, isPending: isPendingChargeWallet } =
    useApi<ChargeWalletData, BaseResponse<null>>();

  const fetchWalletData = useCallback(() => {
    sendRequest({
      url: `/wallets/UserWallet/${params.userId}`,
    });
  }, [sendRequest, params.userId]);

  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  const handlePayment = useCallback(async () => {
    const confirm = await confirmation();
    if (confirm) {
      if (+paymentAmount > 0) {
        const data: ChargeWalletData = {
          userId: params.userId,
          amount: +paymentAmount,
        };

        sendChargeRequest(
          {
            url: '/wallets',
            method: 'put',
            data: data,
          },
          (response) => {
            toast.success(response.message);
            fetchWalletData();
            setPaymentAmount('');
          },
          (error) => {
            toast.error(error?.message);
          }
        );
      }
    }
  }, [paymentAmount, params.userId, sendChargeRequest, fetchWalletData]);

  const handlePaymentAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/,/g, '');
    value = value.replace(/[^\d-]/g, '');
    console.log(value);

    if (value === '-') {
      setPaymentAmount(value);
    } else {
      value = value.replace(/--/g, '');

      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setPaymentAmount(numericValue.toString());
      } else {
        setPaymentAmount('');
      }
    }
  };
  
  

  return (
    <SDCard className="flex items-center justify-center p-8 bg-red-500">
      <SDCard className="shadow rounded-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          شارژ کیف پول کاربر
        </h1>
        {isPending ? (
          <div className="flex justify-center pt-6 w-full">
            <SDSpinner size={20} color="blue" />
          </div>
        ) : (
          <>
            <ConfirmModal />
            <div className="flex items-center mb-8 flex-wrap justify-center">
              <div className="flex items-center ">
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
              </div>
              <span className="text-lg text-gray-800 ml-2">
                <NumberWithSeperator
                  value={walletData?.content.balance || 0}
                ></NumberWithSeperator>
                <span className="mr-1 text-sm">ریال</span>
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-4">
              <SDTextInput
                numeric={true}
                allowMinus={true}
                id="amount"
                placeholder="مبلغ مورد نظر را وارد کنید"
                className="ltr text-center placeholder:!text-center"
                value={paymentAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={handlePaymentAmountChange}
              />

              <SDButton
                type="submit"
                color="success"
                onClick={handlePayment}
                disabled={isPendingChargeWallet}
                className="w-full md:w-auto lg:w-1/3 "
              >
                {isPendingChargeWallet && <SDSpinner size={5} />}
                شارژ کیف پول
              </SDButton>
            </div>
          </>
        )}
      </SDCard>
    </SDCard>
  );
};

export default AdminUserWallet;
