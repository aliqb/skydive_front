import { useForm } from 'react-hook-form';
import SDLabel from '../Label';
import SDModal from '../Modal';
import SDTextInput from '../TextInput';
import { useState, useEffect } from 'react';
import SDButton from '../Button';
import useAPi from '../../../hooks/useApi';
import { BaseResponse, UserId } from '../../../models/shared.models';

interface AddTicketModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (userCode: number) => void;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState<boolean>(show);
  const [owner, setOwner] = useState<'self' | 'other'>('self');
  const [fullName, setFullName] = useState<string | null>(null);
  const [fullNameFetched, setFullNameFetched] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  const { sendRequest, isPending } = useAPi<UserId, BaseResponse<UserId>>();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<{ userCode: number }>();

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const onChangeOwner: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setOwner(value as 'self' | 'other');
  };

  function closeModal() {
    setShowModal(false);
    onClose();
  }

  function onsubmit(data: { userCode: number }) {
    onSubmit(data.userCode);
    setShowModal(false);
    onClose();
  }

  const handleButtonClick = (data: { userCode: number }) => {
    sendRequest(
      {
        url: `/Users/GetByCode/${data.userCode}`,
      },
      (response) => {
        setFullName(response.content?.fullName || null);
        setFullNameFetched(true);
        setUsernameError(null);
      },
      (error) => {
        console.log(error);
        setFullName(null);
        setFullNameFetched(false);
        setUsernameError('کاربر فعالی با کد وارد شده وجود ندارد .');
      }
    );
  };

  return (
    <SDModal
      show={showModal}
      containerClass="pt-0 px-0 pb-2"
      onClose={closeModal}
    >
      <div className="border-b text-lg flex justify-between px-6 py-4 bg-primary-500 text-white rounded-t-md">
        <span>رزرو بلیت</span>
        <button type="button" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="p-5 w-80">
          <div className="mb-2">
            <input
              id="self"
              type="radio"
              value="self"
              checked={owner === 'self'}
              onChange={onChangeOwner}
              name="owner"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="self"
              className="mr-2  font-medium text-slate-600 dark:text-gray-300"
            >
              رزرو برای خود
            </label>
          </div>
          <div className="mb-3">
            <input
              id="other"
              type="radio"
              value="other"
              checked={owner === 'other'}
              onChange={onChangeOwner}
              name="owner"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="other"
              className="mr-2  font-medium text-slate-600 dark:text-gray-300"
            >
              رزرو برای دیگری
            </label>
          </div>
          {owner === 'other' && (
            <div className="mb-3">
              <div>
                <SDLabel htmlFor="userCode">کد کاربر</SDLabel>
                <div>
                  <SDTextInput
                    type="number"
                    id="userCode"
                    invalid={!!errors.userCode}
                    {...register('userCode', { required: 'فیلد الزامی است' })}
                    magnifier={true}
                    onButtonClick={() =>
                      handleButtonClick({ userCode: watch('userCode') })
                    }
                    isPending={isPending}
                  />
                </div>
                <SDLabel htmlFor="username" className="mt-5">
                  نام کاربر
                </SDLabel>
                <div>
                  <SDTextInput
                    type="text"
                    id="username"
                    invalid={!!errors.userCode}
                    disabled={true}
                    value={fullName || ''}
                  />
                </div>
                {usernameError && (
                  <p className="text-red-600 text-sm pr-2 mt-1 text-center">
                    {usernameError}
                  </p>
                )}
                {errors.userCode?.message && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {errors.userCode.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end px-3">
          <SDButton
            type="submit"
            color="primary"
            disabled={owner === 'other' && !fullNameFetched}
          >
            رزرو
          </SDButton>
        </div>
      </form>
    </SDModal>
  );
};

export default AddTicketModal;
