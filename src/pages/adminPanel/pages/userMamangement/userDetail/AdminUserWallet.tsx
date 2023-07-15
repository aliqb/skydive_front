import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SDCard from '../../../../../components/shared/Card';
import SDTextInput from '../../../../../components/shared/TextInput';
import SDButton from '../../../../../components/shared/Button';

const AdminUserWallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handlePaymentAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = parseInt(event.target.value, 10);
    setPaymentAmount(amount);
  };

  const handlePayment = () => {
    if (paymentAmount > 0) {
      const newBalance = balance + paymentAmount;
      setBalance(newBalance);
      toast.success('موجودی با موفقیت به روز شد!');
    }
  };

  return (
    <SDCard className="flex items-center justify-center min-h-screen p-8 bg-red-500">
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
          <span className="text-lg text-gray-800 ml-2">{balance}</span>
        </div>
        <div className="flex items-center justify-center w-full space-x-4">
          <h1 className="text-center ml-5 w-1/4">شارژ کیف پول</h1>
          <SDTextInput
            numeric={true}
            id="minutes"
            placeholder="مبلغ مورد نظر را وارد کنید"
            className="ltr text-center placeholder:!text-center"
            value={paymentAmount}
            onChange={handlePaymentAmountChange}
          />
          <SDButton type="submit" color="success" onClick={handlePayment}>
            پرداخت
          </SDButton>
        </div>
      </SDCard>
    </SDCard>
  );
};

export default AdminUserWallet;
