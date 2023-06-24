import { useEffect, useState } from "react";
import CartableItem from "../../../components/adminPanel/cartable/CartableItem";
import SDCard from "../../../components/shared/Card";
import useAPi from "../../../hooks/useApi";
import {
  CartableMessage,
  CartableRequestTypesPersianMap,
} from "../../../models/cartable.models";
import { BaseResponse } from "../../../models/shared.models";
import SDLabel from "../../../components/shared/Label";
import SDSpinner from "../../../components/shared/Spinner";

const Cartable: React.FC = () => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<CartableMessage[]>
  >();

  const [selectedType, setSelectedType] = useState<string>("");

  const onChangeType: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    sendRequest({
      url: "/Admin/AdminCartableMessages",
      params: {
        pageSize: 1000000000,
        pageIndex: 1,
        requestType: selectedType
      },
    });
  }, [sendRequest,selectedType]);

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
            return <CartableItem key={index} {...item} />;
          })}
      </div>
      <div className="w-full lg:w-3/12 md:pr-3">
        <SDLabel htmlFor="type">نوع درخواست</SDLabel>
        <select
          id="type"
          value={selectedType}
          onChange={onChangeType}
          className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">همه</option>
          {Array.from(CartableRequestTypesPersianMap.entries()).map(
            ([key, value]) => (
              <option key={key} value={key} className="text-right">
                {value}
              </option>
            )
          )}
        </select>
      </div>
    </>
  );

  return (
    <SDCard className="flex flex-wrap-reverse">
      {isPending && loading}
      {(data && !isPending) && body}
    </SDCard>
  );
};

export default Cartable;
