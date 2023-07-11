import { useCallback, useEffect, useState } from "react";
import CartableItem from "../../../components/adminPanel/cartable/CartableItem";
import SDCard from "../../../components/shared/Card";
import useAPi from "../../../hooks/useApi";
import {
  CartableMessage,
  CartableRequestTypesPersianMap,
} from "../../../models/cartable.models";
import { BaseResponse, SelectPageEvent } from "../../../models/shared.models";
import SDLabel from "../../../components/shared/Label";
import SDSpinner from "../../../components/shared/Spinner";
import ReactPaginate from "react-paginate";
import SDTextInput from "../../../components/shared/TextInput";
import SDSelect from "../../../components/shared/Select";
import { toast } from "react-toastify";

const Cartable: React.FC = () => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<CartableMessage[]>
  >();

  const {sendRequest:sendDeleteRequest} = useAPi<null,BaseResponse<null>>();

  const pageSize = 10;
  const [selectedType, setSelectedType] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>();
  const [pageIndex,setPageIndex] = useState<number>(1);

  const onChangeType: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedType(event.target.value);
  };

  const fetchItems = useCallback(
    (selectedType: string, pageIndex = 1) => {
      sendRequest(
        {
          url: "/Admin/AdminCartableMessages",
          params: {
            pageSize: pageSize,
            pageIndex: pageIndex,
            requestType: selectedType,
          },
        },
        (response) => {
          setPageCount(response.total / pageSize);
        }
      );
    },
    [sendRequest]
  );

  const deleteMessage = (id:string)=>{
    sendDeleteRequest({
      url: `/admin/removeFromCartable/${id}`,
      method: 'delete'
    },(response)=>{
      toast.success(response.message)
      fetchItems(selectedType,pageIndex)
    },(error)=>{
      toast.error(error?.message)
    })
  }

  const handlePageClick = (event: SelectPageEvent) => {
    const selectedPage = event.selected + 1;
    setPageIndex(selectedPage)
    fetchItems(selectedType, selectedPage);
  };

  useEffect(() => {
    fetchItems(selectedType);
  }, [fetchItems, selectedType]);

  const loading = (
    <div className="flex justify-center pt-6 w-full">
      <SDSpinner size={20} color="blue" />
    </div>
  );

  const body = (
    <div className="flex flex-wrap-reverse">
      <div className="w-full lg:w-9/12">
        {data &&
          data.content.map((item, index) => {
            return <CartableItem key={index} {...item} onDelete={deleteMessage} />;
          })}
      </div>
      <div className="w-full  md:pr-3 flex flex-wrap lg:flex-col lg:w-3/12">
        <div className="w-1/2 h-auto lg:w-full pl-6 lg:pl-0 mb-8">
          <SDLabel htmlFor="type">نوع درخواست</SDLabel>
          <SDSelect
            id="type"
            value={selectedType}
            onChange={onChangeType}
          >
            <option value="">همه</option>
            {Array.from(CartableRequestTypesPersianMap.entries()).map(
              ([key, value]) => (
                <option key={key} value={key} className="text-right">
                  {value}
                </option>
              )
            )}
          </SDSelect>
        </div>
        <div className="w-1/2 h-auto lg:w-full mb-8">
          <SDLabel htmlFor="type">‌درخواست‌کننده</SDLabel>
          <SDTextInput />
        </div>
      </div>
    </div>
  );



  return (
    <SDCard>
      {isPending && loading}
      {data && !isPending && body}
      {pageCount && pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex w-full gap-5  justify-center"
          nextClassName="flex items-center"
          previousClassName="flex items-center"
          pageLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
          nextLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
          previousLinkClassName="p-1 block hover:text-cyan-400 transition-all ease-linear duration-75"
          breakClassName="p-1 block hover:text-cyan-400"
          activeClassName="text-cyan-500"
          pageClassName="text-base "
        />
      )}
    </SDCard>
  );
};

export default Cartable;
